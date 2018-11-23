<template>
  <q-page class="flex flex-center">
    <div id="recaptcha-container"></div><br>
    <q-card inline style="width: 500px">
      <router-view/>
    </q-card>
  </q-page>
</template>

<script>
// import
import { mapActions } from 'vuex'
import { Notify } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import firebase from 'firebase'
import router from 'src/router'
import publicVars from 'src/components/shared/publicVars'

// export
export default {
  // mixins
  mixins: [
    publicVars
  ],
  // created
  created () {
    window.addEventListener('keypress', this.checkKey)
    this.initReCaptcha()
  },
  // beforeDestory
  beforeDestroy () {
    window.removeEventListener('keypress', this.checkKey)
  },
  // data
  data () {
    return {
      appVerifier: '',
      countryCode: '+66',
      emailOrMobileNumber: '',
      opEmail: '',
      opMobile: '',
      step2: ''
    }
  },
  // validations
  validations: {
    emailOrMobileNumber: { required }
  },
  // methods
  methods: {
    ...mapActions([
      'resetPassword'
    ]),
    checkKey (e) {
      // code: "Enter"
      if (e.charCode === 13) {
        this.submit()
      }
    },
    initReCaptcha () {
      setTimeout(() => {
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
    sendOtp () {
      let vm = this
      let phoneNumber = vm.emailOrMobileNumber
      let appVerifier = vm.appVerifier
      vm.$auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult
          //
          Notify.create({message: 'SMS sent', type: 'positive'})
          vm.$router.push(`/forgot-password/otp?phoneNumber=${phoneNumber}`)
        }).catch(function (error) {
          // Error Error! SMS not delivered
          // ...
          console.log(error)
          Notify.create('Error! SMS not delivered')
        })
    },
    findAccount () {
      return new Promise(resolve => {
        let vm = this
        let result = {}
        vm.$database.collection('authUser')
          .where('email', '==', `${vm.emailOrMobileNumber}@email.com`)
          .limit(1)
          .get()
          .then(function (docs) {
            if (docs.exists) {
              docs.forEach(function (doc) {
                result = {
                  id: doc.id,
                  data: doc.data()
                }
              })
            }
            return resolve(result)
          })
      })
    },
    async submit () {
      let vm = this
      if (!vm.$v.$invalid) {
        if (!vm.$isEmail.validate(vm.emailOrMobileNumber)) {
          // vm.sendOtp()
          // let userAccount = await vm.findAccount()
          vm.$router.push(`/forgot-password/otp?phoneNumber=${vm.emailOrMobileNumber}`)
        } else {
          vm.resetPassword(vm.emailOrMobileNumber)
        }
      } else {
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'nagative',
          icon: 'error_outline'
        })
      }
    },
    // goToIndex
    goToIndex () {
      router.push('/')
    }
  }
}
</script>

<style>
</style>
