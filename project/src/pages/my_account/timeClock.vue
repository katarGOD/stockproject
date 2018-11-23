<template>
  <q-page padding style="text-align: center">
    {{ $t('Welcome') }} {{ inputForm.firstName }}
    <!-- ///////// -->
    <!-- inputForm -->
    <!-- ///////// -->
    <div class="row">
      <div class="col-lg-4 offset-lg-4">
        <!-- pageTitle -->
        <div class="p10 q-headline">
          {{ $t('Clock') }}
        </div>
        <div>{{ $t('Select camera') }}</div>
        <!-- cameraOptions -->
        <div class="p10">
          <q-select
            v-model="camera"
            :options="cameraOptions"
          />
        </div>

        <!-- camera / photo -->
        <div
          class="p10"
          v-show="cameraState===false"
        >
          <template v-if="inputForm.photo">
            <img :src="inputForm.photo" width="320" height="240" class="shadow-5">
          </template>
          <template v-else>
            <img class="responsive" src="~assets/no-avatar.png" alt="" />
          </template>
        </div>
        <div
          class="p10"
          v-show="cameraState===true"
        >
          <video id="video" autoplay muted playsInline width="320" height="240" class="shadow-5"></video>
          <canvas id="canvas" class="hidden"></canvas>
        </div>

        <!-- state -->
        <div
          class="p10"
        >
          <q-chip class="q-mr-sm" detail icon="access_time">{{ countIn }}</q-chip>
          <q-chip class="q-mr-sm" detail icon="person_pin_circle">{{ countLog }}</q-chip>
          <q-chip class="q-mr-sm" detail icon="av_timer">{{ countOut }}</q-chip>
          <q-chip class="q-mr-sm" detail icon="store">{{ attendanceStatus }}</q-chip>
          <q-chip class="q-mr-sm" detail icon="autorenew">{{ workHours }}</q-chip>
        </div>

        <!-- button -->
        <div
          class="p10"
        >
          <template v-if="inputForm.latitude">
            <q-btn
              v-if="attendanceStatus==='out'"
              class="q-mr-sm"
              color="primary"
              loader
              icon="access_time"
              :label="$t('in')"
              @click="clickClockIn()"
            />
            <q-btn
              v-if="attendanceStatus==='in'"
              class="q-mr-sm"
              color="brown"
              loader
              icon="person_pin_circle"
              :label="$t('log')"
              @click="clickClockLog()"
            />
            <q-btn
              v-if="attendanceStatus==='in'"
              class="q-mr-sm"
              color="deep-orange"
              loader
              icon="av_timer"
              :label="$t('out')"
              @click="clickClockOut()"
            />
          </template>
          <template v-else>
            <span slot="loading">
              <q-spinner class="on-left" />
              {{ $t("GPS") }} ...
            </span>
          </template>
        </div>
        <br><br>
        <!-- field email -->
        <q-field>
          <q-input
            v-model="inputForm.email"
            align="center"
            disable
          />
        </q-field>
        <div class="row">
          <!-- field firstName -->
          <div class="col">
            <q-field>
              <q-input
                v-model="inputForm.firstName"
                :float-label="$t('First name')"
                align="center"
                disable
              />
            </q-field>
          </div>
          <!-- field lastName -->
          <div class="col">
            <q-field>
              <q-input
                v-model="inputForm.lastName"
                :float-label="$t('Last name')"
                align="center"
                disable
              />
            </q-field>
          </div>
        </div>
        <!-- field timestamp -->
        <q-field>
          <q-input
            v-model="inputForm.timestamp"
            align="center"
            disable
          />
        </q-field>
        <div class="row">
          <!-- field ip address -->
          <div class="col">
            <q-field>
              <q-input
                v-model="inputForm.ipAddress"
                :float-label="$t('IP')"
                align="center"
                disable
              />
            </q-field>
          </div>
          <!-- field latitude -->
          <div class="col">
            <q-field>
              <q-input
                v-model="inputForm.latitude"
                :float-label="$t('Latitude')"
                align="center"
                disable
              />
            </q-field>
          </div>
          <!-- field longitude -->
          <div class="col">
            <q-field>
              <q-input
                v-model="inputForm.longitude"
                :float-label="$t('Longitude')"
                align="center"
                disable
              />
            </q-field>
          </div>
        </div>
      <!-- field reference -->
      <q-field
      >
      <q-input
        v-model="inputForm.taskReferenceTitle"
        :float-label="$t('Reference')"
        align="center"
        upper-case
      >
        <q-autocomplete
          @search="searchTasks"
          :debounce="1000"
          @selected="selectedTask"
        />
      </q-input>
    </q-field>
        <!-- field mapImage -->
        <div style="text-align: center;">
          <div style="padding: 20px;">{{ $t('Current location') }}</div>
          <img v-if="inputForm.mapImage" :src="inputForm.mapImage"/>
        </div>
        <!-- field note -->
        <div style="text-align: center;">
          <div style="padding: 20px;">{{ $t('Note') }}</div>
          <q-editor
            v-model="inputForm.note"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { required, ipAddress } from 'vuelidate/lib/validators'
