<template>
  <q-page>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :data="incomeTaxTb"
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
            round
            icon="edit"
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
      <q-td slot="body-cell-accountCode" slot-scope="props" :props="props">
        <span small>
          {{ accountCodeLabel(props.value) }}
        </span>
      </q-td>
      <!-- custom tax -->
      <q-td slot="body-cell-calculateTax" slot-scope="props" :props="props">
        <span small color="secondary">
          <q-icon v-if="props.value" name="done"></q-icon>
            <q-icon v-if="!props.value" name="clear"></q-icon>
        </span>
      </q-td>
      <!-- custom postingCategory -->
      <q-td slot="body-cell-postingCategory" slot-scope="props" :props="props">
        <span small color="secondary">
        {{ showPostingCategoryOption(props.value) }}
        </span>
      </q-td>
      <!-- custom amount -->
      <q-td slot="body-cell-amount" slot-scope="props" :props="props">
        {{ parseInt(props.value).toLocaleString(undefined, { minimumFractionDigits: 2 })  + ' THB'}}
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
          <!-- field accountCode -->
          <q-field
            :label="$t('Account code') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.accountCode.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.accountCode"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              :options="incomeTaxAccountCodeOptions"
              @blur="$v.inputForm.accountCode.$touch()"
            />
          </q-field>
          <!-- field postingCategory -->
          <q-field
            :label="$t('Category') + ' *'"
            :label-width="labelWidth"
          >
            <q-select
              v-model="postingCategory"
              disable
              :options="postingCategoryOptions"
            />
          </q-field>
          <!-- field Description -->
          <q-field
            :label="$t('Description')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm.description"
              :disable="!hasPermission(['personnel--employee-management--update'])"
            />
          </q-field>
          <!-- field amount -->
          <q-field
            :label="$t('Amount')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.amount.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              v-model="inputForm.amount"
              type="number"
              :disable="!hasPermission(['personnel--employee-management--update'])"
              @blur="$v.inputForm.amount.$touch()"
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
import accountCodeOptions from 'src/components/options/accountCodeOptions'
import crudProcess from 'src/components/datatable/crudProcess'
import hasPermission from 'src/components/shared/hasPermission'
import postingCategoryOptions from 'src/components/options/postingCategoryOptions'
import publicVars from 'src/components/shared/publicVars'
import _ from 'lodash'

export default {
  name: 'incomeTax',
  // mixins
  mixins: [
    accountCodeOptions,
    crudProcess,
    hasPermission,
    postingCategoryOptions,
    publicVars
  ],
  // data
  data () {
    return {
    // app variable
      subMenu: this.$t('Income tax'),
      incomeTaxAccountCodeOptions: [],
      // datatable
      pagination: {
        sortBy: 'accountCode',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'accountCode', label: this.$t('Code'), field: 'accountCode', sortable: true, align: 'left' },
        { name: 'postingCategory', label: this.$t('Category'), field: 'postingCategory', sortable: true, align: 'left' },
        { name: 'description', label: this.$t('Description'), field: 'description', sortable: true, align: 'left' },
        { name: 'amount', label: this.$t('Amount'), field: 'amount', sortable: false, align: 'left' }
      ],
      visibleColumns: ['accountCode', 'postingCategory', 'description', 'amount'],
      // inputForm
      inputForm: {
        '.key': null,
        accountCode: '',
        postingCategory: '',
        description: '',
        amount: 0,
        calculateTax: false,
        createdBy: this.userId,
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date(),
        authUser: this.userId
      },
      postingCategory: ''
    }
  },
  // firestore
  firestore () {
    return {
      incomeTaxTb: this.$database.collection('incomeTaxDetail').where('authUser', '==', this.$route.params.id),
      incomeTax: this.$database.collection('incomeTaxDetail')
    }
  },
  // validations
  validations: {
    inputForm: {
      accountCode: { required },
      amount: { required }
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.postingCategory = vm.postingCategory
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      vm.inputForm.authUser = vm.$route.params.id
      await vm.addProcess(vm.$firestore.incomeTax, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.postingCategory = vm.postingCategory
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.incomeTax, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.incomeTax)
      vm.selected = []
    },
    showPostingCategoryOption (id) {
      let vm = this
      let result = '...'
      if (!vm._.isUndefined(vm._.find(vm.postingCategoryOptions, {'value': id}))) {
        result = _.find(vm.postingCategoryOptions, {'value': id})['label']
      }
      return result
    },
    accountCodeLabel (id) {
      let vm = this
      let result = '...'
      if (!vm._.isUndefined(vm._.find(vm.accountCodeOptions, {'value': id}))) {
        result = vm._.find(vm.accountCodeOptions, {'value': id})['label']
      }
      return result
    },
    getPostingCategory (code) {
      return new Promise(resolve => {
        let vm = this
        let result = ''
        vm.$database.collection('postingCategory')
          .where('code', '==', code)
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result = doc.id
            })
            return resolve(result)
          })
      })
    },
    getDeductionAccountCodeOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('accountCode')
          .where('postingCategory', '==', vm.postingCategory)
          .orderBy('code')
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                value: doc.id,
                label: `${doc.data().code} : ${doc.data().description}`
              })
            })
            return resolve(result)
          })
      })
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.incomeTax)
    let vm = this
    vm.$emit('updateSubMenu', vm.subMenu)
    vm.postingCategory = await vm.getPostingCategory('TAX')
    vm.incomeTaxAccountCodeOptions = await vm.getDeductionAccountCodeOptions()
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}

</script>
