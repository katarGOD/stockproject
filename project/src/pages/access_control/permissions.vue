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
      :data="authPermission"
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
            round
            icon="delete"
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
          v-model="visibleColumns"
          class="q-mr-sm"
          color="secondary"
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
            :label="$t('id') +' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.id.$error"
            :error-label="!$v.inputForm.id.required ? $t('Requires non-empty data') : ''"
          >
            <q-input
              v-model="inputForm.id"
              @blur="$v.inputForm.id.$touch"
            />
          </q-field>
          <!-- field description -->
          <q-field
            :label="$t('Description')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm.description"/>
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
              :disable="$v.inputForm.$invalid"
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
  name: 'permissions',
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
        { name: 'description', label: this.$t('Description'), field: 'description', sortable: false, align: 'left' }
      ],
      visibleColumns: ['id', 'description'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      // inputForm
      inputForm: {
        '.key': null,
        description: null,
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
      authPermission: this.$database.collection('authPermission')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      await vm.setProcess(vm.$firestore.authPermission, vm.inputForm, vm.$v.inputForm, vm.inputForm.id)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.authPermission)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.authPermission)
  }
}
</script>

<style>
</style>
