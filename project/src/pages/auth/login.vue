<template>
  <q-page>
    <div class="row justify-between gutter-md">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-card-title>
        <q-icon name="vpn_key"/> {{ $t('Login') }}
        <span slot="right">{{ $t('Welcome back') }}</span>
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <!-- email -->
        <q-field
          icon="face"
          :error="$v.email.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            autofocus=true
            :float-label="$t('Mobile number')"
            type="email"
            v-model.trim="email"
            @keyup="$v.email.$touch"
          />
        </q-field>

        <!-- password -->
        <q-field
          icon="fingerprint"
          :error="$v.password.$error"
          :error-label="$t('Password must be at least 6 characters long')"
        >
          <q-input
            :disable="email===''"
            :float-label="$t('Password')"
            type="password"
            v-model.trim="password"
            @keyup="$v.password.$touch"
          />
        </q-field>
      </q-card-main>

      <!-- Submit Button -->
      <q-card-actions align="center">
        <q-btn
          class="q-mr-sm"
          color="primary"
          :label="$t('Login')"
          @click="login"
        />
      </q-card-actions>
      <q-card-actions align="center">
        <q-btn
          class="q-mr-sm"
          :label=" $t('Forgot password?')"
          @click="$router.push('/forgot-password/otp')"
        />
        <q-btn
          class="q-mr-sm"
          :label="$t('Sign up')"
          @click="$router.push('/auth/signup/phone')"
        />
      </q-card-actions>
      </div>
    </div>
  </q-page>
</template>

<script>
// import
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import branchOptions from 'src/components/options/branchOptions'
import departmentOptions from 'src/components/options/departmentOptions'
// export
export default {
  name: 'login',
  // mixins
  mixins: [
    branchOptions,
    departmentOptions
  ],
  // data
  data () {
    return {
      // register
      signup: true,
      // form
      email: this.$route.query.email,
      password: null,
      // datatable
      collectionSize: 0,
      // datatable
      pagination: {
        sortBy: 'firstName',
        descending: false,
        rowsPerPage: 100
      },
      filterByBranch: '',
      columns: [
        { name: 'firstName', label: this.$t('First name'), field: 'firstName', sortable: true, align: 'left' },
        { name: 'lastName', label: this.$t('Last name'), field: 'lastName', sortable: true, align: 'left' },
        { name: 'branch', label: this.$t('Branch'), field: 'branch', sortable: true, align: 'left' },
        { name: 'department', label: this.$t('Department'), field: 'department', sortable: true, align: 'left' }
      ],
      visibleColumns: ['firstName', 'lastName', 'branch', 'department'],
      selected: [],
      filter: '',
      loading: true
    }
  },
  // firestore
  firestore () {
    return {
      authUser: this.$database.collection('authUser')
        .where('active', '==', true),
      initialSetup: this.$database.collection('initialSetup')
    }
  },
  // validations
  validations: {
    email: { required, minLength: minLength(10) },
    password: { required }
  },
  // methods
  methods: {
    ...mapActions([
      'signUserIn',
      'checkEmailVerified'
    ]),
    ...mapMutations([
      'setAllDrawerClose',
      'setLeftDrawerState'
    ]),
    checkKey (e) {
      // code: "Enter"
      if (e.charCode === 13) {
        this.login()
      }
    },
    // loadingStatus
    loadingStatus () {
      let vm = this
      vm.$firestore.authUser.get().then(snapshot => {
        vm.collectionSize = snapshot.size
        vm.loading = false
      })
    },
    async login () {
      let vm = this
      let userName = vm.email
      if (!vm.$v.$invalid) {
        if (!vm.$isEmail.validate(vm.email)) {
          userName = `+66${vm.email.slice(1)}@email.com`
        }
        console.log(userName)
        vm.signUserIn({
          email: userName,
          password: vm.password,
          router: vm.$router
        })
      } else {
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'nagative',
          icon: 'error_outline'
        })
      }
    },
    rowClick (row) {
      this.selected = [row]
    },
    checkAllowSignup () {
      return new Promise(resolve => {
        let vm = this
        let result = false
        vm.$firestore.initialSetup
          .where('code', '==', '_SIGNUP')
          .limit(1)
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result = doc.data().value
            })
            return resolve(result)
          })
      })
    },
    getBranchName (id) {
      let vm = this
      let result = '...'
      if (vm.branchOptions) {
        if (vm._.find(vm.branchOptions, {id: id})) {
          result = vm._.find(vm.branchOptions, {id: id}).data.code
        }
      }
      return result
    },
    getDeptName (id) {
      let vm = this
      let result = '...'
      if (vm.departmentOptions) {
        if (vm._.find(vm.departmentOptions, {id: id})) {
          result = vm._.find(vm.departmentOptions, {id: id}).data.code
        }
      }
      return result
    }
  },
  // created
  created: async function () {
    let vm = this
    window.addEventListener('keypress', vm.checkKey)
    vm.setAllDrawerClose()
    vm.setLeftDrawerState(true)
    vm.loadingStatus()
    vm.signup = await vm.checkAllowSignup()
  },
  computed: {
    ...mapGetters([
      'leftDrawerState'
    ])
  },
  // watch
  watch: {
    'filterByBranch': async function () {
      this.filterByAccountCode = ''
      this.$binding('authUser', this.$database.collection('authUser')
        .where('active', '==', true)
        .where('branch', '==', this.filterByBranch)
      )
    },
    selected () {
      if (this.selected) {
        this.email = this.selected[0].email
        window.scrollTo(0, 0)
      }
    }
  },
  // beforeDestroy
  beforeDestroy () {
    window.removeEventListener('keypress', this.checkKey)
  }
}
</script>

<style>
</style>
