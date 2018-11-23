<template>
  <q-page class="flex flex-center">
    <q-card style="width: 500px; max-width: 90vw;">
      <q-card-title>
        {{ $t('Change password') }}
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <!-- email -->
        <q-field>
          <q-input
            disable
            type="text"
            v-model="email"
            :float-label="$t('Email or mobile number')"
          />
        </q-field>
        <!-- current password -->
        <q-field
          :error="$v.inputForm.currentPassword.$error"
          :error-label="$t('Password must be at least 6 characters long')"
        >
          <q-input
            autofocus=true
            type="password"
            v-model.trim="inputForm.currentPassword"
            :float-label="$t('Current password')"
            @keyup="$v.inputForm.currentPassword.$touch"
          />
        </q-field>
        <!-- password -->
        <q-field
          :error="$v.inputForm.password.$error"
          :error-label="$t('Password must be at least 6 characters long')"
        >
          <q-input
            type="password"
            v-model.trim="inputForm.password"
            :float-label="$t('Password')"
            @keyup="$v.inputForm.password.$touch"
          />
        </q-field>

        <!-- repeatPassword -->
        <q-field
          :error="$v.inputForm.repeatPassword.$error"
          :error-label="$t('Password does not match the confirm password')"
        >
          <q-input
            type="password"
            v-model.trim="inputForm.repeatPassword"
            :float-label="$t('Confirm password')"
            @keyup="$v.inputForm.repeatPassword.$touch"
          />
        </q-field>
      </q-card-main>

      <!-- Submit Button -->
      <q-card-actions align="around">
        <q-btn
          color="secondary"
          :disable="$v.$invalid"
          @click="submit"
        >
          {{ $t('Change password') }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import publicVars from 'src/components/shared/publicVars'
import router from 'src/router'
export default {
  name: 'ChangePassword',
  // mixins
  mixins: [
    publicVars
  ],
  // data
  data () {
    return {
      inputForm: {
        email: null,
        currentPassword: null,
        password: null,
        repeatPassword: null
      }
    }
  },
  // validations
  validations: {
    inputForm: {
      currentPassword: { required },
      password: { required, minLength: minLength(6) },
      repeatPassword: { sameAsPassword: sameAs('password') }
    }
  },
  // methods
  methods: {
    ...mapActions([
      'changePassword'
    ]),
    submit () {
      let vm = this
      if (vm.$v.inputForm.$error) {
        console.log(vm.$v.inputForm.$error)
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'nagetive',
          icon: 'error_outline'
        })
      } else {
        vm.changePassword(vm.inputForm)
          .then(function (result) {
            if (result) {
              console.log(result)
              router.push('/')
            } else {
              vm.$q.notify({
                message: vm.$t('Submit Unsuccessful'),
                type: 'nagetive',
                icon: 'error_outline'
              })
            }
          })
      }
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    email () {
      let vm = this
      let result = ''
      try {
        if (vm.userAccount.phoneNumber) {
          result = vm.userAccount.phoneNumber
        } else {
          result = vm.userAccount.email
        }
      } catch (err) {
        result = ''
      }
      return result
    }
  },
  // watch
  created: function () {
    this.inputForm.email = this.userAccount.email
  }
}
</script>

<style>
</style>
