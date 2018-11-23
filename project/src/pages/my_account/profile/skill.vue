<template>
  <q-page>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :columns="columns"
      :data="skillTb"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
      :visible-columns="visibleColumns"
      :selected.sync="selected"
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
          <!-- field skill -->
          <q-field
            :label="$t('Skill')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.skill.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              :disable="!hasPermission(['personnel--employee-management--update'])"
              v-model="inputForm.skill"
              @blur="$v.inputForm.skill.$touch()"
            />
          </q-field>
          <!-- field Years of Experience -->
          <q-field
            :label="$t('Experiences')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm.yearsofExperience"
              :disable="!hasPermission(['personnel--employee-management--update'])"
            />
          </q-field>
          <!-- field level -->
          <q-field
            :label="$t('Competency level')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.level"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              :options="levelOptions"
            />
          </q-field>
          <!-- field note -->
          <q-field
            :label="$t('Note')"
            :label-width="labelWidth"
          >
            <q-editor
              v-model="inputForm.note"
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

export default {
  name: 'skill',
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
      subMenu: this.$t('Skill'),
      // datatable
      pagination: {
        sortBy: 'skill',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'skill', label: this.$t('Skill'), field: 'skill', sortable: true, align: 'left' },
        { name: 'yearsofExperience', label: this.$t('Experiences'), field: 'yearsofExperience', sortable: false, align: 'left' },
        { name: 'level', label: this.$t('Level'), field: 'level', sortable: true, align: 'left' },
        { name: 'note', label: this.$t('Note'), field: 'note', sortable: false, align: 'left' }
      ],
      visibleColumns: ['level', 'skill', 'yearsofExperience'],
      // inputForm
      inputForm: {
        '.key': null,
        level: '',
        skill: '',
        yearsofExperience: '',
        note: '',
        createdBy: this.userId,
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date(),
        authUser: this.userId
      },
      levelOptions: [ { label: 'Level 1', value: 'Level 1' }, { label: 'Level 2', value: 'Level 2' }, { label: 'Level 3', value: 'Level 3' } ]
    }
  },
  // validations
  validations: {
    inputForm: {
      skill: { required }
    }
  },
  // firestore
  firestore () {
    return {
      skillTb: this.$database.collection('skill').where('authUser', '==', this.$route.params.id),
      skill: this.$database.collection('skill')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      vm.inputForm.authUser = vm.$route.params.id
      await vm.addProcess(vm.$firestore.skill, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.skill, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.skill)
      vm.selected = []
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.skill)
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
