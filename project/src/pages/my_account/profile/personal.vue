<template>
  <q-page>
    <q-card>
      <q-card-main>
        <!-- field id -->
        <q-field
          :label="$t('ID')"
          :label-width="labelWidth"
        >
          <q-input v-model="inputForm.id" disable />
        </q-field>
        <!-- field email -->
        <q-field
          :label="$t('Email')"
          :label-width="labelWidth"
        >
          <q-input v-model="inputForm.email" disable />
        </q-field>
        <!-- field active -->
        <q-field
          :label="$t('Active')"
          :label-width="labelWidth"
        >
          <q-toggle
            v-model="inputForm.active"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
            checked-icon="sentiment very satisfied"
            unchecked-icon="sentiment very dissatisfied"
          />
        </q-field>
        <!-- field select camera -->
        <br/><br/>
        <!-- photo info -->
        <q-field
          label=" "
          :label-width="labelWidth"
        >
        <blockquote>
          <p   class="text-weight-bold">{{ $t('You can either take a selfie or upload a picture') }}</p>
          <div>{{ $t('Selfie') }}</div>
          <small>{{ $t('Select the camera') }}</small>
          <small>{{ $t('Press "Take a picture" button') }}</small>
          <div>{{ $t('Upload') }}</div>
          <small>{{ $t('Press the Plus sign button(+)') }}</small>
          <small>{{ $t('Choose a picture (240 x 320)') }}</small>
          <small>{{ $t('Press the Cloud button to upload file') }}</small>
        </blockquote>
        </q-field>
        <!-- field select camera -->
        <q-field
          :label="$t('Select Camera')"
          :label-width="labelWidth"
        >
          <q-select
            v-model="camera"
            :options="cameraOptions"
          />
        </q-field>
        <!-- photo -->
        <br/><br/>
        <q-field
          :label="$t('Photo')"
          :label-width="labelWidth"
        >
          <!-- camera / photo -->
          <div v-show="cameraState===false" style="text-align:center">
            <template v-if="inputForm.photo">
              <img
                :src="inputForm.photo"
                width="320"
                height="240"
                class="shadow-0"
              >
            </template>
            <template v-else>
              <img class="responsive" src="~assets/no-avatar.png" alt="" />
            </template>
          </div>
          <div v-show="cameraState===true" style="text-align:center">
            <video id="video" autoplay muted playsInline width="320" height="240" class="shadow-0"></video>
            <canvas id="canvas" class="hidden"></canvas>
          </div>
          <!-- button -->
          <div style="text-align:center">
            <template v-if="cameraState===true">
              <q-btn
                color="primary"
                icon="photo_camera"
                :label="$t('Take a photo')"
                @click="takePicture"
              >
              </q-btn>
            </template>
            <template v-else>
              <q-btn
                color="brown"
                icon="photo_camera"
                :label="$t('Take a photo')"
                @click="cameraState=true"
              >
              </q-btn>
            </template>
          </div>
        </q-field>
        <!-- upload picture -->
        <q-field
          :label="$t('Upload picture')"
          :label-width="labelWidth"
        >
          <q-uploader
            url=""
            :url-factory="uploadPicture"
          />
        </q-field>

        <br/><br/>
        <!-- field title -->
        <q-field
          :label="$t('Title')"
          :label-width="labelWidth"
        >
          <q-input
            v-model="inputForm.title"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
          />
        </q-field>
        <!-- field firstName -->
        <q-field
          :label="$t('First name')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.firstName.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.firstName"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
            @blur="$v.inputForm.firstName.$touch()"
          />
        </q-field>
        <!-- field lastName -->
        <q-field
          :label="$t('Last name')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.lastName.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.lastName"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
            @blur="$v.inputForm.lastName.$touch()"
          />
        </q-field>
        <!-- Branch -->
        <q-field
          :label="$t('Branch')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.branch.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-select
            v-model="inputForm.branch"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            :options="branchOptions"
            @blur="$v.inputForm.branch.$touch()"
          />
        </q-field>
        <!-- Department -->
        <q-field
          :label="$t('Department')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.department.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-select
            v-model="inputForm.department"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            :options="departmentOptions"
            @blur="$v.inputForm.department.$touch()"
          />
        </q-field>
        <!-- Position -->
        <q-field
          :label="$t('Position')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.position.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-select
            v-model="inputForm.position"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            :options="positionOptions"
            @blur="$v.inputForm.position.$touch()"
          />
        </q-field>
        <!-- reportTo -->
          <q-field
            :label="$t('Report to')"
            :label-width="labelWidth"
            :error="$v.inputForm.reportTo.$error"
            :error-label="$t('Requires non-empty data')"
            >
            <q-select
              v-model="inputForm.reportTo"
              :options="authUserOptions"
              @blur="$v.inputForm.reportTo.$touch()"
            />
          </q-field>
        <!-- field idCard -->
        <q-field
          :label="$t('ID card')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.idCard.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.idCard"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
            @blur="$v.inputForm.idCard.$touch()"
          />
        </q-field>
        <!-- field gender -->
        <q-field
          :label="$t('Gender')"
          :label-width="labelWidth"
        >
          <q-option-group
            type="radio"
            color="secondary"
            v-model="inputForm.gender"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
            :options="[
              { label: this.$t('Male'), value: 'male' },
              { label: this.$t('Female'), value: 'female' },
              { label: this.$t('Other'), value: 'other' }
            ]"
          />
        </q-field>
        <!-- field language -->
        <q-field
          :label="$t('Language')"
          :label-width="labelWidth"
        >
          <q-option-group
            type="radio"
            color="primary"
            v-model="inputForm.language"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
            :options="[
              { label: this.$t('Thai'), value: 'th' },
              { label: this.$t('English'), value: 'en-us' }
            ]"
          />
        </q-field>
        <!-- field birthday -->
        <q-field
          :label="$t('Birthday')"
          :label-width="labelWidth"
        >
          <q-datetime v-model="inputForm.birthday"
          :disable="!hasPermission(['my-account--profile--personal--update'])" type="date" />
        </q-field>
        <!-- field mobilePhone -->
        <q-field
          :label="$t('Mobile phone')"
          :label-width="labelWidth"
        >
          <q-input
            v-model="inputForm.mobilePhone"
            :disable="!hasPermission(['my-account--profile--personal--update'])"
          />
        </q-field>
        <!-- field address -->
        <q-field
          :label="$t('Address')"
          :label-width="labelWidth"
        >
          <q-editor v-model="inputForm.address"
          :disable="!hasPermission(['my-account--profile--personal--update'])"/>
        </q-field>
        <!-- submit -->
        <div class="submit">
          <q-btn
            v-if="formAction==='update'"
            color="primary"
            icon="save"
            wait-for-ripple
            :disable="$v.inputForm.$invalid"
            :label="$t('Save')"
            @click="updateForm"
          />
        </div>
      </q-card-main>
    </q-card>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import authUserOptions from 'src/components/options/authUserWithMoreInfoOptions'
