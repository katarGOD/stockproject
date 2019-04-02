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
      :data="po"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
      :visible-columns="visibleColumns"
      :selected.sync="selected"
    >
      <!-- selection -->
      <template slot="top-selection" slot-scope="props">
        <div style="padding-top: 9px; padding-bottom: 8px;">
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
          @click="openAddFormModel(inputForm)"
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
      <!-- custom index -->
      <q-td slot="body-cell-index" slot-scope="props" :props="props">
        <span small color="secondary">
          <q-btn size="xs" small flat round icon="remove" @click="decreaseIndex(props, $firestore.productType)" />
          {{ props.value }}
          <q-btn size="xs" small flat round icon="add" @click="increaseIndex(props, $firestore.productType)" />
        </span>
      </q-td>
      <!-- code -->
      <q-td slot="body-cell-code" slot-scope="props" :props="props">
        <q-btn
          flat
          :label="props.value"
          @click="selected=[_.find(productType, {'.key': props.row['.key']})]; openUpdateFrom(inputForm, selected[0])"
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
          <!-- field id -->
          <q-field
            :label="$t('ID')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm['.key']" disable />
          </q-field>
          <!-- field index -->
          <q-field
            :label="$t('Index')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.index.$error"
            :error-label="`${!$v.inputForm.index.required ? $t('Requires non-empty data') : ''} ${!$v.inputForm.index.numeric ? $t('onlyNumerics') : ''}`"
          >
            <q-input
              v-model="inputForm.index"
              type="number"
              @blur="$v.inputForm.index.$touch()"
            />
          </q-field>
          <!-- field code -->
          <q-field
            :label="$t('Code')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.code.$error"
            :error-label="`${!$v.inputForm.code.required ? $t('Requires non-empty data') : ''}`"
          >
            <q-input
              v-model="inputForm.code"
              @blur="$v.inputForm.code.$touch()"
            />
          </q-field>
          <q-field
            :label="$t('Stock type') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.stockType.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.stockType"
              :options="stockTypeOptions"
              @blur="$v.inputForm.stockType.$touch()"
            />
          </q-field>
          <q-field
            :label="$t('Product type') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.productType.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.productType"
              :options="productTypeOptions"
              @blur="$v.inputForm.productType.$touch()"
            />
          </q-field>
          <q-field
            :label="$t('Product') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.product.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.product"
              :options="productOptions"
              @blur="$v.inputForm.product.$touch()"
            />
          </q-field>
          <!-- field description -->
          <q-field
            :label="$t('Description')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm.description"/>
          </q-field>
          <q-field
            :label="$t('Qty')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.qty.$error"
            :error-label="`${!$v.inputForm.qty.required ? $t('Requires non-empty data') : ''} ${!$v.inputForm.qty.numeric ? $t('onlyNumerics') : ''}`"
          >
            <q-input
              v-model="inputForm.qty"
              type="number"
              @blur="$v.inputForm.qty.$touch()"
            />
          </q-field>
          <q-field
            :label="$t('Total price')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.totalPrice.$error"
            :error-label="`${!$v.inputForm.totalPrice.required ? $t('Requires non-empty data') : ''} ${!$v.inputForm.totalPrice.numeric ? $t('onlyNumerics') : ''}`"
          >
            <q-input
              v-model="inputForm.totalPrice"
              type="number"
              disable
              @blur="$v.inputForm.totalPrice.$touch()"
            />
          </q-field>
          <q-field
              :label="$t('Approval status')"
              :label-width="labelWidth"
            >
              <q-btn-toggle
                v-model="inputForm.approval"
                toggle-color="primary"
                :disable="!hasPermission(['admin'])"
                :options="[
                  {label: $t('Approved'), value: 'approval'},
                  {label: $t('Waiting for approval'), value: 'waiting'}
                ]"
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
              @click="addForm"
              :disable="$v.inputForm.$invalid"
              :label="$t('Save')"
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
import stockTypeOptions from 'src/components/options/stockTypeOptions'
import productOptions from 'src/components/options/productOptions'
import hasPermission from 'src/components/shared/hasPermission'
import productTypeOptions from 'src/components/options/productTypeOptions'
import { required, numeric } from 'vuelidate/lib/validators'
import crudProcess from 'src/components/datatable/crudProcess'
import publicVars from 'src/components/shared/publicVars'

