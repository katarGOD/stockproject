<template>
  <q-page>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :columns="columns"
      :data="trainingTb"
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
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />
      </template>
      <!-- custom color -->
      <q-td slot="body-cell-date" slot-scope="props" :props="props">
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
              disable
              v-model="inputForm['.key']"
            />
          </q-field>
          <!-- field course name -->
          <q-field
            :label="$t('Course')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.courseName.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.courseName"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.courseName.$touch()"
            />
          </q-field>
          <!-- field courseOfferedBy of by -->
          <q-field
            :label="$t('By')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.courseOfferedBy.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.courseOfferedBy"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.courseOfferedBy.$touch()"
            />
          </q-field>
          <!-- field date -->
          <q-field
            :label="$t('Issued date')"
            :label-width="labelWidth"
            :error="$v.inputForm.date.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-datetime
              v-model="inputForm.date"
              type="date"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.date.$touch()"
            />
          </q-field>
          <!-- field note -->
          <q-field
            :label="$t('Note')"
            :label-width="labelWidth"
          >
            <q-editor
              :disable="!hasPermission(['personnel--employee-management--update'])"
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
import formatDate from 'src/components/shared/formatDate'

export default {
  name: 'training',
  // mixins
  mixins: [
    crudProcess,
    hasPermission,
    formatDate,
    publicVars
  ],
  // data
  data () {
    return {
    // app variable
      subHeading: null,
      subMenu: this.$t('Training'),
      // datatable
      pagination: {
        sortBy: 'type',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'courseName', label: this.$t('Course'), field: 'courseName', sortable: true, align: 'left' },
        { name: 'courseOfferedBy', label: this.$t('By'), field: 'courseOfferedBy', sortable: false, align: 'left' },
        { name: 'date', label: this.$t('Date'), field: 'date', sortable: false, align: 'left' },
        { name: 'note', label: this.$t('Note'), field: 'note', sortable: false, align: 'left' }
      ],
      visibleColumns: ['courseName', 'courseOfferedBy', 'date'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      // inputForm
      inputForm: {
        '.key': null,
        courseName: '',
        courseOfferedBy: '',
        date: new Date(),
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
      courseName: { required },
      courseOfferedBy: { required },
      date: { required }
    }
  },
  // firestore
  firestore () {
    return {
      trainingTb: this.$database.collection('training').where('authUser', '==', this.$route.params.id),
      training: this.$database.collection('training')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      vm.inputForm.authUser = vm.$route.params.id
      await vm.addProcess(vm.$firestore.training, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.training, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.training)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.trainingTb)
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
