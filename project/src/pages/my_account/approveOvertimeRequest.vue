<template>
  <q-page>
    <q-card style="margin-bottom: 5px">
      <q-card-title>
        <!-- title -->
        <p class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</p>
        <span slot="right">
          <q-field
            style="width:200px"
            :label-width="6"
            :label="$t('Year (C.E.)')"
          >
            <q-select
              v-model="filterByYear"
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
      :columns="columns"
      :data="overtimeRequestTB"
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
            :disable="!hasPermission(['supervisor--overtime-approve--update'])"
            @click="openUpdateFrom(inputForm, selected[0])"
          />
        </div>
      </template>
      <!-- top-left -->
      <template slot="top-left" slot-scope="props">
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
      <!-- custom overtimeDate -->
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
          {{ (_.find(authUserOptions, {'value': props.value}) ? _.find(authUserOptions, {'value': props.value}).label : '.  .  .')}}
        </span>
      </q-td>
      <!-- approval -->
      <q-td slot="body-cell-approval" slot-scope="props" :props="props">
        <q-chip v-if="props.value" icon="check" color="positive">
          {{ $t('Approval') }}
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
          <q-field
            :label="$t('Overtime date')"
            :label-width="labelWidth"
          >
            <q-datetime
              v-model="inputForm.overtimeDate"
              color="primary"
              disable
              type="date"
            />
          </q-field>
          <q-field
            :label="$t('From')"
            :label-width="labelWidth"
          >
            <q-datetime
              v-model="inputForm.from"
              color="primary"
              disable
              format24h
              type="time"
            />
          </q-field>
          <q-field
            :label="$t('To')"
            :label-width="labelWidth"
          >
            <q-datetime
              v-model="inputForm.to"
              color="secondary"
              disable
              format24h
              type="time"
            />
          </q-field>
          <q-field
            :label="$t('Break')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.overtimeBreakHours"
              disable
              :options="[
                { label: `${$t('No break')}`, value: 0 },
                { label: `1 ${$t('Hours')}`, value: 1 }
              ]"
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
            />
          </q-field>
          <q-field
            :label="$t('Reason')"
            :label-width="labelWidth"
          >
            <q-input
              v-model="inputForm.reason"
              type="text"
            />
          </q-field>
          <q-field
            :label="$t('Approval')"
            :label-width="labelWidth"
          >
            <q-toggle
              v-model="inputForm.approval"
              checked-icon="sentiment very satisfied"
              unchecked-icon="sentiment very dissatisfied"
            />
          </q-field>

          <!-- submit -->
          <div class="submit">
            <q-btn
              v-if="formAction==='update'"
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
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
import _ from 'lodash'
import crudProcess from 'src/components/datatable/crudProcess'
import hasPermission from 'src/components/shared/hasPermission'
import teamCalendarOptions from 'src/components/options/teamCalendarOptions'
import publicVars from 'src/components/shared/publicVars'
import formatDate from 'src/components/shared/formatDate'
import yearOptions from 'src/components/options/yearOptions'
import overtimeTypeOptions from 'src/components/options/overtimeTypeOptions'
import departmentOptions from 'src/components/options/departmentOptions'
import authUserOptions from 'src/components/options/authUserOptions'

