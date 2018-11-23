<template>
  <q-page>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :columns="columns"
      :data="educationTb"
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
            :disable="!hasPermission(['personnel--employee-management--update'])"
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
      <!-- custom color -->
      <q-td slot="body-cell-graduation" slot-scope="props" :props="props">
        <span small>
          {{ FormatDate(props.value, "YYYY-MM-DD") }}
        </span>
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
            <q-input
              v-model="inputForm['.key']"
              disable
            />
          </q-field>
          <!-- field type -->
          <q-field
            :label="$t('Type or degree')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.type.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.type"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              :options="typeEducationOptions"
              @blur="$v.inputForm.type.$touch()"
            />
          </q-field>
          <!-- field Institution -->
          <q-field
            :label="$t('Institution')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.institution.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.institution"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.institution.$touch()"
            />
          </q-field>
          <!-- field course -->
          <q-field
            :label="$t('Course')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.course.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.course"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.course.$touch()"
            />
          </q-field>
          <!-- field Graduation -->
          <q-field
            :label="$t('Graduation')"
            :label-width="labelWidth"
            :error="$v.inputForm.graduation.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-datetime
              v-model="inputForm.graduation"
              type="date"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.graduation.$touch()"
            />
          </q-field>
          <!-- field gpa -->
          <q-field
            :label="$t('GPA')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm.gpa"
              :disable="!hasPermission(['personnel--employee-management--update'])"
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
import formatDate from 'src/components/shared/formatDate'

export default {
  name: 'education',
  // mixins
  mixins: [
    crudProcess,
    formatDate,
    hasPermission,
    publicVars
  ],
  // data
  data () {
    return {
    // app variable
      subMenu: this.$t('Education'),
      // datatable
      pagination: {
        sortBy: 'type',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'type', label: this.$t('Degree'), field: 'type', sortable: true, align: 'left' },
        { name: 'institution', label: this.$t('Institution'), field: 'institution', sortable: true, align: 'left' },
        { name: 'course', label: this.$t('Course'), field: 'course', sortable: false, align: 'left' },
        { name: 'graduation', label: this.$t('Graduation'), field: 'graduation', sortable: false, align: 'left' },
        { name: 'gpa', label: this.$t('GPA'), field: 'gpa', sortable: false, align: 'left' }
      ],
      visibleColumns: ['type', 'institution', 'course', 'gpa', 'graduation'],
      // inputForm
      inputForm: {
        '.key': null,
        type: '',
        institution: '',
        course: '',
        graduation: new Date(),
        gpa: '',
        createdBy: this.userId,
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date(),
        authUser: this.userId
      },
      typeEducationOptions: [ { label: 'Bachelor Degrees', value: 'Bachelor Degrees' }, { label: 'Master Degrees', value: 'Master Degrees' }, { label: 'Doctor Degrees', value: 'Doctor Degrees' } ]
    }
  },
  // validations
  validations: {
    inputForm: {
      type: { required },
      institution: { required },
      course: { required },
      graduation: { required }
    }
  },
  // firestore
  firestore () {
    return {
      educationTb: this.$database.collection('education').where('authUser', '==', this.$route.params.id),
      education: this.$database.collection('education')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      vm.inputForm.authUser = vm.$route.params.id
      await vm.addProcess(vm.$firestore.education, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.education, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.education)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.education)
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
