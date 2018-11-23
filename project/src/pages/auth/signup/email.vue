<template>
  <q-card>
    <q-card-title>
      <q-icon name="border_color"/> {{ $t('Signup by email') }}
      <span slot="right">{{ locale }}</span>
    </q-card-title>
    <q-card-separator />
    <q-card-main style="padding">
      <!-- firstName -->
      <q-field
        :error="$v.firstName.$error"
        :error-label="$t('Requires non-empty data')"
      >
        <q-input
          :float-label="$t('First name')"
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
          :float-label="$t('Last name')"
          v-model.trim="lastName"
          @keyup="$v.lastName.$touch"
        />
      </q-field>
      <!-- email -->
      <q-field
        icon="email"
        :error="$v.email.$error"
        :error-label="`${!$v.email.required ? $t('Requires non-empty data') : ''} ${!$v.email.email ? $t('Invalid') : ''}`"
      >
        <q-input
          :float-label="$t('Email')"
          type="email"
          v-model.trim="email"
          @keyup="$v.email.$touch"
        />
      </q-field>
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
    </q-card-main>

    <!-- Submit Button -->
    <q-card-actions
      align="center"
      v-if="!userId"
    >
      <q-btn
        class="q-mr-sm"
        icon="arrow_back"
        color="orange"
        :label="$t('Back')"
        @click="$router.push('/auth/login')"
      />
      <q-btn
        class="q-mr-sm"
        color="primary"
        @click="signup"
      >
        {{ $t('Sign up') }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import router from 'src/router'
import langSwitch from 'src/components/shared/langSwitch'

export default {
  name: 'emailSignUp',
  mixins: [
    langSwitch
  ],
  data () {
    return {
      email: this.$route.query.email,
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs('password') }
  },
  methods: {
    ...mapActions([
      'signUserUp'
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
    signup () {
      let vm = this
      if (!vm.$v.$invalid) {
        vm.signUserUp({
          firstName: vm.firstName,
          lastName: vm.lastName,
          email: vm.email,
          password: vm.password,
          inviter: vm.inviter,
          active: false
        })
      } else {
        vm.$q.notify({
          message: vm.$t('Validation error'),
          type: 'nagative',
          icon: 'error_outline'
        })
      }
    },
    resetPassword () {
      router.push({path: 'resetPassword'})
    }
  },
  created: function () {
    window.addEventListener('keypress', this.checkKey)
    this.setAllDrawerClose()
    this.setLeftDrawerState(true)
  },
  computed: {
    ...mapGetters([
      'leftDrawerState',
      'userId'
    ]),
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

<style>
</style>
