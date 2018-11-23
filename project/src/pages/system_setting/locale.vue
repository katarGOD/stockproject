<template>
  <q-page>
    <q-card>
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
      :data="locale"
      :filter="filter"
      :loading="loading"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
    >
      <!-- selection -->
      <template slot="top-selection" slot-scope="props">
        <div style="padding-top: 8px; padding-bottom: 8px;">
          <q-btn
            class="q-mr-sm"
            color="negative"
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
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
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
          <!-- field id -->
          <q-field
            :label="$t('ID')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.id.$error"
            :error-label="!$v.inputForm.id.required ? $t('Requires non-empty data') : ''"
          >
            <q-input
              v-model="inputForm.id"
              @blur="$v.inputForm.id.$touch"
            />
          </q-field>
          <!-- field value -->
          <q-field
            :label="$t('value')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm.value"/>
          </q-field>
          <!-- submit -->
          <div class="submit">
            <q-btn
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('Save')"
              @click="addForm"
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
import { required } from 'vuelidate/lib/validators'
import crudProcess from 'src/components/datatable/crudProcess'
import publicVars from 'src/components/shared/publicVars'

export default {
  name: 'locale',
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
      // datatable
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'value', label: this.$t('value'), field: 'value', sortable: false, align: 'left' }
      ],
      visibleColumns: ['id', 'value'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      // inputForm
      inputForm: {
        '.key': null,
        value: null,
        timestamp: new Date()
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      id: { required }
    }
  },
  // firestore
  firestore () {
    return {
      locale: this.$database.collection('locale')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      await vm.setProcess(vm.$firestore.locale, vm.inputForm, vm.$v.inputForm, vm.inputForm.id)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.locale)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.locale)
  }
}
</script>

<style>
</style>
