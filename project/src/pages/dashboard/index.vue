<template>
  <div class="row justify-between gutter-lg">

    <!-- ///////// -->
    <!-- datatable -->
    <!-- ///////// -->
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-table
        :data="authUser"
        :pagination.sync="pagination"
        :loading="loading"
        :columns="columns"
        :visible-columns="visibleColumns"
        :filter="filter"
        row-key=".key"
      >
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
          <q-datetime v-model="selectedDate" type="date" />
        </template>
        <!-- custom grid -->
        <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <!-- photo -->
            <template v-if="col.name === 'photo'">
              <template v-if="todayLastClock(props.key)">
                <img
                  v-if="todayLastClock(props.key).photo"
                  :src="todayLastClock(props.key).photo"
                  class="center center-cropped-photo"
                />
                <img
                  v-else
                  :src="col.value"
                  class="center center-cropped-photo"
                />
              </template>
              <template v-else-if="col.value">
                <img
                  :src="col.value"
                  class="center center-cropped-photo"
                />
              </template>
              <template v-else>
                <img
                  src="/statics/no-avatar.png"
                  class="center center-cropped-photo"
                />
              </template>
            </template>
            <!-- map -->
            <template v-else-if="col.name === 'mapImage'">
              <template v-if="todayLastClock(props.key)">
                <img
                  v-if="todayLastClock(props.key).mapImage"
                  :src="todayLastClock(props.key).mapImage"
                  class="center center-cropped-map"
                />
              </template>
            </template>
            <!-- status -->
            <template v-else-if="col.name === 'status'">
              <q-btn
                v-if="todayInTimeUser(props.key)"
                class="q-mr-sm"
                color="primary"
                icon="access_time"
                :label="todayInTimeUser(props.key)"
              />
              <br/><br/>
              <q-btn
                v-if="todayOutTimeUser(props.key)"
                class="q-mr-sm"
                color="deep-orange"
                icon="av_timer"
                :label="todayOutTimeUser(props.key)"
              />
              <q-btn
                v-if="todayLeaveUser(props.key)"
                class="q-mr-sm"
                color="green"
                icon="timer_off"
                :label="todayLeaveUser(props.key)"
              />
              <q-btn
                v-if="isHoliday(selectedDate)"
                class="q-mr-sm"
                color="red"
                icon="event"
                :label="findHolidayName(selectedDate)"
              />
            </template>
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
        </q-tr>
      </q-table>
    </div>
    <!-- ///////// -->
    <!-- map image -->
    <!-- ///////// -->
    <q-modal v-model="formModal" maximized :content-css="{padding: '20px'}">
      <div class="row justify-center" style="padding-bottom: 25px;">
        <q-btn
          @click="formModal=false"
          round icon="close"
        />
      </div>
      <div class="row justify-center gutter-lg">
        <!-- info -->
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12">
          <div class="q-headline">{{ $t('Clock info') }}</div>
          <template v-if="selected.length">
            <ul>
              <li>{{ selected[0].firstName }} {{ selected[0].lastName }}</li>
              <li>{{ _.find(departmentOptions, {'value': selected[0].department}).label }}</li>
            </ul>
            <img
              :src="selected[0].photo"
              class="center center-cropped-photo"
            />
          </template>
        </div>
        <!-- image -->
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12">
          <template v-if="selected.length">
            <div class="row justify-start" style="padding: 10px;" v-for="clock in todayClockTimeUser(selected[0]['.key'])" v-bind:key="clock.id">
              <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <q-btn v-if="clock.clockAction==='in'"
                  icon="access_time"
                  color="primary"
                  :label="FormatDate(clock.timestamp, 'YYYY-MM-DD HH:mm')"
                >
                </q-btn>
                <q-btn v-else-if="clock.clockAction==='out'"
                  icon="av_timer"
                  color="orange"
                  :label="FormatDate(clock.timestamp, 'YYYY-MM-DD HH:mm')"
                >
                </q-btn>
                <q-btn v-else
                  icon="person_pin_circle"
                  color="brown"
                  :label="FormatDate(clock.timestamp, 'YYYY-MM-DD HH:mm')"
                >
                </q-btn>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                <img
                  :src="clock.mapImage"
                  class="center center-cropped-photo"
                  style="width: 300px"
                />
              </div>
              <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <q-editor v-model="clock.note" :disable="clock.authUser != userId"/>
                <q-btn
                  v-if="clock.authUser === userId"
                  icon="save"
                  @click="saveNote(clock.id, clock.note)"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </q-modal>
  </div>