export default {
  name: 'Purchase Order',
  // mixins
  mixins: [
    hasPermission,
    crudProcess,
    stockTypeOptions,
    productOptions,
    productTypeOptions,
    publicVars
  ],
  // data
  data () {
    return {
      // datatable
      productAll: [],
      pagination: {
        sortBy: 'index',
        descending: false
      },
      columns: [
        {
          name: '.key',
          label: this.$t('ID'),
          field: '.key',
          sortable: true,
          align: 'left'
        },
        {
          name: 'index',
          label: this.$t('Index'),
          field: 'index',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          align: 'left'
        },
        {
          name: 'code',
          label: this.$t('Code'),
          field: 'code',
          sortable: true,
          align: 'left'
        },
        {
          name: 'description',
          label: this.$t('Description'),
          field: 'description',
          sortable: false,
          align: 'left'
        },
        {
          name: 'createdBy',
          label: this.$t('Created by'),
          field: 'createdBy',
          sortable: false,
          align: 'left'
        }
      ],
      visibleColumns: ['index', 'code', 'description'],
      // inputForm
      inputForm: {
        '.key': null,
        index: null,
        code: null,
        stockType: null,
        product: null,
        productType: null,
        description: null,
        qty: null,
        createdBy: this.userId,
        approval: 'waiting',
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date(),
        totalPrice: 0
      },
      // export
      json_fields: {
        'Code': 'code',
        'Description': 'description'
      },
      json_data: [],
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ]
    }
  },
  // validations
  validations: {
    inputForm: {
      index: { required, numeric },
      code: { required },
      productType: { required },
      stockType: { required },
      product: { required },
      qty: { required, numeric },
      totalPrice: { required, numeric }
    }
  },
  // firestore
  firestore () {
    return {
      po: this.$database.collection('po')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      let result = ''
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      result = await vm.addProcess(vm.$firestore.po, vm.inputForm, vm.$v.inputForm)
      console.log(result)
    },
    openAddFormModel (inputForm) {
      let vm = this
      vm.subHeading = vm.$t('Add')
      vm.formAction = 'add'
      vm.initialInputFormModel()
      vm.formModal = true
    },
    initialInputFormModel () {
      let vm = this
      vm.inputForm['.key'] = null
      vm.inputForm.index = null
      vm.inputForm.code = null
      vm.inputForm.stockType = null
      vm.inputForm.product = null
      vm.inputForm.productType = null
      vm.inputForm.description = null
      vm.inputForm.qty = null
      vm.inputForm.createdBy = this.userId
      vm.inputForm.approval = 'waiting'
      vm.inputForm.createdOn = new Date()
      vm.inputForm.modifiedBy = this.userId
      vm.inputForm.modifiedOn = new Date()
      vm.inputForm.totalPrice = 0
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.po, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.po)
      vm.selected = []
    },
    createExportData () {
      let vm = this
      vm.$firestore.po
        .orderBy('code')
        .get()
        .then(function (docs) {
          docs.forEach(function (doc) {
            vm.json_data.push({
              code: doc.data().code,
              description: doc.data().description
            })
          })
        })
    },
    getProduct () {
      let vm = this
      let result = []
      return new Promise(resolve => {
        vm.$database.collection('product').get().then(docs => {
          console.log(docs)
          docs.forEach(doc => {
            result.push({
              id: doc.id,
              price: doc.data().buyIn,
              data: doc.data()
            })
          })
          console.log(result)
          return resolve(result)
        })
      })
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.po)
    this.initialInputForm(this.inputForm)
    this.createExportData()
    this.productAll = await this.getProduct()
    console.log(this.productAll)
  },
  // computed
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    'inputForm.product' () {
      let vm = this
      let total = 0
      if (vm.inputForm.product) {
        let price = vm._.find(vm.productAll, {'id': vm.inputForm.product}).price
        console.log(price)
        total = price * vm.inputForm.qty
        vm.inputForm.totalPrice = total
      }
    }
  }
}
</script>

<style>
</style>
