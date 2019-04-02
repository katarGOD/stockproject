<template>
  <q-page>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :columns="columns"
      :data="contactTb"
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
          v-model="visibleColumns"
          color="secondary"
          class="q-mr-sm"
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
            :label="$t('ID')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm['.key']"
              disable
            />
          </q-field>
          <!-- field type -->
          <q-field
            :label="$t('Type')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.type.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.type"
              :options="typeOptions"
              @blur="$v.inputForm.type.$touch()"
            />
          </q-field>
          <!-- field streetAddress -->
          <q-field
            :label="$t('Address')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.streetAddress.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.streetAddress"
              @blur="$v.inputForm.streetAddress.$touch()"
            />
          </q-field>
          <!-- field city -->
          <q-field
            :label="$t('City')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.city.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.city"
              @blur="$v.inputForm.city.$touch()"
            />
          </q-field>
          <!-- field country -->
          <q-field
            :label="$t('Country')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.country.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.country"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.country.$touch()"
            />
          </q-field>
          <!-- field postcode -->
          <q-field
            :label="$t('Postcode')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.postcode.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.postcode"
              @blur="$v.inputForm.postcode.$touch()"
            />
          </q-field>
          <!-- field note -->
          <q-field
            :label="$t('Note')"
            :label-width="labelWidth"
          >
            <q-editor
              v-model="inputForm.note"
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
              :label="$t('save')"
              @click="addForm"
            />
            <q-btn
              v-if="formAction==='update'"
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('save')"
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
import hasPermission from 'src/components/shared/hasPermission'
import publicVars from 'src/components/shared/publicVars'

export default {
  name: 'contact',
  // mixins
  mixins: [
    crudProcess,
    hasPermission,
    publicVars
  ],
  // data
  data () {
    return {
    // app variable
      subHeading: null,
      subMenu: this.$t('Contact'),
      // datatable
      pagination: {
        sortBy: 'type',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'type', label: this.$t('Type'), field: 'type', sortable: true, align: 'left' },
        { name: 'streetAddress', label: this.$t('Address'), field: 'streetAddress', sortable: false, align: 'left' },
        { name: 'city', label: this.$t('City'), field: 'city', sortable: false, align: 'left' },
        { name: 'country', label: this.$t('Country'), field: 'country', sortable: false, align: 'left' },
        { name: 'postcode', label: this.$t('Postcode'), field: 'postcode', sortable: false, align: 'left' },
        { name: 'note', label: this.$t('Note'), field: 'note', sortable: false, align: 'left' }
      ],
      visibleColumns: ['type', 'streetAddress', 'city', 'country'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      // inputForm
      inputForm: {
        '.key': null,
        type: '',
        streetAddress: '',
        city: '',
        country: '',
        postcode: '',
        note: '',
        createdBy: this.userId,
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date(),
        authUser: this.userId
      },
      typeOptions: [
        { label: 'Permanent', value: 'Permanent' },
        { label: 'Current', value: 'Current' },
        { label: 'Emergency', value: 'Emergency' }
      ]
    }
  },
  // validations
  validations: {
    inputForm: {
      type: { required },
      streetAddress: { required },
      city: { required },
      country: { required },
      postcode: { required }
    }
  },
  // firestore
  firestore () {
    return {
      contactTb: this.$database.collection('contact').where('authUser', '==', this.$route.params.id),
      contact: this.$database.collection('contact')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      vm.inputForm.authUser = vm.$route.params.id
      await vm.addProcess(vm.$firestore.contact, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.contact, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.contact)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.contact)
    this.$emit('updateSubMenu', this.subMenu)
    this.initialInputForm(this.inputForm)
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}

</script>
