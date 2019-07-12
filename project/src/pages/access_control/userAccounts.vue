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
      :data="authUser"
      :pagination.sync="pagination"
      :columns="columns"
      :visible-columns="visibleColumns"
      :loading="loading"
      :filter="filter"
      selection="single"
      :selected.sync="selected"
      row-key=".key"
    >
      <!-- selection -->
      <template slot="top-selection" slot-scope="props">
        <div style="padding-top: 8px; padding-bottom: 8px;">
          <q-btn v-if="selected.length==1"  color="primary" round icon="edit" class="q-mr-sm" @click="openUpdateFrom(inputForm, selected[0])" />
        </div>
      </template>
      <!-- top-left -->
      <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
        />
      </template>
      <template slot="top-right" slot-scope="props">
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />
      </template>
      <!-- email -->
      <q-td slot="body-cell-email" slot-scope="props" :props="props">
        <q-btn
          flat
          :label="props.value"
          @click="selected=[_.find(authUser, {'.key': props.row['.key']})]; openUpdateFrom(inputForm, selected[0])"
        />
      </q-td>
      <!-- custom department -->
      <q-td slot="body-cell-department" slot-scope="props" :props="props">
        {{ getDeptName(props.value) }}
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
          <!-- field id -->
          <q-field
            :label="$t('ID')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm['.key']" disable />
          </q-field>
          <!-- field index -->
          <q-field
            :label="$t('Email')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm.email" disable />
          </q-field>
          <!-- field firstName -->
          <q-field
            :label="$t('First name')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.firstName.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.firstName"
              @blur="$v.inputForm.firstName.$touch()"
            />
          </q-field>
          <!-- field lastName -->
          <q-field
            :label="$t('Last name')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.lastName.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.lastName"
              @blur="$v.inputForm.lastName.$touch()"
            />
          </q-field>
          <!-- Locale -->
          <!-- <q-field
            :label="$t('Locale')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.locale"
              :options="localeOptions"
            />
          </q-field> -->
          <!-- field active -->
          <q-field
            :label="$t('Active')"
            :label-width="labelWidth"
          >
            <q-toggle
              v-model="inputForm.active"
              checked-icon="sentiment very satisfied"
              unchecked-icon="sentiment very dissatisfied"
            />
          </q-field>
          <!-- field authGroup -->
          <q-field
            :label="$t('Roles')"
            :label-width="labelWidth"
          >
            <q-option-group
              type="toggle"
              color="secondary"
              v-model="inputForm.authGroup"
              :options="authGroupOptions"
            />
          </q-field>
          <!-- submit -->
          <div class="submit">
           <q-btn
            v-if="formAction==='update'"
            class="q-mr-sm"
            color="primary"
            icon="save"
            wait-for-ripple
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
import hasPermission from 'src/components/shared/hasPermission'
import authUserOptions from 'src/components/options/authUserOptions'
import authGroupOptions from 'src/components/options/authGroupOptions'
import departmentOptions from 'src/components/options/departmentOptions'
import positionOptions from 'src/components/options/positionOptions'
import localeOptions from 'src/components/options/localeOptions'

export default {
  name: 'userAccounts',
  // mixins
  mixins: [
    crudProcess,
    publicVars,
    hasPermission,
    authUserOptions,
    authGroupOptions,
    localeOptions,
    departmentOptions,
    positionOptions
  ],
  data () {
    return {
      // app variable
      subHeading: null,
      formAction: null,
      collectionSize: 0,
      // datatable
      pagination: {
        sortBy: 'firstName',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'email', label: this.$t('Email'), field: 'email', sortable: true, align: 'left' },
        { name: 'firstName', label: this.$t('First name'), field: 'firstName', sortable: true, align: 'left' },
        { name: 'lastName', label: this.$t('Last name'), field: 'lastName', sortable: true, align: 'left' },
        { name: 'department', label: this.$t('Department'), field: 'department', sortable: false, align: 'left' },
        { name: 'authGroup', label: this.$t('Roles'), field: 'authGroup', sortable: false, align: 'left' },
        { name: 'status', label: this.$t('Status'), field: 'active', sortable: false, align: 'left' }
      ],
      visibleColumns: ['email', 'firstName', 'lastName', 'department', 'status'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      // inputForm
      inputForm: {
        '.key': '',
        email: '',
        firstName: '',
        lastName: '',
        locale: '',
        active: false,
        authGroup: []
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      email: { required },
      firstName: { required },
      lastName: { required },
      locale: { required }
    }
  },
  // firestore
  firestore () {
    return {
      authUser: this.$database.collection('authUser'),
      authGroup: this.$database.collection('authGroup').orderBy('index')
    }
  },
  // methods
  methods: {
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.authUser, vm.inputForm, vm.$v.inputForm)
    },
    getDeptName (id) {
      let vm = this
      let result = '...'
      if (vm.departmentOptions) {
        if (vm._.find(vm.departmentOptions, {id: id})) {
          result = vm._.find(vm.departmentOptions, {id: id}).data.code
        }
      }
      return result
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.authUser)
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  // watch
  watch: {
    selected () {
      if (this.selected.length) {
        window.scrollTo(0, 0)
      }
    }
  }
}
</script>

<style>
</style>
