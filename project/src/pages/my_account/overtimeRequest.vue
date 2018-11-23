<template>
  <q-page>
    <!-- ///////// -->
    <!-- filter -->
    <!-- ///////// -->
    <q-card style="margin-bottom: 5px">
      <q-card-title>
        <!-- title -->
        <p class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</p>
        <span slot="right">
          <q-field
            :label-width="6"
            :label="$t('Year (C.E.)')"
          >
            <q-select
              v-model="filterByYear"
              style="width:100px;"
              :options="yearOptions"
            />
          </q-field>
        </span>
      </q-card-title>
    </q-card>
    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :data="overtimeRequestTB"
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
            @click="openUpdateFrom(inputForm, selected[0])"
          />
          <q-btn
            class="q-mr-sm"
            color="negative"
            icon="delete"
            round
            :disable="selected[0].approval"
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

      <!-- custom index -->
      <q-td slot="body-cell-overtimeDate" slot-scope="props" :props="props">
        <q-btn
          flat
          :label="FormatDate(props.value, 'YYYY-MM-DD')"
          @click="selected=[_.find(overtimeRequestTB, {'.key': props.row['.key']})]; openUpdateFrom(inputForm, selected[0])"
        />
      </q-td>
      <!-- type -->
      <q-td slot="body-cell-type" slot-scope="props" :props="props">
        <span small>
          {{ (_.find(overtimeTypeOptions, {'value': props.value}) ? _.find(overtimeTypeOptions, {'value': props.value}).label : 'Overtime Type') }}
        </span>
      </q-td>
      <!-- authUser -->
      <q-td slot="body-cell-authUser" slot-scope="props" :props="props">
        <span small>
          {{ (_.find(authUserOptions, {'value': props.value}) ? _.find(authUserOptions, {'value': props.value}).label : 'Employee Name')}}
        </span>
      </q-td>
      <!-- approval -->
      <q-td slot="body-cell-approval" slot-scope="props" :props="props">
        <q-chip v-if="props.value" icon="check" color="positive">
          {{ $t('Approved') }}
        </q-chip>
        <q-chip v-else icon="clear" color="warning">
          {{ $t('Waiting') }}
        </q-chip>
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
          <q-field
            :label="$t('Employee')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="userId"
              disable
              :options="authUserOptions"
            />
          </q-field>
          <q-field
            :label="$t('Department')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="userInfo.department"
              disable
              :options="departmentOptions"
            />
          </q-field>
          <q-field
            :label="$t('From') + ' *'"
            :label-width="labelWidth"
          >
            <q-datetime
              v-model="inputForm.from"
              color="primary"
              format="YYYY-MM-DD HH:mm"
              format24h
              type="datetime"
              :disable="inputForm.approval"
              @change="val => { inputForm.from = val }"
            />
          </q-field>
          <q-field
            :label="$t('To') + ' *'"
            :label-width="labelWidth"
          >
            <q-datetime
              color="secondary"
              format="YYYY-MM-DD HH:mm"
              format24h
              type="datetime"
              v-model="inputForm.to"
              :disable="inputForm.approval"
            />
          </q-field>
          <q-field
            v-if="checkDiff()"
            :label="$t('Break') + ' *'"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.overtimeBreakHours"
              :disable="inputForm.approval"
              :options="[{label: `${$t('No break')}`, value: 0}, {label: `1 ${$t('Hours')}`, value: 1}]"
            />
          </q-field>

          <q-field
            :label="$t('Overtime hours')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm.overtimeHours"
              disable
              type="number"
              :suffix="$t('Hours')"
            />
          </q-field>
           <q-field
            :label="$t('Type')"
            :label-width="labelWidth"
           >
              <q-select
                v-model="inputForm.overtimeType"
                :options="overtimeTypeOptions"
                :disable="inputForm.approval"
              />
            </q-field>
            <q-field
              :label="$t('Overtime pay')"
              :label-width="labelWidth"
            >
              <q-input
                v-model="inputForm.overtimePay"
                disable
                type="text"
                :suffix="$t('Hours')"
              />
            </q-field>
            <q-field
              :label="$t('Compensate')"
              :label-width="labelWidth"
            >
              <q-toggle
                v-model="inputForm.otCompensate"
                checked-icon="sentiment very satisfied"
                unchecked-icon="sentiment very dissatisfied"
                :disable="inputForm.approval"
              />
            </q-field>
            <q-field
              :label="$t('Reason') + ' *'"
              :label-width="labelWidth"
            >
              <q-input
                v-model="inputForm.reason"
                type="text"
                :disable="inputForm.approval"
              />
            </q-field>
            <q-field
              :label="$t('Approve')"
              :label-width="labelWidth"
            >
              <q-toggle
                disable
                v-model="inputForm.approval"
                checked-icon="sentiment very satisfied"
                unchecked-icon="sentiment very dissatisfied"
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
              :label="$t('Save')"
              @click="addForm"
            />
            <q-btn
              v-if="formAction==='update'"
              class="q-mr-sm"
              icon="save"
              color="primary"
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
import { date } from 'quasar'
import { mapGetters } from 'vuex'
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
import authUserOptions from 'src/components/options/authUserOptions'
import crudProcess from 'src/components/datatable/crudProcess'
import departmentOptions from 'src/components/options/departmentOptions'
import formatDate from 'src/components/shared/formatDate'
import userInfo from 'src/components/shared/userInfo'
import hasPermission from 'src/components/shared/hasPermission'
import overtimeTypeOptions from 'src/components/options/overtimeTypeOptions'
import publicVars from 'src/components/shared/publicVars'
import yearOptions from 'src/components/options/yearOptions'

