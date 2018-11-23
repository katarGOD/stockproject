<template>
  <q-page>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :data="experienceTb"
      :columns="columns"
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
            :disable="!hasPermission(['my-account--profile--experience--update'])"
            @click="openUpdateFrom(inputForm, selected[0])"
          />
          <q-btn
            class="q-mr-sm"
            color="negative"
            icon="delete"
            round
            :disable="!hasPermission(['personnel--employee-management--update'])"
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
          :disable="!hasPermission(['personnel--employee-management--update'])"
          @click="openAddForm(inputForm)"
        />
        <q-search
          v-model="filter"
          color="secondary"
          hide-underline
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
            :label="$t('ID')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm['.key']"
              disable
            />
          </q-field>
          <!-- field companyName -->
          <q-field
            :label="$t('Company')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.companyName.$error"
            :error-label="$t('requiredData')"
          >
            <q-input
              v-model="inputForm.companyName"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.companyName.$touch()"
            />
          </q-field>
          <!-- field websiteCompany -->
          <q-field
            :label="$t('Website')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm.websiteCompany"
              type="url"
              :disable="!hasPermission(['personnel--employee-management--update'])"
            />
          </q-field>
          <!-- field Designation -->
          <q-field
            :label="$t('Designation')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.designation.$error"
            :error-label="$t('requiredData')"
          >
            <q-input
              v-model="inputForm.designation"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.designation.$touch()"
            />
          </q-field>
          <!-- field note -->
          <q-field
            :label="$t('Note')"
            :label-width="labelWidth"
          >
            <q-editor
              disable
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
  name: 'experience',
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
      subMenu: this.$t('Experience'),
      // datatable
      pagination: {
        sortBy: 'level',
        descending: false
      },
      columns: [
        { name: 'companyName', label: this.$t('Company'), field: 'companyName', sortable: true, align: 'left' },
        { name: 'websiteCompany', label: this.$t('Website'), field: 'websiteCompany', sortable: false, align: 'left' },
        { name: 'designation', label: this.$t('Designation'), field: 'designation', sortable: false, align: 'left' },
        { name: 'note', label: this.$t('Note'), field: 'note', sortable: false, align: 'left' }

      ],
      visibleColumns: ['companyName', 'designation', 'websiteCompany', 'note'],
      // inputForm
      inputForm: {
        '.key': null,
        companyName: '',
        websiteCompany: '',
        designation: '',
        note: '',
        createdBy: this.userId,
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date(),
        authUser: this.userId
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      companyName: { required },
      designation: {required}
    }
  },
  // firestore
  firestore () {
    return {
      experienceTb: this.$database.collection('experience').where('authUser', '==', this.$route.params.id),
      experience: this.$database.collection('experience')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      vm.inputForm.authUser = vm.$route.params.id
      await vm.addProcess(vm.$firestore.experience, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.experience, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.experience)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.experience)
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