</template>
<script>
// import
import { date } from 'quasar'
import { mapGetters } from 'vuex'
import userInfo from 'src/components/shared/userInfo'
import positionOptions from 'src/components/options/positionOptions'
import departmentOptions from 'src/components/options/departmentOptions'
import absenceTypeOptions from 'src/components/options/absenceTypeOptions'
import formatDate from 'src/components/shared/formatDate'
// export
export default {
  name: 'dashboard',
  // mixins
  mixins: [
    userInfo,
    positionOptions,
    absenceTypeOptions,
    departmentOptions,
    formatDate
  ],
  // data
  data () {
    return {
      userInfo: {},
      holidays: [],
      holidaysName: [],
      todayTimeAttendanceList: [],
      todayLeaveRequestList: [],
      WRKH: 8,
      // datatable
      collectionSize: 0,
      pagination: {
        sortBy: 'firstName',
        descending: false,
        rowsPerPage: 50
      },
      columns: [
        { name: 'photo', label: this.$t('Photo'), field: 'photo', sortable: false, align: 'center' },
        { name: 'mapImage', label: this.$t('Map'), field: 'mapImage', sortable: false, align: 'left' },
        { name: 'firstName', label: this.$t('First name'), field: 'firstName', sortable: true, align: 'left' },
        { name: 'lastName', label: this.$t('Last name'), field: 'lastName', sortable: true, align: 'left' },
        { name: 'status', label: this.$t('Status'), field: 'status', sortable: false, align: 'left' }
      ],
      visibleColumns: ['photo', 'mapImage', 'firstName', 'lastName', 'status'],
      selected: [],
      filter: '',
      loading: true,
      formModal: false,
      selectedDate: new Date()
    }
  },
  // firestore
  firestore () {
    return {
      authUser: this.$database.collection('authUser')
        .where('active', '==', true)
    }
  },
  // method
  methods: {
    // getFullTimeWorkHoursPerWrokDay
    get_WRKH () {
      return new Promise(resolve => {
        let vm = this
        let result = 8
        // get initialSetup
        vm.$database.collection('initialSetup')
          .where('code', '==', '_WRKH')
          .limit(1)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              result = doc.data().value
            })
            return resolve(result)
          })
      })
    },
    // getTodayTimeAttendanceList
    getTodayTimeAttendanceList () {
      return new Promise(resolve => {
        let vm = this
        // get timeAttendance
        vm.$database.collection('timeAttendance')
          .where('timestamp', '>=', vm.todayStart)
          .where('timestamp', '<=', vm.todayEnd)
          .get()
          .then(function (docs) {
            let result = []
            docs.forEach(function (doc) {
              result.push({
                id: doc.id,
                authUser: doc.data().authUser,
                photo: doc.data().photo,
                mapImage: doc.data().mapImage,
                clockAction: doc.data().clockAction,
                timestring: date.formatDate(doc.data().timestamp, 'YYYYMMDDHHmm'),
                timestamp: doc.data().timestamp,
                platform: doc.data().platform,
                note: doc.data().note
              })
            })
            return resolve(result)
          })
      })
    },
    findHolidayName (requestDate) {
      let result = ''
      let vm = this
      let numDate = parseInt(date.formatDate(requestDate, 'DDD'))
      result = (vm._.find(vm.holidaysName, {'date': numDate}) ? vm._.find(vm.holidaysName, {'date': numDate}).holiday : 'Holiday')
      return result
    },
    getPublicHolidays () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        let startYear = parseInt(date.formatDate(vm.selectedDate, 'YYYY'))
        let endYear = parseInt(date.formatDate(vm.selectedDate, 'YYYY'))
        vm.$database.collection('publicHolidays')
          .where('year', '>=', startYear)
          .where('year', '<=', endYear)
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push(parseInt(date.formatDate(doc.data().date, 'DDD')))
            })
            return resolve(result)
          })
      })
    },
    getPublicHolidaysName () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        let startYear = parseInt(date.formatDate(vm.selectedDate, 'YYYY'))
        let endYear = parseInt(date.formatDate(vm.selectedDate, 'YYYY'))
        vm.$database.collection('publicHolidays')
          .where('year', '>=', startYear)
          .where('year', '<=', endYear)
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                date: parseInt(date.formatDate(doc.data().date, 'DDD')),
                holiday: doc.data().holiday
              })
            })
            return resolve(result)
          })
      })
    },
    // getTodayLeaveRequestList
    getTodayLeaveRequestList () {
      return new Promise(resolve => {
        let vm = this
        // get leaveRequest
        vm.$database.collection('leaveRequest')
          .where('datesRequestedFrom', '<=', vm.todayStart)
          .where('yearOfPosting', '==', parseInt(date.formatDate(Date.now(), 'YYYY')))
          .get()
          .then(docs => {
            let result = []
            docs.forEach(doc => {
              if (doc.data().requestDate.to >= vm.todayStart) {
                result.push({
                  id: doc.id,
                  authUser: doc.data().authUser,
                  absenceType: doc.data().absenceType
                })
              }
            })
            return resolve(result)
          })
      })
    },
    // clockInOut
    clockInOut () {
      this.$router.push('/my-account/time-clock')
    },
    // loadingStatus
    loadingStatus () {
      let vm = this
      vm.$firestore.authUser.get().then(snapshot => {
        vm.collectionSize = snapshot.size
        vm.loading = false
      })
    },
    // todayClockTimeUser
    todayClockTimeUser (userId) {
      let vm = this
      let result = ''
      let clockInData = vm._.filter(vm.todayTimeAttendanceList, { 'authUser': userId })
      result = vm._.orderBy(clockInData, ['timestamp'], ['asc'])
      return result
    },
    // todayInTimeUser
    todayInTimeUser (userId) {
      let vm = this
      let result = ''
      let clockInData = vm._.filter(vm.todayTimeAttendanceList, { 'authUser': userId, 'clockAction': 'in' })
      let clockIn = vm._.orderBy(clockInData, ['timestamp'], ['asc'])
      if (clockIn.length) {
        result = `${date.formatDate(clockIn[0].timestamp, 'HH:mm:ss')}`
      }
      return result
    },
    // todayOutTimeUser
    todayOutTimeUser (userId) {
      let vm = this
      let result = ''
      let clockOutData = vm._.filter(vm.todayTimeAttendanceList, { 'authUser': userId, 'clockAction': 'out' })
      let clockOut = vm._.orderBy(clockOutData, ['timestamp'], ['desc'])
      if (clockOut.length) {
        result = `${date.formatDate(clockOut[0].timestamp, 'HH:mm:ss')}`
      }
      return result
    },
    // todayOutTimeUser
    todayLeaveUser (userId) {
      let vm = this
      let result = ''
      let leaveData = vm._.filter(vm.todayLeaveRequestList, { 'authUser': userId })
      if (leaveData.length) {
        result = `${vm._.find(vm.absenceTypeOptions, {'value': leaveData[0].absenceType}) ? vm._.find(vm.absenceTypeOptions, {'value': leaveData[0].absenceType}).label : 'Leave'}`
      }
      return result
    },
    // todayLastInTimeUser
    todayLastInTimeUser (userId) {
      let vm = this
      let result = ''
      let clockInData = vm._.filter(vm.todayTimeAttendanceList, { 'authUser': userId, 'clockAction': 'in' })
      let clockIn = vm._.orderBy(clockInData, ['timestamp'], ['desc'])
      if (clockIn.length) {
        result = clockIn[0]
      }
      return result
    },
    // todayLastClock
    todayLastClock (userId) {
      let vm = this
      let result = ''
      let clockInData = vm._.filter(vm.todayTimeAttendanceList, { 'authUser': userId })
      let clockIn = vm._.orderBy(clockInData, ['timestamp'], ['desc'])
      if (clockIn.length) {
        result = clockIn[0]
      }
      return result
    },
    // rowClick
    rowClick (row) {
      this.formModal = true
      this.selected = [row]
    },
    isHoliday (requestDate) {
      if (requestDate) {
        let numDate = parseInt(date.formatDate(requestDate, 'DDD'))
        let vm = this
        let result = false
        if (!isNaN(numDate)) {
          if (vm._.includes(vm.holidays, numDate)) {
            result = true
          } else {
          }
        }
        return result
      }
    },
    saveNote (id, note) {
      let vm = this
      vm.$database.collection('timeAttendance').doc(id)
        .update({
          note: note
        }).then(function () {
          // notify
          vm.$q.notify({
            message: vm.$t('Form submitted successfully'),
            type: 'positive',
            icon: 'info'
          })
        }).catch(function (error) {
          vm.$q.notify(vm.$t('Error writing document'))
          console.error('Error writing document: ', error)
        })
    }
  },
  // computed
  computed: {
    ...mapGetters([
      'applicationName',
      'userId',
      'userAccount'
    ]),
    userName () {
      let result = ''
      if (this.userInfo) {
        result = `${this.userInfo.firstName} ${this.userInfo.lastName}`
      }
      return result
    },
    position () {
      let result = ''
      if (this.userInfo) {
        let found = this._.find(this.positionOptions, {'value': this.userInfo.position})
        if (found) {
          result = found.data.code
        }
      }
      return result
    },
    userImage () {
      let result = '/statics/no-avatar.png'
      if (this.userInfo) {
        if (this.userInfo.photo) {
          result = this.userInfo.photo
        }
      }
      return result
    },
    thisYear () {
      return parseInt(date.formatDate(new Date(this.selectedDate), 'YYYY'))
    },
    thisMonth () {
      return parseInt(date.formatDate(new Date(this.selectedDate), 'M'))
    },
    today () {
      return parseInt(date.formatDate(new Date(this.selectedDate), 'D'))
    },
    todayStart () {
      return date.buildDate({year: this.thisYear, month: this.thisMonth, date: this.today, hours: 0, minutes: 0, seconds: 0})
    },
    todayEnd () {
      return date.buildDate({ year: this.thisYear, month: this.thisMonth, date: this.today, hours: 23, minutes: 59, seconds: 59 })
    },
    todayClockIn () {
      let result = []
      let clockIn = this._.filter(this.todayTimeAttendanceList, { 'authUser': this.userId, 'clockAction': 'in' })
      result = this._.orderBy(clockIn, ['timestamp'], ['asc'])
      return result
    },
    countIn () {
      return this.todayClockIn.length
    },
    todayInTime () {
      let result = ''
      if (this.todayClockIn.length) {
        result = `${date.formatDate(this.todayClockIn[0].timestamp, 'HH:mm:ss')}`
      }
      return result
    },
    todayClockOut () {
      let result = []
      let clockOut = this._.filter(this.todayTimeAttendanceList, { 'authUser': this.userId, 'clockAction': 'out' })
      result = this._.orderBy(clockOut, ['timestamp'], ['desc'])
      return result
    },
    countOut () {
      return this.todayClockOut.length
    },
    todayOutTime () {
      let result = ''
      if (this.todayClockOut.length) {
        result = `${date.formatDate(this.todayClockOut[0].timestamp, 'HH:mm:ss')}`
      }
      return result
    },
    clockState () {
      let result = false
      if (this.countIn > this.countOut) {
        result = true
      } else if (this.countOut) {
        result = false
      } else {
        result = false
      }
      return result
    }
  },
  created: async function () {
    let vm = this
    vm.$q.loading.show()
    vm.holidays = await vm.getPublicHolidays()
    vm.holidaysName = await vm.getPublicHolidaysName()
    vm.userInfo = await vm.getUserInfo(vm.userId)
    vm.todayTimeAttendanceList = await vm.getTodayTimeAttendanceList()
    this.todayLeaveRequestList = await this.getTodayLeaveRequestList()
    vm.WRKH = await vm.get_WRKH()
    vm.$q.loading.hide()
    vm.loadingStatus()
  },
  watch: {
    async selectedDate () {
      this.todayTimeAttendanceList = await this.getTodayTimeAttendanceList()
      this.todayLeaveRequestList = await this.getTodayLeaveRequestList()
      this.holidays = await this.getPublicHolidays()
      this.holidaysName = await this.getPublicHolidaysName()
    }
  }
}
</script>

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.center-cropped-photo {
  width: 180px;
  height: 240px;
  background-position: center center;
  background-repeat: no-repeat;
}
.center-cropped-map {
  width: 320px;
  height: 240px;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
