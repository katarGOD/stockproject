<template>
  <q-card>
    <q-card-title>
       <q-icon name="border_color"/> {{ $t('Sign up by mobile number') }}
      <span slot="right">{{ locale }}</span>
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <!-- ////////////// -->
      <!-- step 1 get OTP -->
      <!-- ////////////// -->
      <q-stepper
        ref="stepper"
        vertical
        no-header-navigation
        alternative-labels
        v-model="currentStep"
        class="shadow-0"
      >
        <!-- step 1 get OTP -->
        <q-step default name="getOtp" :title="$t('Get OTP')">
          <!-- firstName -->
          <q-field
            :error="$v.firstName.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              :float-label="$t('First name')+' *'"
              v-model.trim="firstName"
              @keyup="$v.firstName.$touch"
              :autofocus="true"
            />
          </q-field>
          <!-- lastName -->
          <q-field
            :error="$v.lastName.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              :float-label="$t('Last name')+' *'"
              v-model.trim="lastName"
              @keyup="$v.lastName.$touch"
            />
          </q-field>
          <!-- phoneNumber -->
          <q-field
            icon="phonelink_ring"
            :error="$v.phoneNumber.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              :float-label="$t('Mobile number')+' *'"
              v-model.trim="phoneNumber"
              @keyup="$v.phoneNumber.$touch"
            />
          </q-field>
          {{ $t('Example +66123456789 where +66 is country code for Thailand and 123456789 is your phone number (without "0" prefixed)') }}
          <!-- Navigation -->
          <q-stepper-navigation>
            <q-btn
              class="q-mr-sm"
              icon="arrow_back"
              color="orange"
              :label="$t('Back')"
              @click="$router.push('/login')"
            />
            <q-btn
              class="q-mr-sm"
              color="primary"
              :disable="!getOtpFormValidate"
              :label="$t('Get OTP')"
              @click="sendOtp($refs)"
            />
          </q-stepper-navigation>
        </q-step>
        <!-- step2 verify -->
        <q-step name="verify" :title="$t('Verify')">
          <!-- otp -->
          <q-field
            icon="announcement"
            :error="$v.otp.$error"
            :error-label="`${!$v.otp.required ? $t('Requires non-empty data') : ''} ${!$v.otp.minLength ? $t('Form validation error') : ''}`"
          >
            <q-input
              :float-label="$t('OTP')"
              v-model.trim="otp"
              @keyup="$v.otp.$touch"
              :autofocus="true"
            />
          </q-field>
          <!-- Navigation -->
          <q-stepper-navigation>
            <q-btn
              class="q-mr-sm"
              color="orange"
              icon="arrow_back"
              :label="$t('Back')"
              @click="$refs.stepper.previous()"
            />
            <q-btn
              class="q-mr-sm"
              color="primary"
              :disable="$v.otp.$error"
              :label="$t('Verify OTP')"
              @click="verifyOtp($refs);"
            />
          </q-stepper-navigation>
        </q-step>
        <!-- step2 password -->
        <q-step name="password" :title="$t('Password')">
        <!-- password -->
        <q-field
          icon="fingerprint"
          :error="$v.password.$error"
          :error-label="$t('Password must be at least 6 characters long')"
        >
          <q-input
            :float-label="$t('Password')"
            type="password"
            v-model.trim="password"
            @keyup="$v.password.$touch"
          />
        </q-field>
        <!-- confirmPassword -->
        <q-field
          icon="done_all"
          :error="$v.confirmPassword.$error"
          :error-label="$t('Password does not match the confirm password')"
        >
          <q-input
            :float-label="$t('Confirm password')"
            type="password"
            v-model.trim="confirmPassword"
            @keyup="$v.confirmPassword.$touch"
          />
        </q-field>
        <!-- Navigation -->
          <q-stepper-navigation>
            <q-btn
              :label="$t('Back')"
              color="orange"
              icon="arrow_back"
              class="q-mr-sm"
              @click="$refs.stepper.previous()"
            />
            <q-btn
              :disable="$v.$invalid"
              class="q-mr-sm"
              color="primary"
              @click="signup"
              :label="$t('Submit')"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card-main>
    <div id="recaptcha-container"></div>
  </q-card>
</template>

<script>
import firebase from 'firebase'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import langSwitch from 'src/components/shared/langSwitch'

