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
import pdfMake from 'pdfmake/build/pdfmake'
import { mapGetters } from 'vuex'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import departmentOptions from 'src/components/options/departmentOptions'
import positionOptions from 'src/components/options/positionOptions'
import teamCalendarOptions from 'src/components/options/teamCalendarOptions'

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
    teamCalendarOptions
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
        pageOrientation: 'vertical',
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
    // making report data
    getProductList () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        let datatable = []
        let productCount = 0
        vm.$database.collection('product')
        //   .orderBy('description')
          .where('qty', '<=', 4)
          .get()
          .then(function (docs) {
            datatable.push([
              vm.$t('รหัสสินค้า'), vm.$t('ชื่อสินค้า'),
              vm.$t('ราคาซื้อ'), vm.$t('ราคาขาย'),
              vm.$t('จำนวนสินค้า')
            ])
            docs.forEach(function (doc) {
              productCount++
              datatable.push([
                {text: `${doc.data().code}`, alignment: 'left'},
                {text: `${doc.data().description}`, alignment: 'left'},
                {text: `${doc.data().buyIn.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'left'},
                {text: `${doc.data().buyOut.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, alignment: 'left'},
                {text: `${doc.data().qty}`, alignment: 'left'}
              ])
            })
            datatable.push([
              {text: 'Total Product : ' + productCount, fontSize: 16, colSpan: 5, bold: true, alignment: 'right'}
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
                text: `รายงานสินค้าทั้งหมด`,
                style: 'header',
                alignment: 'center'
              }
            )
            result.push({
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*' ],
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
      reportData = await vm.getProductList()
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
