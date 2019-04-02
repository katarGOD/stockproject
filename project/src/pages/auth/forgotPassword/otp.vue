<template>
  <div>
    <q-card>
      <q-card-title>
        <q-icon name="account_circle"/> {{ $t('Forgot your password?') }}
      </q-card-title>

      <q-card-separator />
      <!-- ////////////////// -->
      <!-- stepper randomPage -->
      <!-- ////////////////// -->
      <q-stepper
        ref="stepper"
        vertical
        no-header-navigation
        alternative-labels
        v-model="currentStep"
      >
        <!-- step 1 get OTP -->
        <q-step default name="getOtp" :title="$t('Get OTP')">
          <!-- phoneNumber -->
          <q-field
            :error="$v.phoneNumber.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-input
              :float-label="$t('Phone number')"
              v-model.trim="phoneNumber"
              @keyup="$v.phoneNumber.$touch"
            />
          </q-field>
          <p>{{ $t('Enter your mobile number you registered with us. You will receive a message with One Time Password (OTP) to reset your password.') }}</p>
          <p>{{ $t('Example +66123456789 where +66 is country code for Thailand and 123456789 is your phone number (without "0" prefixed)') }}</p>
          <!-- Navigation -->
          <q-stepper-navigation>
                       <q-btn
              :label="$t('Back')"
              color="orange"
              icon="arrow_back"
              class="q-mr-sm"
              @click="$router.push('/login')"
            />
            <q-btn
              :label="$t('Get OTP')"
              :disable="!getOtpFormValidate"
              color="primary"
              @click="sendOtp($refs)"
              class="q-mr-sm"
            />
          </q-stepper-navigation>
        </q-step>
        <!-- step2 verify -->
        <q-step name="verify" :title="$t('Verify')">
            <!-- otp -->
          <q-field
            :error="$v.otp.$error"
            :error-label="`${!$v.otp.required ? $t('Requires non-empty data') : ''} ${!$v.otp.minLength ? $t('invalid') : ''}`"
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
              style="text-align: center;"
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
          :error="$v.password.$error"
          :error-label="$t('Password must be at least 6 characters long')"
        >
          <q-input
            :float-label="$t('Password')"
            type="password"
            v-model.trim="password"
            @keyup="$v.password.$touch"
            @keyup.13="changePassword"
          />
        </q-field>
        <!-- confirmPassword -->
        <q-field
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
              class="q-mr-sm"
              color="orange"
              icon="arrow_back"
              :label="$t('Back')"
              @click="$refs.stepper.previous()"
            />
            <q-btn
              class="q-mr-sm"
              color="primary"
              style="text-align: center;"
              :disable="$v.$invalid"
              :label="$t('Submit')"
              @click="changePassword"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from 'src/router'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import langSwitch from 'src/components/shared/langSwitch'

export default {
  name: 'changePassword',
  mixins: [
    langSwitch
  ],
  data () {
    return {
      // steper
      currentStep: 'getOtp',
      // form
      phoneNumber: '+66',
      otp: '',
      appVerifier: '',
      password: '',
      confirmPassword: '',
      currentUser: null
    }
  },
  validations: {
    phoneNumber: { required, minLength: minLength(9) },
    otp: { required, minLength: minLength(6) },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs('password') }
  },
  methods: {
    ...mapActions([
      'signUserOut'
    ]),
    ...mapMutations([
      'setLeftDrawerState'
    ]),
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
      let appVerifier = vm.appVerifier
      firebase.auth().signInWithPhoneNumber(`${vm.phoneNumber}`, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult)
          window.confirmationResult = confirmationResult
          //
          vm.$q.notify({
            message: vm.$t('Please Verify OTP!!'),
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
            type: 'nagetive',
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
        vm.currentUser = result.user
        // ...
        // route to set password !
        $refs.stepper.next()
      }).catch(function (error) {
        console.log(error)
        vm.$q.notify({
          message: `Error ! ${error}`,
          type: 'nagative',
          icon: 'error_outline'
        })
        // User couldn't sign in (bad verification code?)
        // ...
      })
    },
    changePassword () {
      let vm = this
      if (!vm.$v.$invalid) {
        vm.currentUser.updatePassword(vm.password).then(function () {
          vm.$q.notify({
            message: `${vm.$t('Password changed')}`,
            type: 'positive',
            icon: 'info'
          })
          vm.setLeftDrawerState(false)
          vm.signUserOut()
          router.push('/login')
        }).catch(function (error) {
          alert('Error :' + error.message)
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
  },
  computed: {
    ...mapGetters([
      'leftDrawerState',
      'rightDrawerState',
      'userId'
    ]),
    getOtpFormValidate () {
      let vm = this
      let valid = true
      if (vm.$v.phoneNumber.$invalid) {
        valid = false
      }
      return valid
    }
  }
}
</script>
