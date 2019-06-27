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
      :data="withdraw"
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
          <q-btn size="xs" small flat round icon="remove" @click="decreaseIndex(props, $firestore.withdraw)" />
          {{ props.value }}
          <q-btn size="xs" small flat round icon="add" @click="increaseIndex(props, $firestore.withdraw)" />
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
              :disable="inputForm.approval === 'approval'"
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
              :disable="inputForm.approval === 'approval'"
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
              :disable="inputForm.approval === 'approval'"
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
              :disable="inputForm.approval === 'approval'"
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
              :disable="inputForm.approval === 'approval'"
              :options="productOptions"
              @blur="$v.inputForm.product.$touch()"
            />
          </q-field>
          <!-- field description -->
          <q-field
            :label="$t('Description')"
            :label-width="labelWidth"
          >
            <q-input v-model="inputForm.description"
            :disable="inputForm.approval === 'approval'"/>
          </q-field>
          <q-field
            :label="$t('Qty All')+' *'"
            :label-width="labelWidth"
          >
            <q-input
              v-model="qtyAll"
              type="number"
              disabled
            />
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
              :disable="inputForm.approval === 'approval'"
              @blur="$v.inputForm.qty.$touch()"
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
              color="green"
              icon="print"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('Print')"
              @click="printRp"
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
import hasPermission from 'src/components/shared/hasPermission'
import productOptions from 'src/components/options/productOptions'
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
    crudProcess,
    stockTypeOptions,
    authUserOptions,
    productOptions,
    hasPermission,
    productTypeOptions,
    publicVars
  ],
  // data
  data () {
    return {
      qtyAll: 0,
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
      withdraw: this.$database.collection('withdraw')
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
        await vm.updateQty(vm.inputForm.product)
      }
      result = await vm.addProcess(vm.$firestore.withdraw, vm.inputForm, vm.$v.inputForm)
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
      let withdraw = await vm.getWithdraw()
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.modifiedOn = new Date()
      console.log(withdraw)
      console.log(vm._.find(withdraw, {'id': vm.inputForm['.key']}).approval)
      if (vm._.find(withdraw, {'id': vm.inputForm['.key']}).approval === 'waiting') {
        if (vm.inputForm.approval === 'approval') {
          await vm.updateQty(vm.inputForm.product)
        }
      }
      await vm.updateProcess(vm.$firestore.withdraw, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.withdraw)
      vm.selected = []
    },
    createExportData () {
      let vm = this
      vm.$firestore.withdraw
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
    getWithdraw () {
      let vm = this
      let result = []
      return new Promise(resolve => {
        vm.$database.collection('withdraw').get().then(docs => {
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
              data: doc.data(),
              qty: doc.data().qty
            })
          })
          console.log(result)
          return resolve(result)
        })
      })
    },
    updateQty (idProduct) {
      let vm = this
      return new Promise(resolve => {
        vm.$database.collection('product').doc(idProduct).update({
          qty: vm.qtyAll - vm.inputForm.qty
        }).then(() => {
          return resolve(true)
        })
      })
    },
    async printRp () {
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
      let product = await this.getProduct()
      console.log(product)
      return new Promise(resolve => {
        let vm = this
        let result = []
        let datatable = []
        vm.$database.collection('withdraw')
          .doc(vm.inputForm['.key'])
          .get()
          .then(function (doc) {
            console.log(doc.data())
            datatable.push([
              vm.$t('ลำดับที่'), vm.$t('ชื่อสินค้า'),
              vm.$t('จำนวน'), vm.$t('คลัง'),
              vm.$t('รวม')
            ])
            console.log(doc.data())
            let eachProduct = vm._.find(product, {'id': doc.data().product})
            let eachStockTypeOption = vm._.find(vm.stockTypeOptions, {'id': doc.data().stockType})
            console.log(eachStockTypeOption)
            datatable.push([
              {text: `1`, alignment: 'left', rowSpan: 40},
              {text: `${eachProduct.data.description}`, alignment: 'left', rowSpan: 40},
              {text: `${doc.data().qty}`, alignment: 'center', rowSpan: 40},
              {text: `${eachStockTypeOption.data.code}`, alignment: 'center', rowSpan: 40},
              {text: `${doc.data().qty}`, alignment: 'center', rowSpan: 40}
            ])
            for (let i = 0; i < 39; i++) {
              datatable.push([
                {text: ``, alignment: 'left'},
                {text: ``, alignment: 'left'},
                {text: ``, alignment: 'left'},
                {text: ``, alignment: 'left'}
              ])
            }
            datatable.push(
              [
                {text: `หมายเหตุ\n` + doc.data().description, alignment: 'center', colSpan: 2},
                {text: ``, alignment: 'left'},
                {text: `รวมเป็นจำนวนทั้งสิ้น`, alignment: 'center', colSpan: 2},
                {text: ``, alignment: 'left'},
                {text: `${(doc.data().qty)}`, alignment: 'center'}
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
                text: `ใบเบิกสินค้า`,
                style: 'header',
                alignment: 'center'
              }
            )
            let authUser = vm._.find(vm.authUserOptions, {'id': doc.data().createdBy}).label
            result.push(
              [{
                text: 'วันที่ทำรายการ: ' + date.formatDate(doc.data().createdOn, 'DD/MM/YYYY'),
                fontSize: 16,
                alignment: 'right'
              }],
              [{
                text: 'เลขที่ใบเบิกสินค้า: ' + doc.data().code,
                fontSize: 16,
                alignment: 'right'
              }],
              [{
                text: 'ผู้ทำรายการ: ' + authUser,
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
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.withdraw)
    this.initialInputForm(this.inputForm)
    this.createExportData()
    this.productAll = await this.getProduct()
    console.log(this.productAll)
  },
  // computed
  computed: {
    ...mapGetters(['userId', 'applicationName'])
  },
  watch: {
    'inputForm.product' () {
      let vm = this
      if (vm.inputForm.product) {
        let qty = vm._.find(vm.productAll, {'id': vm.inputForm.product}).qty
        vm.qtyAll = qty
      }
    }
  }
}
</script>

<style>
</style>