export default {
  name: 'approveOvertimeRequest',
  // mixins
  mixins: [
    crudProcess,
    hasPermission,
    teamCalendarOptions,
    formatDate,
    yearOptions,
    publicVars,
    overtimeTypeOptions,
    authUserOptions,
    departmentOptions
  ],
  // data
  data () {
    return {
      // app variable
      staffInDept: [],
      filterByYear: parseInt(date.formatDate(Date.now(), 'YYYY')),
      // main datatable
      pagination: {
        sortBy: 'overtimeDate',
        descending: true
      },
      columns: [
        { name: '.key', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'overtimeDate', label: this.$t('Date'), field: 'overtimeDate', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10), align: 'left' },
        { name: 'authUser', label: this.$t('Name'), field: 'authUser', sortable: true, align: 'left' },
        { name: 'hours', label: this.$t('Hours'), field: 'overtimeHours', sortable: true, align: 'left' },
        { name: 'pay', label: this.$t('Pay'), field: 'overtimePay', sortable: true, align: 'left' },
        { name: 'type', label: this.$t('Type'), field: 'overtimeType', sortable: false, align: 'left' },
        { name: 'approval', label: this.$t('Approval'), field: 'approval', sortable: false, align: 'left' }
      ],
      visibleColumns: ['overtimeDate', 'authUser', 'hours', 'pay', 'type', 'approval'],
      // inputForm
      inputForm: {
        '.key': null,
        authUser: '',
        department: '',
        overtimeDate: new Date(),
        from: null,
        otCompensate: false,
        to: null,
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
      }
    }
  },
  validations: {
    inputForm: {}
  },
  // firestore
  firestore () {
    return {
      overtimeRequestTB: this.$database.collection('overtimeRequest')
        .where('calendarYear', '==', this.filterByYear),
      overtimeRequest: this.$database.collection('overtimeRequest')
    }
  },
  // methods
  methods: {
    async updateForm () {
      let vm = this
      vm.inputForm.modifiedBy = vm.userId
      vm.inputForm.overtimeDate = new Date(vm.inputForm.overtimeDate)
      vm.inputForm.modifiedOn = new Date()
      if (vm.inputForm.approval) {
        await vm.addWorkSchedule()
      } else {
        await vm.deleteWorkSchedule()
      }
      await vm.updateProcess(vm.$firestore.overtimeRequest, vm.inputForm, vm.$v.inputForm)
    },
    // getYear
    getYear (d) {
      return d.getFullYear()
    },
    // getMonth
    getMonth (d) {
      return d.getMonth() + 1
    },
    // getDate
    getDate (d) {
      return d.getDate()
    },
    // addWorkSchedule
    addWorkSchedule () {
      let vm = this
      let teamCalendar = []
      let starthour = parseInt(date.formatDate(vm.inputForm.from, 'HH'))
      let endhour = parseInt(date.formatDate(vm.inputForm.to, 'HH'))
      let startmin = parseInt(date.formatDate(vm.inputForm.from, 'mm'))
      let endmin = parseInt(date.formatDate(vm.inputForm.to, 'mm'))
      let dateForm = date.buildDate({
        year: vm.getYear(vm.inputForm.overtimeDate),
        month: vm.getMonth(vm.inputForm.overtimeDate),
        date: vm.getDate(vm.inputForm.overtimeDate),
        hours: starthour,
        minutes: startmin,
        seconds: 0,
        milliseconds: 0
      })
      let dateTo = date.buildDate({
        year: vm.getYear(vm.inputForm.overtimeDate),
        month: vm.getMonth(vm.inputForm.overtimeDate),
        date: vm.getDate(vm.inputForm.overtimeDate),
        hours: endhour,
        minutes: endmin,
        seconds: 0,
        milliseconds: 0
      })
      vm.teamCalendarOptions.forEach(eachTeam => {
        if (vm._.includes(eachTeam.teamMembers, vm.inputForm.authUser)) {
          teamCalendar.push(eachTeam.id)
        }
      })
      return new Promise(resolve => {
        vm.$database.collection('workSchedule').where('overtime', '==', vm.inputForm['.key']).get()
          .then(docs => {
            if (!docs.size) {
              teamCalendar.forEach(team => {
                vm.$database.collection('workSchedule').add({
                  teamCalendar: team,
                  overtime: vm.inputForm['.key'],
                  authUser: vm.inputForm.authUser,
                  start: dateForm,
                  end: dateTo,
                  note: '',
                  type: 'overTime',
                  createdBy: vm.userId,
                  createdOn: new Date(),
                  modifiedBy: vm.userId,
                  modifiedOn: new Date()
                })
                  .then(function (data) {
                    console.log(data.id)
                    return resolve(true)
                  })
                  .catch(function (error) {
                    console.log(error)
                    vm.$q.notify({
                      message: `${vm.$t('error')} : ${error}`,
                      type: 'warning',
                      icon: 'warning'
                    })
                    return resolve(true)
                  })
              })
            } else {
            }
          })
      })
    },
    deleteWorkSchedule () {
      let vm = this
      let result = []
      return new Promise(resolve => {
        vm.$database.collection('workSchedule').where('overtime', '==', vm.inputForm['.key']).get()
          .then(docs => {
            docs.forEach(doc => {
              vm.deleteWorkScheduleDB(doc.id)
            })
            return resolve(result)
          })
      })
    },
    // deleteWorkSchedule
    deleteWorkScheduleDB (id) {
      return new Promise(resolve => {
        let vm = this
        vm.$database.collection('workSchedule').doc(id).delete()
          // then
          .then(function () {
            return resolve(true)
          })
          // error
          .catch((error) => {
            console.error('Error removing document: ', error)
            return resolve(true)
          })
      })
    },
    calcOvertimeHours () {
      let time1 = this.inputForm.from
      let time2 = this.inputForm.to
      let brkhrs = this.inputForm.overtimeBreakHours
      let unit = 'hours'
      let diff = date.getDateDiff(time2, time1, unit)
      let result = diff - brkhrs
      if (result > 0) {
        this.inputForm.overtimeHours = result
        return result
      } else {
        return 0
      }
    },
    async calcOvertimeType () {
      let vm = this
      let otDate = vm.inputForm.overtimeDate
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
      vm.inputForm.overtimeType = (_.find(vm.overtimeTypeOptions, { 'holiday': holiday, 'overtime': overtime }) ? _.find(vm.overtimeTypeOptions, { 'holiday': holiday, 'overtime': overtime }).value : '')
    },
    calcOvertimePay () {
      let vm = this
      let totalHrs = vm.calcOvertimeHours()
      let overtimeTypeId = vm.inputForm.overtimeType
      let otRate = (_.find(vm.overtimeTypeOptions, { 'value': overtimeTypeId }) ? _.find(vm.overtimeTypeOptions, { 'value': overtimeTypeId }).rate : 0)
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
              {wd: doc.data().sunday.workingDay, wh: doc.data().sunday.range ? doc.data().sunday.range : [], bkh: doc.data().sunday.breakHour},
              {wd: doc.data().monday.workingDay, wh: doc.data().monday.range ? doc.data().monday.range : [], bkh: doc.data().monday.breakHour},
              {wd: doc.data().tuesday.workingDay, wh: doc.data().tuesday.range ? doc.data().tuesday.range : [], bkh: doc.data().tuesday.breakHour},
              {wd: doc.data().wednesday.workingDay, wh: doc.data().wednesday.range ? doc.data().wednesday.range : [], bkh: doc.data().wednesday.breakHour},
              {wd: doc.data().thursday.workingDay, wh: doc.data().thursday.range ? doc.data().thursday.range : [], bkh: doc.data().thursday.breakHour},
              {wd: doc.data().friday.workingDay, wh: doc.data().friday.range ? doc.data().friday.range : [], bkh: doc.data().friday.breakHour},
              {wd: doc.data().saturday.workingDay, wh: doc.data().saturday.range ? doc.data().saturday.range : [], bkh: doc.data().saturday.breakHour}
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
          .where('year', '==', parseInt(date.formatDate(this.inputForm.overtimeDate, 'YYYY')))
          .get()
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
    this.initialInputForm(this.inputForm)
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
      console.log('filter')
      this.$binding('overtimeRequestTB', this.$database.collection('overtimeRequest')
        .where('approvedBy', '==', this.userId)
        .where('calendarYear', '==', this.filterByYear))
    },
    'inputForm.overtimeDate': function () {
      if (this.inputForm.overtimeDate) {
        this.inputForm.calendarYear = parseInt(date.formatDate(this.inputForm.overtimeDate, 'YYYY'))
        this.calcOvertimeType()
        this.calcOvertimePay()
      }
    },
    'inputForm.from': function () {
      if (this.inputForm.from) {
        this.calcOvertimeHours()
        this.calcOvertimeType()
        this.calcOvertimePay()
      }
    },
    'inputForm.to': function () {
      if (this.inputForm.to) {
        this.calcOvertimeHours()
        this.calcOvertimeType()
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
      if (this.inputForm.overtimeBreakHours) {
        this.calcOvertimeHours()
        this.calcOvertimePay()
      }
    }
  }
}
</script>

<style>
</style>
