<template>
  <div>
    <q-card>
      <q-card-title>
        <q-icon name="account_circle"/> {{ $t('Forgot your password?') }}
      </q-card-title>

      <q-card-separator />

      <q-card-main>
        <!-- email -->
      <q-field
        :error="$v.email.$error"
        :error-label="`${!$v.email.required ? $t('Requires non-empty data') : ''} ${!$v.email.email ? $t('invalid') : ''}`"
      >
        <q-input
          :float-label="$t('Email')"
          type="email"
          v-model.trim="email"
          @keyup="$v.email.$touch"
        />
      </q-field>
      <p>{{$t('Enter your email address you registered with us. You will receive an email with link to reset your password.')}}</p>
      </q-card-main>

      <!-- Submit Button -->
      <q-card-actions align="center">
        <q-btn
          class="q-mr-sm"
          color="orange"
          icon="arrow_back"
          :label="$t('Back')"
          @click="$router.push('/login')"
        />
        <q-btn
          color="primary"
          @click="submit"
        >
          {{$t('Submit')}}
        </q-btn>
      </q-card-actions>
      <div id="recaptcha-container"></div><br>
    </q-card>
  </div>
</template>

<script>
// import
import firebase from 'firebase'
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
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
      email: ''
    }
  },
  // validations
  validations: {
    email: { required, email }
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
    findAccount () {
      return new Promise(resolve => {
        let vm = this
        let result = {}
        vm.$database.collection('authUser')
          .where('email', '==', `${vm.email}@email.com`)
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
        vm.resetPassword(vm.email)
        vm.$q.notify({
          message: vm.$t('Email sent'),
          type: 'positive',
          icon: 'info'
        })
      } else {
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'negative',
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
