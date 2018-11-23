<template>
  <q-page>
    <q-card>
      <q-card-title>
        <!-- title -->
        <p class="q-headline">{{ $t('Contents') }}</p>
      </q-card-title>
    </q-card>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      :data="contents"
      :pagination.sync="pagination"
      :columns="columns"
      :visible-columns="visibleColumns"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      :selected.sync="selected"
      row-key=".key"
    >
      <!-- selection -->
      <template slot="top-selection" slot-scope="props">
        <div style="padding-top: 8px; padding-bottom: 8px;">
          <q-btn
            :disable="!hasPermission(['system-setting--contents--update'])"
            v-if="selected.length==1"
            color="primary"
            round
            icon="edit"
            outline
            class="q-mr-sm"
            @click="openUpdateFrom(inputForm, selected[0])"
          />
          <q-btn
            :disable="!hasPermission(['system-setting--contents--delete'])"
            color="negative"
            round
            delete
            icon="delete"
            outline
            class="q-mr-sm"
            @click="deleteRow()"
          />
        </div>
      </template>
      <!-- top-left -->
      <template slot="top-left" slot-scope="props">
        <q-btn
          :disable="!hasPermission(['system-setting--contents--create'])"
          color="secondary"
          round
          icon="add_circle"
          outline
          class="q-mr-sm"
          @click="openAddForm(inputForm)"
        />
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          style="padding-left: 20px;"
        />
      </template>
      <!-- top-right -->
      <template slot="top-right" slot-scope="props">
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />
      </template>
      <!-- custom index -->
      <q-td slot="body-cell-index" slot-scope="props" :props="props">
        <span small color="secondary">
          <q-btn
            size="xs"
            small
            flat
            round
            icon="remove"
            @click="decreaseIndex(props, $firestore.contents)"
          />
          {{ props.value }}
          <q-btn
            size="xs"
            small
            flat
            round
            icon="add"
            @click="increaseIndex(props, $firestore.contents)"
          />
        </span>
      </q-td>

    </q-table>
    <!-- ///////// -->
    <!-- inputForm -->
    <!-- ///////// -->
    <q-modal v-model="formModal" maximized :content-css="{padding: '50px'}">
      <div class="row justify-center gutter-lg">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12">
          <div class="q-headline">{{ $t('contents') }}</div>
          <div class="q-subheading">{{ subHeading }}</div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12">
          <!-- field index -->
          <q-field
            :label="$t('Value')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.index.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.index"
              @blur="$v.inputForm.index.$touch()"
            />
          </q-field>
          <!-- field group -->
          <q-field
            :label="$t('Group')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.group.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.group"
              @blur="$v.inputForm.group.$touch()"
            />
          </q-field>
          <!-- field code -->
          <q-field
            :label="$t('Code')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.code.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model.trim="inputForm.code"
              @blur="$v.inputForm.code.$touch()"
            />
          </q-field>
          <!-- field locale -->
          <q-field
            :label="$t('Locale')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.locale.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.locale"
              :options="localeOptions"
            />
          </q-field>
          <!-- field body -->
          <q-field
            :label="$t('Body')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.body.$error"
            :error-label="$t('Requires non-empty data')"
          >
          </q-field>
          <q-editor
            v-model="inputForm.body"
            @blur="$v.inputForm.body.$touch()"
            :toolbar="[
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.i18n.editor.formatting,
                  icon: $q.icon.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                },
                {
                  label: $q.i18n.editor.fontSize,
                  icon: $q.icon.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
                },
                {
                  label: $q.i18n.editor.defaultFont,
                  icon: $q.icon.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
              [
                {
                  label: $q.i18n.editor.align,
                  icon: $q.icon.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              ['undo', 'redo']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          />
          <codemirror
            :value="inputForm.body"
            :options="editorOption()"
            ref="myEditor"
            @change="yourCodeChangeMethod">
          </codemirror>

          <!-- submit -->
          <div class="submit">
            <q-btn v-if="formAction==='add'" icon="save" color="primary" outline @click="addForm" wait-for-ripple class="q-mr-sm" :label="$t('Save')" />
            <q-btn v-if="formAction==='update'" icon="save" color="primary" outline @click="updateForm" wait-for-ripple class="q-mr-sm" :label="$t('Save')" />
            <q-btn icon="cancel" color="light" outline @click="formModal = false" wait-for-ripple class="q-mr-sm" :label="$t('Cancel')" />
          </div>
        </div>
      </div>
    </q-modal>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')
import hasPermission from 'src/components/shared/hasPermission'
import crudProcess from 'src/components/datatable/crudProcess'
import publicVars from 'src/components/shared/publicVars'
import localeOptions from 'src/components/options/localeOptions'

export default {
  name: 'contents',
  // components
  components: {
    codemirror
  },
  // mixins
  mixins: [
    crudProcess,
    publicVars,
    hasPermission,
    localeOptions
  ],
  // data
  data () {
    return {
      // app variable
      subHeading: null,
      formAction: null,
      collectionSize: 0,
      // datatable
      pagination: {
        sortBy: 'index',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'index', label: this.$t('Index'), field: 'index', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10), align: 'left' },
        { name: 'group', label: this.$t('Group'), field: 'group', sortable: true, align: 'left' },
        { name: 'code', label: this.$t('Code'), field: 'code', sortable: true, align: 'left' },
        { name: 'body', label: this.$t('Body'), field: 'body', sortable: false, align: 'left' },
        { name: 'locale', label: this.$t('Locale'), field: 'locale', sortable: true, align: 'left' }
      ],
      visibleColumns: ['index', 'group', 'code', 'locale'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      // inputForm
      inputForm: {
        '.key': '',
        index: 0,
        group: '',
        code: '',
        body: '',
        locale: '',
        createdBy: this.userId,
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date()
      },
      editorOption: function () {
        return {
          mode: 'htmlmixed',
          tabSize: 2,
          lineNumbers: false,
          lineWrapping: true,
          viewportMargin: Infinity,
          extraKeys: {'Ctrl-Space': 'autocomplete'}
        }
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      index: { required },
      group: { required },
      code: { required },
      body: { required },
      locale: { required }
    }
  },
  // firestore
  firestore () {
    return {
      contents: this.$database.collection('contents')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      await vm.addProcess(vm.$firestore.contents, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.contents, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.contents)
      vm.selected = []
    },
    yourCodeChangeMethod: function (code) {
      this.inputForm.body = code
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.contents)
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ]),
    editor () {
      // get current editor object
      return this.$refs.myEditor.editor
    }
  },
  // watch
  watch: {
    selected () {
      if (this.selected.length) {
        window.scrollTo(0, 0)
      }
    }
  },
  // mounted
  mounted () {
    // use editor object...
    this.editor.focus()
    console.log('this is current editor object', this.editor)
  }
}
</script>

<style>
</style>
