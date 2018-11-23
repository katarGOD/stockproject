<template>
  <q-page>
    <q-card style="margin-bottom: 5px">
      <q-card-title>
        <!-- title -->
        <p class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</p>
      </q-card-title>
    </q-card>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="multiple"
      :columns="columns"
      :data="initialSetup"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
    >
      <!-- selection -->
      <template slot="top-selection" slot-scope="props">
        <div style="padding-top: 8px; padding-bottom: 8px;">
          <q-btn
            v-if="selected.length==1"
            class="q-mr-sm"
            color="primary"
            icon="edit"
            round
            @click="openUpdateFrom(inputForm, selected[0])"
          />
          <q-btn
            class="q-mr-sm"
            color="negative"
            delete
            icon="delete"
            round
            @click="deleteRow()"
          />
        </div>
      </template>
      <!-- top-left -->
      <template slot="top-left" slot-scope="props">
        <q-btn
          class="q-mr-sm"
          color="secondary"
          icon="add_circle"
          round
          @click="openAddForm(inputForm)"
        />
        <q-search hide-underline color="secondary" v-model="filter"/>
      </template>
      <!-- top-right -->
      <template slot="top-right" slot-scope="props">
        <q-table-columns
          class="q-mr-sm"
          color="secondary"
          v-model="visibleColumns"
          :columns="columns"
        />
      </template>
      <!-- code -->
      <q-td slot="body-cell-code" slot-scope="props" :props="props">
        <q-btn
          flat
          :label="props.value"
          @click="selected=[_.find(initialSetup, {'.key': props.row['.key']})]; openUpdateFrom(inputForm, selected[0])"
        />
      </q-td>
    </q-table>
    <!-- ///////// -->
    <!-- inputForm -->
    <!-- ///////// -->
    <q-modal v-model="formModal" maximized :content-css="{padding: '50px'}">
      <div class="row justify-center gutter-lg">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12">
          <div class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</div>
          <div class="q-subheading">{{ subHeading }}</div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12">
          <!-- field code -->
          <q-field
            :label="$t('Code')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.code.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.code"
              @blur="$v.inputForm.code.$touch()"
            />
          </q-field>
          <!-- field description -->
          <q-field
            :label="$t('Description')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm.description"/>
          </q-field>
          <!-- field value -->
          <q-field
            :label="$t('value')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.value.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.value"
              @blur="$v.inputForm.value.$touch()"
            />
          </q-field>

          <!-- submit -->
          <div class="submit">
            <q-btn
              v-if="formAction==='add'"
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('Save')"
              @click="addForm"
            />
            <q-btn
              v-if="formAction==='update'"
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('Save')"
              @click="updateForm"
            />
            <q-btn
              class="q-mr-sm"
              color="light"
              icon="cancel"
              wait-for-ripple
              :label="$t('Cancel')"
              @click="formModal=false"
            />
          </div>
        </div>
      </div>
    </q-modal>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import crudProcess from 'src/components/datatable/crudProcess'
import publicVars from 'src/components/shared/publicVars'

export default {
  name: 'initialSetup',
  // mixins
  mixins: [
    crudProcess,
    publicVars
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
        sortBy: 'code',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'code', label: this.$t('Code'), field: 'code', sortable: true, align: 'left' },
        { name: 'description', label: this.$t('Description'), field: 'description', sortable: false, align: 'left' },
        { name: 'value', label: this.$t('Value'), field: 'value', sortable: false, align: 'left' }
      ],
      visibleColumns: ['code', 'description', 'value'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      // inputForm
      inputForm: {
        '.key': null,
        code: null,
        description: null,
        value: null,
        createdBy: null,
        createdOn: null,
        modifiedBy: null,
        modifiedOn: null
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      code: { required },
      value: { required }
    }
  },
  // firestore
  firestore () {
    return {
      initialSetup: this.$database.collection('initialSetup')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      await vm.addProcess(vm.$firestore.initialSetup, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.initialSetup, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.initialSetup)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.initialSetup)
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}
</script>

<style>
</style>
