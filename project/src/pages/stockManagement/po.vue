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
          <q-btn size="xs" small flat round icon="remove" @click="decreaseIndex(props, $firestore.po)" />
          {{ props.value }}
          <q-btn size="xs" small flat round icon="add" @click="increaseIndex(props, $firestore.po)" />
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
          <div class="q-subheading">{{ subHeading }}</div><br/><br/><br/>
          <div v-if="addProductCheck">
            <q-list-header>{{$t('Add Product')}}</q-list-header>
            <q-field
              :label="$t('Product type') + ' *'"
              :label-width="labelWidth"
              :error="$v.productForm.productType.$error"
              :error-label="$t('Requires non-empty data')"
            >
              <q-select
                v-model="productForm.productType"
                :options="productTypeOptions"
                @blur="$v.productForm.productType.$touch()"
              />
            </q-field>
            <q-field
            :label="$t('Product') + ' *'"
            :label-width="labelWidth"
            :error="$v.productForm.product.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="productForm.product"
              :options="productOptions"
              @blur="$v.productForm.product.$touch()"
            />
          </q-field>
          <q-field
            :label="$t('Qty')+' *'"
            :label-width="labelWidth"
            :error="$v.productForm.qty.$error"
            :error-label="`${!$v.productForm.qty.required ? $t('Requires non-empty data') : ''} ${!$v.productForm.qty.numeric ? $t('onlyNumerics') : ''}`"
          >
            <q-input
              v-model="productForm.qty"
              type="number"
              :disable="productForm.approval === 'approval'"
              @blur="$v.productForm.qty.$touch()"
            />
          </q-field>
          <div class="submit">
            <q-btn
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
              @click="addProductForm"
              :disable="$v.productForm.$invalid"
              :label="$t('Save')"
            />
          </div>
        </div>
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
              v-model="inputForm.index" disable
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
            :label="$t('Stock Type') + ' *'"
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
          <!-- <q-field
            :label="$t('Product Type') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.productType.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.productType"
              :options="productTypeOptions"
              @blur="$v.inputForm.productType.$touch()"
            />
          </q-field> -->
          <q-field
            :label="$t('Supplier') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.supplier.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-select
              v-model="inputForm.supplier"
              :options="supplierOptions"
              @blur="$v.inputForm.supplier.$touch()"
            />
          </q-field>
          <q-field
            :label="$t('Description')"
            :label-width="labelWidth"
            :error="$v.inputForm.description.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input v-model="inputForm.description" @blur="$v.inputForm.description.$touch()"/>
          </q-field>
          <q-table
            row-key=".key"
            selection="none"
            :columns="columnsProduct"
            :data="poProductTable"
            :filter="filterProduct"
            :loading="loading"
            :pagination.sync="pagination"
            :visible-columns="visibleColumnsProduct"
          >
          <!-- top-right -->
          <template slot="top" slot-scope="props">
            <div v-if="!addProductCheck">
              <q-btn
                class="q-mr-sm"
                color="primary"
                wait-for-ripple
                @click="addProduct"
                :label="$t('Add Product')"
              />
            </div>
            <div v-else>
              <q-btn
                class="q-mr-sm"
                color="red"
                wait-for-ripple
                @click="hideProduct"
                :label="$t('Hidden')"
              />
            </div>
          </template>
          <!-- custom index -->
          <q-td slot="body-cell-index" slot-scope="props" :props="props">
            <span small color="secondary">
              {{ (props.row.__index) }}
            </span>
          </q-td>
          <q-td slot="body-cell-product" slot-scope="props" :props="props">
            <span small color="secondary">
              {{ _.find(productOptions, {'id': props.row.product}).label }}
            </span>
          </q-td>
          <q-td slot="body-cell-productType" slot-scope="props" :props="props">
            <span small color="secondary">
              {{ _.find(productTypeOptions, {'id': props.row.productType}).label }}
            </span>
          </q-td>
          <q-td slot="body-cell-price" slot-scope="props" :props="props">
            <span small color="secondary">
              {{ _.find(productOptions, {'id': props.row.product}).data.buyIn }}
            </span>
          </q-td>
          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <span small color="secondary">
              <q-btn size="xs" color="red" round icon="remove" @click="removeRow(props)" />
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
          <!-- field description -->
          <!-- <q-field
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
          </q-field> -->
          <!-- <q-field
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
          </q-field> -->
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
              color="green"
              icon="print"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('Print')"
              @click="printReport"
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
import { date } from 'quasar'
import stockTypeOptions from 'src/components/options/stockTypeOptions'
import authUserOptions from 'src/components/options/authUserOptions'
import productOptions from 'src/components/options/productOptions'
import supplierOptions from 'src/components/options/supplierOptions'
import hasPermission from 'src/components/shared/hasPermission'
import productTypeOptions from 'src/components/options/productTypeOptions'
import { required, numeric } from 'vuelidate/lib/validators'
import crudProcess from 'src/components/datatable/crudProcess'
import publicVars from 'src/components/shared/publicVars'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  THSarabun: {
    normal: 'THSarabun.ttf',
    bold: 'THSarabun Bold.ttf',
    italics: 'THSarabun Italic.ttf',
    bolditalics: 'THSarabun Bold Italic.ttf'
  }
}
export default {
  name: 'Purchase Order',
  // mixins
  mixins: [
    hasPermission,
    crudProcess,
    stockTypeOptions,
    authUserOptions,
    supplierOptions,
    productOptions,
    productTypeOptions,
    publicVars
  ],
  // data
  data () {
    return {
      // datatable
      productAll: [],
      addProductCheck: false,
      poProductTable: [],
      formAction2: null,
      filterProduct: '',
      formModal2: false,
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
          name: 'approval',
          label: this.$t('Status'),
          field: 'approval',
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
      columnsProduct: [
        {
          name: 'id',
          label: this.$t('ID'),
          field: 'id',
          sortable: true,
          align: 'left'
        },
        {
          name: 'index',
          label: this.$t('index'),
          field: 'ss',
          sortable: true,
          align: 'left'
        },
        {
          name: 'productType',
          label: this.$t('productType'),
          field: 'productType',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          align: 'left'
        },
        {
          name: 'product',
          label: this.$t('Product'),
          field: 'product',
          sortable: true,
          align: 'left'
        },
        {
          name: 'qty',
          label: this.$t('Qty'),
          field: 'qty',
          sortable: true,
          align: 'left'
        },
        {
          name: 'price',
          label: this.$t('Price/Unit'),
          field: 'price',
          sortable: true,
          align: 'left'
        },
        {
          name: 'action',
          label: this.$t('Action'),
          field: 'action',
          sortable: true,
          align: 'left'
        }
      ],
      visibleColumnsProduct: ['index', 'productType', 'product', 'qty', 'price', 'action'],
      visibleColumns: ['index', 'code', 'approval', 'description'],
      // inputForm
      inputForm: {
        '.key': null,
        index: null,
        code: null,
        stockType: null,
        supplier: null,
        suppName: null,
        description: null,
        createdBy: this.userId,
        approval: 'waiting',
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date()
      },
      productForm: {
        '.key': null,
        product: null,
        productType: null,
        poId: null,
        qty: 0
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
      description: { required },
      supplier: { required },
      stockType: { required }
    },
    productForm: {
      productType: { required },
      product: { required },
      qty: { required, numeric }
    }
  },
  // firestore
  firestore () {
    return {
      po: this.$database.collection('po'),
      poProductDT: this.$database.collection('poProduct').where('poId', '==', this.inputForm['.key']),
      poProduct: this.$database.collection('poProduct')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      let result = ''
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      if (vm.inputForm.approval === 'approval') {
        if (vm.formAction === 'update') {
          // await vm.updateQty(vm.inputForm.product)
        }
      }
      result = await vm.addProductProcess(vm.$firestore.po, vm.inputForm, vm.$v.inputForm)
      console.log(result)
    },
    openAddFormModel (inputForm) {
      let vm = this
      vm.subHeading = vm.$t('Add')
      vm.formAction = 'add'
      vm.initialInputFormModel()
      vm.initialProductForm()
      console.log('22')
      vm.poProductTable = []
      vm.addProductCheck = false
      vm.formModal = true
    },
    initialInputFormModel () {
      let vm = this
      vm.inputForm['.key'] = null
      vm.inputForm.index = vm.collectionSize + 1
      vm.inputForm.code = null
      vm.inputForm.stockType = null
      vm.inputForm.supplier = null
      vm.inputForm.description = null
      vm.inputForm.createdBy = this.userId
      vm.inputForm.approval = 'waiting'
      vm.inputForm.createdOn = new Date()
      vm.inputForm.modifiedBy = this.userId
      vm.inputForm.modifiedOn = new Date()
      vm.addProductCheck = false
    },
    initialProductForm () {
      let vm = this
      vm.productForm['.key'] = null
      vm.productForm.product = null
      vm.productForm.productType = null
      vm.poId = null
    },
    getPo () {
      let vm = this
      let result = []
      return new Promise(resolve => {
        vm.$database.collection('po').get().then(docs => {
          console.log(docs)
          docs.forEach(doc => {
            result.push({
              id: doc.id,
              approval: doc.data().approval,
              data: doc.data()
            })
          })
          console.log(result)
          return resolve(result)
        })
      })
    },
    getPoProduct (poId) {
      return new Promise(resolve => {
        let vm = this
        let rowCount = 1
        vm.poProductTable = []
        console.log(vm.selected.length)
        if (vm.formAction === 'update' || (vm.selected.length > 0)) {
          vm.$database.collection('poProduct')
            .where('poId', '==', poId)
            .get()
            .then(docs => {
              console.log(docs)
              docs.forEach(doc => {
                vm.poProductTable.push({
                  id: doc.id,
                  data: doc.data(),
                  index: rowCount,
                  product: doc.data().product,
                  productType: doc.data().productType,
                  qty: doc.data().qty,
                  poId: doc.data().poId
                })
                rowCount++
              })
              return resolve(vm.poProductTable)
            }).catch(err => {
              console.log(err)
            })
          return resolve(vm.poProductTable)
        }
      })
    },
    addProductProcess (collection, inputForm, validate) {
      return new Promise(resolve => {
        let vm = this
        if (validate.$invalid) {
        // validate false
          vm.$q.notify({
            message: vm.$t('Form validation error'),
            type: 'nagative',
            icon: 'error_outline'
          })
        } else {
          // validate : true
          let value = {}
          for (var field in inputForm) {
            if (field !== '.key') {
              if (inputForm.hasOwnProperty(field)) {
                value[field] = inputForm[field]
              }
            }
          }
          console.log(value)
          // add to collection
          collection.add(value).then(function (docRef) {
            vm.loadingState(collection).then((result) => {
              [vm.collectionSize, vm.loading] = result
              vm.poProductTable.forEach(poProduct => {
                vm.$database.collection('poProduct').add({
                  product: poProduct.product,
                  productType: poProduct.productType,
                  qty: poProduct.qty,
                  poId: docRef.id
                })
              })
              vm.formModal = false
              vm.initialInputForm(inputForm)
              // notify
              vm.$q.notify({
                message: vm.$t('Form submitted successfully'),
                type: 'positive',
                icon: 'info'
              })
              return resolve(docRef.id)
            })
          }).catch(function (error) {
            vm.$q.notify({
              message: vm.$t('Error writing document'),
              type: 'nagative',
              icon: 'error_outline'
            })
            console.error('Error writing document: ', error)
            return resolve('')
          })
        }
      })
    },
    async addProductForm () {
      let vm = this
      let result = ''
      if (vm.formAction === 'update') {
        vm.productForm.poId = vm.inputForm['.key']
        result = await vm.addProcessProduct(vm.$firestore.poProduct, vm.productForm, vm.$v.productForm)
        console.log(result)
      } else {
        vm.poProductTable.push({
          id: '222',
          product: vm.productForm.product,
          productType: vm.productForm.productType,
          qty: vm.productForm.qty
        })
      }
    },
    addProcessProduct (collection, inputForm, validate) {
      return new Promise(resolve => {
        let vm = this
        if (validate.$invalid) {
        // validate false
          vm.$q.notify({
            message: vm.$t('Form validation error'),
            type: 'nagative',
            icon: 'error_outline'
          })
        } else {
          // validate : true
          let value = {}
          for (var field in inputForm) {
            if (field !== '.key') {
              if (inputForm.hasOwnProperty(field)) {
                value[field] = inputForm[field]
              }
            }
          }
          // add to collection
          collection.add(value).then(function (docRef) {
            vm.loadingState(collection).then((result) => {
              [vm.collectionSize, vm.loading] = result
              vm.initialProductForm(inputForm)
              vm.getPoProduct(vm.inputForm['.key'])
              // notify
              vm.$q.notify({
                message: vm.$t('Form submitted successfully'),
                type: 'positive',
                icon: 'info'
              })
              return resolve(docRef.id)
            })
          }).catch(function (error) {
            vm.$q.notify({
              message: vm.$t('Error writing document'),
              type: 'nagative',
              icon: 'error_outline'
            })
            console.error('Error writing document: ', error)
            return resolve('')
          })
        }
      })
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
    getProductList (poId) {
      let vm = this
      let result = []
      return new Promise(resolve => {
        vm.$database.collection('poProduct')
          .where('poId', '==', poId)
          .get().then(docs => {
            console.log(docs)
            docs.forEach(doc => {
              result.push({
                id: doc.id,
                product: doc.data().product,
                data: doc.data(),
                qty: doc.data().qty
              })
            })
            console.log(result)
            return resolve(result)
          })
      })
    },
    async addProduct () {
      console.log(this.poProductTable)
      this.addProductCheck = true
    },
    hideProduct () {
      this.addProductCheck = false
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
    },
    async printReport () {
      let vm = this
      let reportData = []
      vm.$q.loading.show()
      reportData = await vm.getReportData()
      vm.$q.loading.hide()
      pdfMake.createPdf(this.slipDocDefinition(reportData)).open()
    },
    slipDocDefinition (reportData) {
      let result = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        defaultStyle: {
          font: 'THSarabun'
        },
        content: [
          reportData
        ],
        styles: {
          title: {
            fontSize: 24,
            bold: true,
            margin: [5, 5, 5, 5]
          },
          header: {
            fontSize: 16,
            bold: true,
            margin: [5, 5, 5, 5]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [5, 5, 5, 5]
          },
          tableHeader: {
            fontSize: 14,
            bold: true,
            fillColor: '#dddddd',
            margin: [5, 5, 5, 5]
          },
          body: {
            fontSize: 14,
            bold: true,
            margin: [5, 5, 5, 5]
          },
          body1: {
            fontSize: 14,
            bold: true,
            fillColor: '#dddddd',
            margin: [5, 5, 5, 5]
          },
          body2: {
            fontSize: 14,
            bold: true,
            fillColor: '#c0c0c0',
            margin: [5, 5, 5, 5]
          },
          alignRight: {
            alignment: 'right'
          },
          alignRightUnderline: {
            alignment: 'right',
            bold: true
          }
        }
      }
      return result
    },
    // getReportData
    async getReportData () {
      // let product = await this.getProduct()
      let productList = await this.getProductList(this.inputForm['.key'])
      return new Promise(resolve => {
        let vm = this
        console.log(vm.stockTypeOptions)
        let result = []
        let datatable = []
        vm.$database.collection('po')
          .doc(vm.inputForm['.key'])
          .get()
          .then(function (doc) {
            datatable.push([
              vm.$t('ลำดับที่'), vm.$t('ชื่อสินค้า'),
              vm.$t('จำนวน'), vm.$t('ราคาต่อหน่วย'),
              vm.$t('รวม')
            ])
            let rowCount = 1
            let productTotal = 0
            let productPrice = 0
            productList.forEach(eachProduct => {
              productPrice = vm._.find(vm.productOptions, {'id': eachProduct.product}).data.buyIn
              productTotal += (vm._.find(vm.productOptions, {'id': eachProduct.product}).data.buyIn * eachProduct.qty)
              datatable.push([
                {text: rowCount, alignment: 'center', border: [true, false, true, false]},
                {text: `${vm._.find(vm.productOptions, {'id': eachProduct.product}).data.description}`, alignment: 'left', border: [true, false, true, false]},
                {text: `${eachProduct.qty}`, alignment: 'center', border: [true, false, true, false]},
                {text: `${productPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'right', border: [true, false, true, false]},
                {text: `${(productPrice * eachProduct.qty).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'right', border: [true, false, true, false]}
              ])
              rowCount++
            })
            for (let i = 0; i < 39; i++) {
              datatable.push([
                {text: ``, alignment: 'left', border: [true, false, true, false]},
                {text: ``, alignment: 'left', border: [true, false, true, false]},
                {text: ``, alignment: 'left', border: [true, false, true, false]},
                {text: ``, alignment: 'left', border: [true, false, true, false]},
                {text: ``, alignment: 'left', border: [true, false, true, false]}
              ])
            }
            datatable.push(
              [
                {text: `หมายเหตุ\n` + doc.data().description, alignment: 'center', colSpan: 2, rowSpan: 2},
                {text: ``, alignment: 'left'},
                {text: `รวมเป็นเงิน`, alignment: 'center', colSpan: 2},
                {text: ``, alignment: 'left'},
                {text: `${(productTotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'right'}
              ],
              [
                {text: ``, alignment: 'center'},
                {text: ``, alignment: 'left'},
                {text: `ภาษี 7%`, alignment: 'center', colSpan: 2},
                {text: ``, alignment: 'left'},
                {text: `${((productTotal) * 0.07).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'right'}
              ],
              [
                {text: `(` + vm.$ThaiBaht((productTotal) * 1.07) + `)`, colSpan: 2, alignment: 'center'},
                {text: ``, alignment: 'left'},
                {text: `รวมเป็นเงินสุทธิ`, alignment: 'center', colSpan: 2},
                {text: ``, alignment: 'left'},
                {text: `${((productTotal) * 1.07).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'right'}
              ]
            )
            result.push(
              {
                text: `${vm.applicationName}`,
                style: 'header',
                alignment: 'center'
              }
            )
            result.push(
              {
                text: `ใบสั่งซื้อ`,
                style: 'header',
                alignment: 'center'
              }
            )
            let eachSupplier = vm._.find(vm.supplierOptions, {'id': doc.data().supplier})
            let authUser = vm._.find(vm.authUserOptions, {'id': doc.data().createdBy}).label
            result.push(
              [{
                text: 'วันที่ทำรายการ: ' + date.formatDate(doc.data().createdOn, 'DD/MM/YYYY'),
                fontSize: 16,
                alignment: 'right'
              }],
              [{
                text: 'เลขที่ใบคำสั่งซื้อ: ' + doc.data().code,
                fontSize: 16,
                alignment: 'right'
              }],
              [{
                text: 'ชื่อผู้ทำรายการ: ' + authUser,
                fontSize: 16,
                alignment: 'left'
              }],
              [{
                text: 'ชื่อผู้ขาย: ' + eachSupplier.data.suppName,
                fontSize: 16,
                alignment: 'left'
              }],
              [{
                text: 'ที่อยู่: ' + eachSupplier.data.suppAddress,
                fontSize: 16,
                alignment: 'left'
              }],
              [{
                text: '\n รายการสินค้า',
                fontSize: 16,
                alignment: 'center'
              }]
            )
            result.push({
              table: {
                headerRows: 1,
                widths: [ 30, 280, 50, 50, 50 ],
                body: datatable
              }
            })
            result.push(
              [{
                text: 'หมายเหต',
                fontSize: 16,
                bold: true,
                alignment: 'left'
              }],
              [{
                text: '1). โปรดระบุใบสั่งซื้อข้างต้นในใบสั่งของทุกฉบับ',
                fontSize: 16,
                alignment: 'left'
              }],
              [{
                text: '2). การวางบิลและรับเช็ค เป็นไปตามที่บริษัทกำหนดไว้                                               ___________________',
                fontSize: 16,
                alignment: 'left'
              }],
              [{
                text: '3). ในการวางบิลเพื่อเรียกเก็บ ให้แนบสำเนาใบสั่งซื้อกำกับมาด้วย                                         ผู้มีอำนาจลงนาม',
                fontSize: 16,
                alignment: 'left'
              }]
            )
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
    ...mapGetters([
      'userId',
      'applicationName'
    ])
  },
  watch: {
    async 'selected' () {
      if (this.selected.length) {
        await this.getPoProduct(this.selected[0]['.key'])
      }
    }
  }
}
</script>

<style>
</style>