export default {
  name: 'phoneSignup',
  mixins: [
    langSwitch
  ],
  data () {
    return {
      // steper
      currentStep: 'getOtp',
      // form
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '+66',
      otp: '',
      appVerifier: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    firstName: { required },
    lastName: { required },
    phoneNumber: { required },
    otp: { required, minLength: minLength(6) },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs('password') }
  },
  methods: {
    ...mapActions([
      'updatePhoneUser'
    ]),
    ...mapMutations([
      'setAllDrawerClose',
      'setLeftDrawerState'
    ]),
    checkKey (e) {
      // code: "Enter"
      if (e.charCode === 13) {
        this.submit()
      }
    },
    initReCaptcha () {
      setTimeout(() => {
        // let vm = this
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': function (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          'expired-callback': function () {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        })
        //
        this.appVerifier = window.recaptchaVerifier
      }, 1000)
    },
    sendOtp ($refs) {
      let vm = this
      let phoneNumber = vm.phoneNumber
      let appVerifier = vm.appVerifier
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult
          //
          vm.$q.notify({
            message: `${vm.$t('SMS was sent to')} ${vm.phoneNumber}`,
            type: 'positive',
            icon: 'info'
          })
          $refs.stepper.next()
        }).catch(function (error) {
          // Error Error! SMS not delivered
          // ...
          console.log(error)
          vm.$q.notify({
            message: vm.$t('Error! SMS not delivered'),
            type: 'negative',
            icon: 'error_outline'
          })
        })
    },
    //
    verifyOtp ($refs) {
      let vm = this
      let code = vm.otp
      //
      window.confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        // prepare variable

        // email
        vm.email = firebase.auth().currentUser.phoneNumber + '@email.com'
        // password : defalut is phone no
        if (vm.$v.password.$invalid) {
          vm.password = vm.phoneNumber
          vm.confirmPassword = vm.phoneNumber
        }
        if (!vm.$v.$invalid) {
          let newUser = firebase.auth().currentUser
          newUser.updateEmail(vm.email)
            .then(function () {
              newUser.updatePassword(vm.password)
                .then(function () {
                  vm.updatePhoneUser({
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    email: vm.email,
                    phoneNumber: vm.phoneNumber,
                    inviter: vm.inviter,
                    active: true
                  }).then(function () {
                    console.log('email user added')
                  })
                }).catch(function (error) {
                  vm.$q.notify({
                    message: vm.$t(error.message),
                    type: 'negative',
                    icon: 'error_outline'
                  })
                })
            }).catch(function (error) {
              console.log(error)
              vm.$q.notify({
                message: vm.$t(error.message),
                type: 'negative',
                icon: 'error_outline'
              })
            })
        } else {
          console.log(vm.$v)
          vm.$q.notify({
            message: vm.$t('Validation error'),
            type: 'negative',
            icon: 'error_outline'
          })
        }
        // ...
        // route to set password !
        $refs.stepper.next()
      }).catch(function (error) {
        console.log(error)
        vm.$q.notify({
          message: `${vm.$t(error)}`,
          type: 'negative',
          icon: 'error_outline'
        })
        // User couldn't sign in (bad verification code?)
        // ...
      })
    },
    signout () {
      firebase.auth().signOut()
      this.$router.push({path: '/'})
      window.location.reload()
    },
    signup () {
      let vm = this
      if (!vm.$v.$invalid) {
        firebase.auth().currentUser.updatePassword(vm.password)
          .then(() => {
            console.log('updated password')
            vm.$router.push('/auth/welcome')
          })
          .catch(error => {
            console.log(error.message)
            vm.$q.notify({
              message: vm.$t(error),
              type: 'negative',
              icon: 'error_outline'
            })
          })
      } else {
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'nagetive',
          icon: 'error_outline'
        })
      }
    }
  },
  created () {
    this.initReCaptcha()
    this.setAllDrawerClose()
    this.setLeftDrawerState(true)
    window.addEventListener('keypress', this.checkKey)
  },
  computed: {
    ...mapGetters([
      'leftDrawerState',
      'userId'
    ]),
    getOtpFormValidate () {
      let vm = this
      let valid = true
      if (vm.$v.firstName.$invalid) {
        valid = false
      }
      if (vm.$v.lastName.$invalid) {
        valid = false
      }
      if (vm.$v.phoneNumber.$invalid) {
        valid = false
      }
      return valid
    },
    emailSignup () {
      let vm = this
      let result = ''
      if (vm._.isUndefined(vm.$route.query.inviter)) {
        result = '/auth/signup/email'
      } else {
        result = `/auth/signup/email?inviter=${vm.$route.query.inviter}`
      }
      return result
    },
    inviter () {
      let vm = this
      if (vm._.isUndefined(vm.$route.query.inviter)) {
        return ''
      } else {
        return vm.$route.query.inviter
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('keypress', this.checkKey)
  }
}
</script>