// import { date, Loading } from 'quasar'
import { date, filter } from 'quasar'
// import router from 'src/router'
import publicVars from 'src/components/shared/publicVars'
import publicFunc from 'src/components/shared/publicFunc'
import userInfo from 'src/components/shared/userInfo'

require('webrtc-adapter')

export default {
  name: 'timeClock',
  // mixins
  mixins: [
    publicVars,
    publicFunc,
    userInfo
  ],
  // data
  data () {
    return {
      // app variable
      platform: this.$q.platform.is,
      width: this.$q.platform.is.mobile === true ? 240 : 320,
      height: this.$q.platform.is.mobile === true ? 320 : 240,
      // camera
      camera: null,
      cameraState: true,
      cameraOptions: [],
      videoElement: null,
      canvas: null,
      // attendance status
      userInfo: null,
      countIn: 0,
      countLog: 0,
      countOut: 0,
      attandanceList: [],
      attendanceStatus: null,
      clockPeriod: [],
      // google maps
      mapWidth: 320,
      mapHeight: 240,
      // inputForm
      inputForm: {
        authUser: null,
        email: null,
        firstName: null,
        lastName: null,
        photo: null,
        timestamp: null,
        dayOfYear: null,
        ipAddress: null,
        latitude: null,
        longitude: null,
        taskReferenceId: null,
        taskReferenceTitle: null,
        taskReferenceHelper: null,
        platform: null,
        mapImage: null,
        clockAction: null,
        note: '',
        notified: false
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      email: { required },
      photo: { required },
      timestamp: { required },
      mapImage: { required },
      ipAddress: { required, ipAddress },
      latitude: { required },
      longitude: { required },
      clockAction: { required },
      authUser: { required }
    }
  },
  // methods
  methods: {
    ...mapActions([
      'assignAuthState'
    ]),
    ...mapMutations([
      'setAllDrawerClose',
      'setLeftDrawerState'
    ]),
    // start
    start () {
      if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
          track.stop()
        })
      }
      let videoSource = this.camera
      let constraints = {
        video: {
          deviceId: videoSource ? {exact: videoSource} : undefined
        }
      }
      navigator.mediaDevices.getUserMedia(constraints)
        .then(this.getStream)
        .then(this.getDevices)
        .catch(error => {
          console.log('navigator.getUserMedia error: ', error)
        })
    },
    // getStream
    getStream (stream) {
      this.videoElement = this.$el.querySelector('video')
      window.stream = stream
      this.videoElement.srcObject = stream
      // Refresh button list in case labels have become available
      return navigator.mediaDevices.enumerateDevices()
    },
    // getDevices
    getDevices (deviceInfos) {
      let vm = this
      let idx = 1
      vm.cameraOptions = []
      deviceInfos.forEach(function (device, index) {
        if (device.kind === 'videoinput') {
          vm.cameraOptions.push({
            label: `${idx} : ${device.label}`,
            value: device.deviceId
          })
          idx++
        }
      })
    },
    // handleError
    handleError (error) {
      console.log(error)
    },
    // takePicture
    takePicture (e, done) {
      let vm = this
      vm.canvas = vm.$el.querySelector('canvas')
      let context = vm.canvas.getContext('2d')
      vm.canvas.width = vm.width
      vm.canvas.height = vm.height
      context.drawImage(vm.videoElement, 0, 0, vm.width, vm.height)
      let data = vm.canvas.toDataURL('image/png')
      vm.inputForm.photo = data
      vm.cameraState = false
    },
    // getGeoCoord
    getGeoCoords () {
      return new Promise(resolve => {
        let vm = this
        vm.$getLocation()
          .then(coordinates => {
            return resolve(coordinates)
          })
      })
    },
    // getGeolocation
    getGeolocation (coords) {
      return new Promise(resolve => {
        let vm = this
        let latlon = `${coords.lat},${coords.lng}`
        vm.$axios.get(`https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=16&size=${vm.mapWidth}x${vm.mapHeight}&markers=${latlon}&sensor=false&key=AIzaSyCbbpeKh34_lDpQWLCbqyApFNW3MSdJbtA`)
          .then(response => {
            vm.convertImgToBase64(
              // url
              response.config.url,
              // callback
              function (result) {
                return resolve(result)
              },
              // outputFormat
              'png'
            )
          }, function (error) {
            console.log(error)
            vm.$q.notify({
              message: `${vm.$t('error')} : ${error}`,
              type: 'warning',
              icon: 'warning'
            })
          })
      })
    },
    // method searchTasks
    searchTasks (contact, done) {
      let vm = this
      let tasks = []
      vm.inputForm.taskReferenceHelper = ''
      vm.$database.collection('tasks')
        .where('title', '>', `${vm.inputForm.taskReferenceTitle}`)
        .where('title', '<', `${vm.inputForm.taskReferenceTitle}Z`)
        .get()
        .then(function (docs) {
          if (docs.size) {
            docs.forEach(function (doc) {
              tasks.push({
                id: doc.id,
                label: doc.data().title,
                value: doc.data().title
              })
            })
          } else {
            vm.inputForm.taskReferenceTitleHelper = vm.$t('noRecordFound')
          }
          done(filter(vm.inputForm.taskReferenceTitle, {field: 'value', list: tasks}))
        })
    },
    // method selectedTask
    selectedTask (item) {
      let vm = this
      vm.inputForm.taskReferenceId = item.id
    },
    // getAttendanceStatus
    getAttendanceStatus () {
      let vm = this
      vm.attandanceList = []
      vm.countIn = 0
      vm.countOut = 0
      vm.countLog = 0
      vm.clockPeriod = []
      vm.$database.collection('timeAttendance')
        .where('dayOfYear', '==', vm.dayOfYear)
        .where('authUser', '==', vm.userId)
        .orderBy('timestamp', 'asc')
        .get()
        .then(function (docs) {
          docs.forEach(function (doc) {
            // append to attandanceList
            vm.attandanceList.push(doc.data())
            // keep clockstate
            if (doc.data().clockAction === 'in') {
              vm.countIn += 1
              vm.clockIn = doc.data().timestamp
            } else if (doc.data().clockAction === 'out') {
              vm.countOut += 1
              vm.clockPeriod.push([vm.clockIn, doc.data().timestamp])
              // clear clockIn
              vm.clockIn = ''
            } else if (doc.data().clockAction === 'log') {
              vm.countLog += 1
            }
          })
          // summary
          if (vm.clockIn) {
            vm.clockPeriod.push([vm.clockIn])
          }
          // check attendanceStatus
          if (vm.countIn > vm.countOut) {
            vm.attendanceStatus = 'in'
          } else {
            vm.attendanceStatus = 'out'
          }
        })
    },
    // getIpAddress
    getIpAddress () {
      return new Promise(resolve => {
        let vm = this
        vm.$axios.get(`https://api.ipify.org/`).then(ip => {
          return resolve(ip.data)
        })
      })
    },
    // updateCurrentTime
    updateCurrentTime () {
      let vm = this
      vm.currentTime = new Date()
      vm.inputForm.timestamp = new Date()
    },
    // formFullfillment
    async formFullfillment (clockAction = '') {
      let vm = this
      // setInterval => to get timestamp
      setInterval(() => vm.updateCurrentTime(), 1 * 1000)
      // getIpAddress
      vm.inputForm.ipAddress = await vm.getIpAddress()
      // getGeoCoord
      let coords = await vm.getGeoCoords()
      console.log(coords)
      vm.inputForm.latitude = coords.lat
      vm.inputForm.longitude = coords.lng
      // getGeolocation
      vm.inputForm.mapImage = await vm.getGeolocation(coords)
      // user info
      vm.inputForm.authUser = vm.userId
      vm.inputForm.email = vm.userAccount.email
      vm.inputForm.firstName = (vm.userInfo.firstNameEnglish ? vm.userInfo.firstNameEnglish : vm.userInfo.firstName)
      vm.inputForm.lastName = (vm.userInfo.lastNameEnglish ? vm.userInfo.lastNameEnglish : vm.userInfo.lastName)
      // dayOfYear
      vm.inputForm.dayOfYear = vm.dayOfYear
      // platform
      vm.inputForm.platform = vm.platform
      // clockAction
      vm.inputForm.clockAction = clockAction
    },
    // clockIn
    async clickClockIn () {
      console.log('clockin')
      let vm = this
      vm.takePicture()
      vm.formFullfillment('in')
      vm.cameraState = false
      await vm.simulateDelay(3000)
      vm.cameraState = true
      vm.addTimeClock(vm.inputForm)
    },
    // clockout
    async clickClockOut () {
      console.log('clockOut')
      let vm = this
      vm.takePicture()
      vm.formFullfillment('out')
      vm.cameraState = false
      await vm.simulateDelay(3000)
      vm.cameraState = true
      vm.addTimeClock(vm.inputForm)
    },
    // clockLog
    async clickClockLog () {
      console.log('clockLog')
      let vm = this
      vm.takePicture()
      vm.formFullfillment('log')
      vm.cameraState = false
      await vm.simulateDelay(3000)
      vm.cameraState = true
      vm.addTimeClock(vm.inputForm)
    },
    // addTimeClock
    addTimeClock () {
      let vm = this
      if (vm.$v.inputForm.$invalid) {
      // validate false
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'nagative',
          icon: 'error_outline'
        })
      } else {
        vm.$q.loading.show()
        vm.$database.collection('timeAttendance')
          .add({
            email: vm.inputForm.email,
            firstName: vm.inputForm.firstName,
            lastName: vm.inputForm.lastName,
            photo: vm.inputForm.photo,
            timestamp: vm.inputForm.timestamp,
            dayOfYear: vm.inputForm.dayOfYear,
            ipAddress: vm.inputForm.ipAddress,
            latitude: vm.inputForm.latitude,
            longitude: vm.inputForm.longitude,
            taskReferenceId: vm.inputForm.taskReferenceId,
            taskReferenceTitle: vm.inputForm.taskReferenceTitle,
            taskReferenceHelper: vm.inputForm.taskReferenceHelper,
            mapImage: vm.inputForm.mapImage,
            clockAction: vm.inputForm.clockAction,
            note: vm.inputForm.note,
            authUser: vm.inputForm.authUser,
            platform: vm.inputForm.platform,
            notified: false
          })
          .then(function (data) {
            vm.$q.notify({
              message: vm.$t('Form submitted successfully'),
              type: 'positive',
              icon: 'info'
            })
            // vars for notify
            let firstName = vm.inputForm.firstName
            let lastName = vm.inputForm.lastName
            let timestamp = vm.inputForm.timestamp
            let clockAction = vm.inputForm.clockAction
            let photo = ''
            let mapImage = ''
            let lineMessage = `Clock ${clockAction} : (${firstName} ${lastName}) - ${timestamp}`
            // clear clockstate and re-calc
            vm.getAttendanceStatus()
            // save image to cloud storage
            let folder = `TimeAttendance/${date.formatDate(vm.inputForm.timestamp, 'YYYYMMDD')}/${data.id}/`
            let fileExt = '.png'
            // 1 - save photo
            vm.$storage.ref().child(`${folder}/photo/photo${fileExt}`)
              .putString(vm.inputForm.photo, 'data_url')
              .then(function (snapshotPhoto) {
                snapshotPhoto.ref.getDownloadURL().then(function (downloadURL) {
                  vm.$database.collection('timeAttendance').doc(data.id).update({ photo: downloadURL })
                  photo = downloadURL
                  // 2 - map image
                  vm.$storage.ref().child(`${folder}/location/map${fileExt}`)
                    .putString(vm.inputForm.mapImage, 'data_url')
                    .then(function (snapshotMap) {
                      snapshotMap.ref.getDownloadURL().then(function (downloadURL) {
                        vm.$database.collection('timeAttendance').doc(data.id).update({mapImage: downloadURL})
                        mapImage = downloadURL
                        // 3 - line notify
                        vm.$database.collection('lineNotify').add({
                          // log
                          email: vm.inputForm.email,
                          firstName: vm.inputForm.firstName,
                          lastName: vm.inputForm.lastName,
                          timestamp: vm.inputForm.timestamp,
                          clockAction: vm.inputForm.clockAction,
                          authUser: vm.inputForm.authUser,
                          platform: vm.inputForm.platform,
                          // line notify
                          message: lineMessage,
                          image: {
                            fullsize: photo,
                            thumbnail: mapImage
                          },
                          notified: false
                        })
                        vm.$q.loading.hide()
                        vm.$router.push('/')
                      })
                    }, function (error) {
                      console.log(error)
                      vm.$database.collection('lineNotify').add({
                        // log
                        email: vm.inputForm.email,
                        firstName: vm.inputForm.firstName,
                        lastName: vm.inputForm.lastName,
                        timestamp: vm.inputForm.timestamp,
                        clockAction: vm.inputForm.clockAction,
                        authUser: vm.inputForm.authUser,
                        platform: vm.inputForm.platform,
                        // line notify
                        message: lineMessage,
                        image: {
                          fullsize: photo,
                          thumbnail: photo
                        }
                      })
                    })
                })
              }, function (error) {
                console.log(error)
                vm.$database.collection('lineNotify').add({
                  // log
                  email: vm.inputForm.email,
                  firstName: vm.inputForm.firstName,
                  lastName: vm.inputForm.lastName,
                  timestamp: vm.inputForm.timestamp,
                  clockAction: vm.inputForm.clockAction,
                  authUser: vm.inputForm.authUser,
                  platform: vm.inputForm.platform,
                  // line notify
                  message: lineMessage,
                  image: {}
                })
              })
          })
          .catch(function (error) {
            console.log(error)
            vm.$q.notify({
              message: `${vm.$t('error')} : ${error}`,
              type: 'warning',
              icon: 'warning'
            })
            vm.$q.loading.hide()
          })
      }
    }
  },
  // created
  created: async function () {
    let vm = this
    vm.setAllDrawerClose()
    vm.setLeftDrawerState(false)
    // get attendance status
    vm.getAttendanceStatus()
    // get available camera
    vm.start()
    navigator.mediaDevices.enumerateDevices()
      .then(vm.getDevices)
      .catch(vm.handleError)
    // formFullfillment
    let id = await vm.assignAuthState()
    vm.userInfo = await vm.getUserInfo(id)
    vm.formFullfillment()
  },
  // computed
  computed: {
    ...mapGetters([
      'userId',
      'userAccount',
      'leftDrawerState',
      'rightDrawerState'
    ]),
    dayOfYear () {
      return parseInt(date.formatDate(new Date(), 'DDD'))
    },
    // currentYear
    currentYear () {
      return date.formatDate(this.inputForm.timestamp, 'YYYY')
    },
    // workHours
    workHours () {
      let vm = this
      let result = 0
      // clocked
      if (vm.attandanceList.length > 0) {
        if (vm.clockPeriod.length) {
          vm._.forEach(vm.clockPeriod, function (value, key) {
            if (value.length === 2) {
              result += (date.getDateDiff(value[1], value[0], 'minutes') || 0)
            } else {
              result += (date.getDateDiff(vm.currentTime, value[0], 'minutes') || 0)
            }
          })
        }
      }
      let convertResult = `${((result - (result % 60)) / 60)}:${result % 60}`
      return convertResult
    }
  },
  // watch
  watch: {
    // camera
    camera () {
      this.start()
    }
  }
}
</script>

<style scoped>
.p10 {padding-top: 10px;}
</style>