import branchOptions from 'src/components/options/branchOptions'
import departmentOptions from 'src/components/options/departmentOptions'
import positionOptions from 'src/components/options/positionOptions'
import publicVars from 'src/components/shared/publicVars'
import publicFunc from 'src/components/shared/publicFunc'
import hasPermission from 'src/components/shared/hasPermission'
require('webrtc-adapter')

export default {
  name: 'profile',
  // mixins
  mixins: [
    authUserOptions,
    branchOptions,
    departmentOptions,
    hasPermission,
    positionOptions,
    publicFunc,
    publicVars
  ],
  // data
  data () {
    return {
      // app variable
      formAction: null,
      subMenu: this.$t('Personal'),
      // datatable
      pagination: {
        sortBy: 'index',
        descending: false
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'email', label: this.$t('Email'), field: 'email', sortable: true, align: 'left' },
        { name: 'firstName', label: this.$t('First name'), field: 'firstName', sortable: true, align: 'left' },
        { name: 'lastName', label: this.$t('Last name'), field: 'lastName', sortable: true, align: 'left' },
        { name: 'idCard', label: this.$t('Last name'), field: 'idCard', sortable: true, align: 'left' },
        { name: 'status', label: this.$t('Status'), field: 'active', sortable: false, align: 'left' }
      ],
      visibleColumns: ['email', 'firstName', 'lastName', 'status'],
      selected: [],
      filter: '',
      // camera
      platform: this.$q.platform.is,
      width: this.$q.platform.is.mobile === true ? 240 : 320,
      height: this.$q.platform.is.mobile === true ? 320 : 240,
      camera: '',
      cameraState: false,
      cameraOptions: [],
      videoElement: '',
      canvas: '',
      // inputForm
      inputForm: {
        '.key': '',
        email: '',
        active: false,
        photo: '',
        title: '',
        firstName: '',
        lastName: '',
        idCard: '',
        gender: '',
        language: '',
        birthday: new Date(),
        mobilePhone: '',
        address: '',
        authGroup: [],
        branch: '',
        department: '',
        position: '',
        reportTo: ''
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      firstName: { required },
      lastName: { required },
      branch: { required },
      department: { required },
      position: { required },
      reportTo: { required },
      idCard: { required }
    }
  },
  // methods
  methods: {
    openUpdateFrom () {
      let vm = this
      vm.formAction = 'update'
      // open camera
      vm.start()
      // get data
      this.$q.loading.show()
      vm.$database.collection('authUser').doc(vm.$route.params.id)
        .get()
        .then(function (doc) {
          vm.$q.loading.hide()
          vm.inputForm = {
            id: doc.id,
            email: doc.data().email,
            active: doc.data().active,
            title: doc.data().title,
            firstName: doc.data().firstName,
            photo: doc.data().photo,
            lastName: doc.data().lastName,
            branch: doc.data().branch,
            department: doc.data().department,
            position: doc.data().position,
            reportTo: doc.data().reportTo,
            idCard: doc.data().idCard,
            gender: doc.data().gender,
            birthday: (doc.data().birthday || new Date()),
            mobilePhone: doc.data().mobilePhone,
            address: (doc.data().address || ''),
            language: doc.data().language,
            authGroup: doc.data().authGroup
          }
        })
    },
    // uploadPicture
    uploadPicture (file) {
      let vm = this
      let folder = `profiles/${vm.$route.params.id}/`
      let fileName = file.name
      vm.$storage.ref().child(`${folder}/${fileName}`).put(file)
        .then(function (snapshot) {
          // notify
          vm.$q.notify({
            message: `${vm.$t('Uploaded a photo file!')}`,
            type: 'info',
            icon: 'info'
          })
          snapshot.ref.getDownloadURL().then(function (downloadURL) {
            vm.inputForm.photo = downloadURL
            vm.$database.collection('authUser').doc(vm.$route.params.id).update({
              photo: downloadURL
            })
          })
        })
    },
    updateForm () {
      let vm = this
      // set record
      vm.$database.collection('authUser').doc(vm.$route.params.id).update({
        firstName: (vm.inputForm.firstName || ''),
        lastName: (vm.inputForm.lastName || ''),
        branch: (vm.inputForm.branch || ''),
        department: (vm.inputForm.department || ''),
        position: (vm.inputForm.position || ''),
        reportTo: (vm.inputForm.reportTo || ''),
        language: (vm.inputForm.language || ''),
        mobilePhone: (vm.inputForm.mobilePhone || ''),
        address: (vm.inputForm.address || ''),
        gender: (vm.inputForm.gender || ''),
        idCard: (vm.inputForm.idCard || ''),
        birthday: (vm.inputForm.birthday || ''),
        title: (vm.inputForm.title || ''),
        modifiedBy: vm.userId,
        modifiedOn: new Date()
      }).then(function () {
        if (vm.$isBase64(vm.inputForm.photo)) {
          // save image to cloud storage
          let folder = `profiles/${vm.$route.params.id}/`
          let fileName = 'photo'
          let fileExt = '.png'
          vm.$storage.ref().child(`${folder}/${fileName}${fileExt}`)
            .putString(vm.inputForm.photo, 'data_url')
            .then(function (snapshotPhoto) {
              snapshotPhoto.ref.getDownloadURL()
                .then(function (downloadURL) {
                  // save photo
                  vm.$database.collection('authUser')
                    .doc(vm.$route.params.id)
                    .update({
                      photo: downloadURL
                    })
                })
            })
        }
        // notify
        vm.$q.notify({
          message: vm.$t('Form submitted successfully'),
          type: 'positive',
          icon: 'info'
        })
      // error
      }).catch(function (error) {
        vm.$q.notify(vm.$t('Error writing document'))
        console.error('Error writing document: ', error)
      })
    },
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
        .then(this.gotStream)
        .then(this.gotDevices)
        .catch(error => {
          console.log('navigator.getUserMedia error: ', error)
        })
    },
    // gotStream
    gotStream (stream) {
      this.videoElement = this.$el.querySelector('video')
      window.stream = stream
      this.videoElement.srcObject = stream
      // Refresh button list in case labels have become available
      return navigator.mediaDevices.enumerateDevices()
    },
    // gotDevices
    gotDevices (deviceInfos) {
      let vm = this
      let idx = 1
      vm.cameraOptions = []
      deviceInfos.forEach(function (device, index) {
        if (device.kind === 'videoinput') {
          vm.cameraOptions.push({
            label: `${vm.$t('camera')} ${idx} : ${device.label}`,
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
    // takepicture
    takePicture (e, done) {
      let vm = this
      vm.canvas = vm.$el.querySelector('canvas')
      let context = vm.canvas.getContext('2d')
      vm.canvas.width = vm.width
      vm.canvas.height = vm.height
      context.drawImage(vm.videoElement, 0, 0, vm.width, vm.height)
      let data = vm.canvas.toDataURL('image/png')
      vm.inputForm.photo = data
      // simulate a delay
      vm.cameraState = false
    }
  },
  // created
  created: function () {
    this.$emit('updateSubMenu', this.subMenu)
    this.openUpdateFrom()
    // Get available camera
    navigator.mediaDevices.enumerateDevices()
      .then(this.gotDevices)
      .catch(this.handleError)
  },
  // computed
  computed: {
    ...mapGetters([
      'userId',
      'userAccount'
    ])
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

<style>
</style>
