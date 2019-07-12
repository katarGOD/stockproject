<template>
  <q-page padding>
    <iframe
      id='pdfV'
      style="width:100%; height: 800px;"
    >
    </iframe>
  </q-page>
</template>

<script>
// import
import { date } from 'quasar'
import pdfMake from 'pdfmake/build/pdfmake'
import { mapGetters } from 'vuex'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import departmentOptions from 'src/components/options/departmentOptions'
import positionOptions from 'src/components/options/positionOptions'
import teamCalendarOptions from 'src/components/options/teamCalendarOptions'
import authUserOptions from 'src/components/options/authUserOptions'
import productOptions from 'src/components/options/productOptions'
import stockTypeOptions from 'src/components/options/stockTypeOptions'
import productTypeOptions from 'src/components/options/productTypeOptions'

// pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  THSarabun: {
    normal: 'THSarabun.ttf',
    bold: 'THSarabun Bold.ttf',
    italics: 'THSarabun Italic.ttf',
    bolditalics: 'THSarabun Bold Italic.ttf'
  }
}

// export
export default {
  name: 'productList',
  // mixins
  mixins: [
    departmentOptions,
    positionOptions,
    teamCalendarOptions,
    authUserOptions,
    productOptions,
    stockTypeOptions,
    productTypeOptions
  ],
  data () {
    return {
      finished: false
    }
  },
  methods: {
    // printing report
    // --------------
    // reportDocDefinition
    reportDocDefinition (reportData) {
      let result = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        defaultStyle: {
          font: 'THSarabun'
        },
        header: function (currentPage, pageCount) {
          return {
            columns: [
              {
                alignment: 'right',
                margin: 20,
                fontSize: 14,
                text: currentPage.toString() + ' of ' + pageCount
              }
            ]
          }
        },
        content: [
          reportData
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 0]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 5, 0, 5]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
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
    getProductList () {
      let vm = this
      let result = []
      return new Promise(resolve => {
        vm.$database.collection('poProduct')
          .get().then(docs => {
            docs.forEach(doc => {
              result.push({
                qty: doc.data().qty,
                totalPrice: (vm._.find(vm.productOptions, {'id': doc.data().product}).data.buyIn ? vm._.find(vm.productOptions, {'id': doc.data().product}).data.buyIn : 0) * doc.data().qty,
                poId: doc.data().poId
              })
            })
            return resolve(result)
          })
      })
    },
    // making report data
    async getPoList () {
      let productSum = await this.getProductList()
      return new Promise(resolve => {
        let vm = this
        let result = []
        let datatable = []
        let productCount = 0
        vm.$database.collection('po')
          .orderBy('description')
          .get()
          .then(function (docs) {
            datatable.push([
              vm.$t('วันเวลา'), vm.$t('ผู้ทำรายการ'),
              vm.$t('รหัสใบเสร็จ'), vm.$t('จำนวน'),
              vm.$t('ราคารวม'), vm.$t('รายละเอียด'),
              vm.$t('สถานะการอนุมัติ')
            ])
            docs.forEach(function (doc) {
              let createdBy = vm._.find(vm.authUserOptions, {'id': doc.data().createdBy}).label
              let totalQty = 0
              let totalPrice = 0
              let productList = vm._.filter(productSum, {'poId': doc.id}) ? vm._.filter(productSum, {'poId': doc.id}) : []
              if (productList.length) {
                productList.forEach(eachProduct => {
                  totalQty += eachProduct.qty
                  totalPrice += eachProduct.totalPrice
                })
              }
              productCount++
              datatable.push([
                {text: `${date.formatDate(doc.data().createdOn, 'DD/MM/YYYY HH:mm')}`, alignment: 'left'},
                {text: `${createdBy}`, alignment: 'left'},
                {text: `${doc.data().code}`, alignment: 'left'},
                {text: `${totalQty}`, alignment: 'left'},
                {text: `${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'left'},
                {text: `${doc.data().description}`, alignment: 'left'},
                {text: `${doc.data().approval}`, alignment: 'left'}
              ])
            })
            datatable.push([
              {text: 'Total Product : ' + productCount, fontSize: 16, colSpan: 7, bold: true, alignment: 'right'}
            ])
            result.push(
              {
                text: `${vm.applicationName}`,
                style: 'header',
                alignment: 'center'
              }
            )
            result.push(
              {
                text: `รายงานใบสั่งซื้อทั้งหมด`,
                style: 'header',
                alignment: 'center'
              }
            )
            result.push({
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*', '*', '*' ],
                body: datatable
              },
              layout: 'headerLineOnly'
            })
            return resolve(result)
          })
      })
    },
    // printReport
    async printReport () {
      let vm = this
      let reportData = []
      vm.$q.loading.show()
      reportData = await vm.getPoList()
      vm.$q.loading.hide()
      // pdfMake.createPdf(this.reportDocDefinition(reportData)).open()
      pdfMake.createPdf(vm.reportDocDefinition(reportData)).getDataUrl(function (outDoc) {
        vm.finished = true
        document.getElementById('pdfV').src = outDoc
      })
    },
    getDepartmentName (id) {
      let vm = this
      let result = '...'
      if (vm.departmentOptions) {
        if (vm._.find(vm.departmentOptions, {id: id})) {
          result = vm._.find(vm.departmentOptions, {id: id}).data.code
        }
      }
      return result
    },
    getTeamCalendarName (id) {
      let vm = this
      let result = '...'
      if (vm.teamCalendarOptions) {
        if (vm._.find(vm.teamCalendarOptions, {id: id})) {
          result = vm._.find(vm.teamCalendarOptions, {id: id}).data.code
        }
      }
      return result
    }
  },
  // created
  created: async function () {
    this.printReport()
  },
  computed: {
    ...mapGetters([
      'userId',
      'applicationName',
      'subtitle',
      'locale'
    ])
  }
}
</script>