export default {
  name: 'overtimeRequest',
  // mixins
  mixins: [
    authUserOptions,
    crudProcess,
    departmentOptions,
    formatDate,
    userInfo,
    hasPermission,
    overtimeTypeOptions,
    publicVars,
    yearOptions
  ],
  // data
  data () {
    return {
      // app variable
      subHeading: null,
      staffInDept: [],
      filterByYear: parseInt(date.formatDate(Date.now(), 'YYYY')),
      // main datatable
      pagination: {
        sortBy: 'overtimeDate',
        descending: true
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'overtimeDate', label: this.$t('Date'), field: 'overtimeDate', sortable: true, align: 'left' },
        { name: 'hours', label: this.$t('Hours'), field: 'overtimeHours', sortable: true, align: 'left' },
        { name: 'type', label: this.$t('Type'), field: 'overtimeType', sortable: true, align: 'left' },
        { name: 'pay', label: this.$t('Pay'), field: 'overtimePay', sortable: true, align: 'left' },
        { name: 'approval', label: this.$t('Approval'), field: 'approval', sortable: true, align: 'left' }
      ],
      visibleColumns: ['overtimeDate', 'hours', 'pay', 'type', 'approval'],
      // inputForm
      inputForm: {
        '.key': null,
        authUser: '',
        department: '',
        overtimeDate: new Date(),
        from: new Date(),
        to: new Date(),
        otCompensate: true,
        overtimeBreakHours: 0,
        overtimeHours: 0,
        overtimeType: '',
        overtimePay: 0,
        reason: '',
        approval: false,
        approvedBy: null,
        reference: '',
        calendarYear: parseInt(date.formatDate(Date.now(), 'YYYY')),
        // loging
        createdBy: '',
        createdOn: '',
        modifiedBy: '',
        modifiedOn: ''
      },
      departmentId: ''
    }
  },
  // validations
  validations: {
    inputForm: {
      from: { required },
      to: { required },
      overtimeHours: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(8)
      },
      overtimeType: { required },
      reason: { required }
    }
  },
  // firestore
  firestore () {
    return {
      overtimeRequestTB: this.$database.collection('overtimeRequest')
        .where('authUser', '==', this.userId)
        .where('calendarYear', '==', this.filterByYear),
      overtimeRequest: this.$database.collection('overtimeRequest')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      vm.inputForm.authUser = vm.userId
      vm.inputForm.approvedBy = (vm._.find(vm.authUserOptions, {'value': vm.userId}) ? vm._.find(vm.authUserOptions, {'value': vm.userId}).reportTo : '')
      vm.inputForm.department = (vm._.find(vm.authUserOptions, {'value': vm.userId}) ? vm._.find(vm.authUserOptions, {'value': vm.userId}).department : '')
      vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
      vm.inputForm.overtimeDate = new Date(vm.inputForm.from)
      await vm.addProcess(vm.$firestore.overtimeRequest, vm.inputForm, vm.$v.inputForm)
    },
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.overtimeDate = new Date(vm.inputForm.from)
      vm.inputForm.modifiedOn = new Date()
      await vm.updateProcess(vm.$firestore.overtimeRequest, vm.inputForm, vm.$v.inputForm)
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.overtimeRequest)
      vm.selected = []
    },
    checkDiff () {
      let result = false
      if ((date.getDateDiff(this.inputForm.to, this.inputForm.from, 'hours')) > 4) {
        result = true
      }
      return result
    },
    calcOvertimeHours () {
      let time1 = this.inputForm.from
      let time2 = this.inputForm.to
      let brkhrs = this.inputForm.overtimeBreakHours
      let unit = 'minutes'
      let diff = date.getDateDiff(time2, time1, unit)
      let result = Math.floor(diff / 60) - brkhrs
      if (result >= 0) {
        this.inputForm.overtimeHours = result
        return result
      } else {
        this.inputForm.overtimeHours = 0
        return 0
      }
    },
    async calcOvertimeType () {
      let vm = this
      let otDate = vm.inputForm.from
      let otFrom = vm.inputForm.from
      let workingDay = await vm.getWorkingDay()
      let traditionalHolidays = await vm.getTraditionalHolidays()
      let workingHours = workingDay[date.formatDate(otDate, 'd')].wh
      let holiday = false
      let chkOt = new Date(`${date.formatDate(otDate, 'YYYY-MM-DD')}T${date.formatDate(otFrom, 'HH:mm')}`)
      let chkOtp1 = date.addToDate(chkOt, {minutes: 1})
      let whFrom = new Date(`${date.formatDate(otDate, 'YYYY-MM-DD')}T${date.formatDate(workingHours.from, 'HH:mm')}`)
      let whTo = new Date(`${date.formatDate(otDate, 'YYYY-MM-DD')}T${date.formatDate(workingHours.to, 'HH:mm')}`)
      let overtime = !date.isBetweenDates(date.formatDate(chkOtp1, 'YYYY-MM-DDTHH:mm'), date.formatDate(whFrom, 'YYYY-MM-DDTHH:mm'), date.formatDate(whTo, 'YYYY-MM-DDTHH:mm'))
      // case Traditional Holidays
      if (vm._.includes(traditionalHolidays, date.formatDate(otDate, 'DDD'))) {
        holiday = true
      } else if (!workingDay[date.formatDate(otDate, 'd')].wd) {
        holiday = true
      } else if (workingDay[date.formatDate(otDate, 'd')].wd) {
        holiday = false
      }
      vm.inputForm.overtimeType = (vm._.find(vm.overtimeTypeOptions, { 'holiday': holiday, 'overtime': overtime }) ? vm._.find(vm.overtimeTypeOptions, { 'holiday': holiday, 'overtime': overtime }).value : '')
    },
    calcOvertimePay () {
      let vm = this
      let totalHrs = vm.calcOvertimeHours()
      let overtimeTypeId = vm.inputForm.overtimeType
      let otRate = (vm._.find(vm.overtimeTypeOptions, { 'value': overtimeTypeId }) ? vm._.find(vm.overtimeTypeOptions, { 'value': overtimeTypeId }).rate : 0)
      let result = Number(totalHrs * otRate)
      if (result >= 0) {
        vm.inputForm.overtimePay = result
      }
    },
    getWorkingDay () {
      return new Promise(resolve => {
        let result = []
        this.$database.collection('company').limit(1).get().then(function (docs) {
          docs.forEach(function (doc) {
            result = [
              // sunday
              {
                // working day
                wd: doc.data().sunday.workingDay,
                // working hour
                wh: {from: doc.data().sunday.rangeFrom, to: doc.data().sunday.rangeTo},
                // break hour
                bkh: doc.data().sunday.breakHour
              },
              {
                // working day
                wd: doc.data().monday.workingDay,
                // working hour
                wh: {from: doc.data().monday.rangeFrom, to: doc.data().monday.rangeTo},
                // break hour
                bkh: doc.data().monday.breakHour
              },
              {
                // working day
                wd: doc.data().tuesday.workingDay,
                // working hour
                wh: {from: doc.data().tuesday.rangeFrom, to: doc.data().tuesday.rangeTo},
                // break hour
                bkh: doc.data().tuesday.breakHour
              },
              {
                // working day
                wd: doc.data().wednesday.workingDay,
                // working hour
                wh: {from: doc.data().wednesday.rangeFrom, to: doc.data().wednesday.rangeTo},
                // break hour
                bkh: doc.data().wednesday.breakHour
              },
              {
                // working day
                wd: doc.data().thursday.workingDay,
                // working hour
                wh: {from: doc.data().thursday.rangeFrom, to: doc.data().thursday.rangeTo},
                // break hour
                bkh: doc.data().thursday.breakHour
              },
              {
                // working day
                wd: doc.data().friday.workingDay,
                // working hour
                wh: {from: doc.data().friday.rangeFrom, to: doc.data().friday.rangeTo},
                // break hour
                bkh: doc.data().friday.breakHour
              },
              {
                // working day
                wd: doc.data().saturday.workingDay,
                // working hour
                wh: {from: doc.data().saturday.rangeFrom, to: doc.data().saturday.rangeTo},
                // break hour
                bkh: doc.data().saturday.breakHour
              }
            ]
            return resolve(result)
          })
        })
      })
    },
    getTraditionalHolidays () {
      return new Promise(resolve => {
        let result = []
        this.$database.collection('holidayCalendar')
          .where('calendarYear', '==', parseInt(date.formatDate(this.inputForm.from, 'YYYY'))).get()
          .then(docs => {
            docs.forEach(doc => {
              result.push(date.formatDate(doc.data().date, 'DDD'))
            })
            return resolve(result)
          })
      })
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.overtimeRequestTB)
    this.$q.loading.show()
    this.userInfo = await this.getUserInfo(this.userId)
    this.$q.loading.hide()
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  // watch
  watch: {
    filterByYear () {
      this.$binding('overtimeRequest', this.$database.collection('overtimeRequest')
        .where('authUser', '==', this.userId)
        .where('calendarYear', '==', this.filterByYear))
    },
    'inputForm.from': function () {
      if (this.inputForm.from) {
        let diff = date.getDateDiff(this.inputForm.to, this.inputForm.form, 'minutes')
        if (diff < 0) {
          this.inputForm.to = this.date.addToDate(this.inputForm.from, {hours: 1})
        }
        this.calcOvertimeHours()
        this.calcOvertimeType()
        this.calcOvertimePay()
        this.inputForm.calendarYear = parseInt(date.formatDate(this.inputForm.from, 'YYYY'))
      }
    },
    'inputForm.to': function () {
      if (this.inputForm.to) {
        this.calcOvertimeType()
        this.calcOvertimeHours()
        this.calcOvertimePay()
      }
    },
    'inputForm.overtimeType': function () {
      if (this.inputForm.overtimeType) {
        this.calcOvertimeHours()
        this.calcOvertimePay()
      }
    },
    'inputForm.overtimeBreakHours': function () {
      this.calcOvertimeHours()
      this.calcOvertimePay()
    }
  }
}
</script>

<style>
</style>
