<template>
  <q-page>
    <q-card>
      <q-card-main>
         <!-- field id -->
        <q-field
          :label="$t('ID')"
          :label-width="labelWidth"
        >
          <q-input
            v-model="inputForm['.key']"
            disable
          />
        </q-field>
        <!-- field Employee ID -->
        <q-field
          :label="$t('Employee ID')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.employeeid.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.employeeid"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            @blur="$v.inputForm.employeeid.$touch()"
          />
        </q-field>
        <!-- field joinDate -->
        <q-field
          :label="$t('Join date')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.joinDate.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-datetime
            v-model="inputForm.joinDate"
            type="date"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            @blur="$v.inputForm.joinDate.$touch()"
          />
        </q-field>
        <!-- Employment Status -->
        <q-field
          :label="$t('Employment status')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.employmentStatus.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-select
            :disable="!hasPermission(['personnel--employee-management--update'])"
            v-model="inputForm.employmentStatus"
            :options="employmentStatusOptions"
          />
        </q-field>
        <!-- Pay type -->
        <q-field
          :label="$t('Employee pay type')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.employeePayType.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-select
            :disable="!hasPermission(['personnel--employee-management--update'])"
            v-model="inputForm.employeePayType"
            :options="PayTypeOptions"
          />
        </q-field>
        <!-- field wage-->
        <q-field
          :label="$t('Ordinary Wage')+' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.wage.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.wage"
            type="number"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            :error="$v.inputForm.wage.$error"
            :error-label="$t('Requires non-empty data')"
            />
        </q-field>
        <!-- field additionalWage1-->
        <q-field
          :label="additionalWageLabel('additionalWage1', '101') + ' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.additionalWage1.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.additionalWage1"
            type="number"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            :error="$v.inputForm.additionalWage1.$error"
            :error-label="$t('Requires non-empty data')"
            />
        </q-field>
        <!-- field additionalWage2-->
        <q-field
          :label="additionalWageLabel('additionalWage2', '102') + ' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.additionalWage2.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.additionalWage2"
            type="number"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            :error="$v.inputForm.additionalWage2.$error"
            :error-label="$t('Requires non-empty data')"
            />
        </q-field>
        <!-- field additionalWage3-->
        <q-field
          :label="additionalWageLabel('additionalWage3', '103') + ' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.additionalWage3.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-input
            v-model="inputForm.additionalWage3"
            type="number"
            :disable="!hasPermission(['personnel--employee-management--update'])"
            :error="$v.inputForm.additionalWage3.$error"
            :error-label="$t('Requires non-empty data')"
            />
        </q-field>
        <!-- field incomeTaxRate-->
        <q-field
          :label="$t('Income tax rate') + ' *'"
          :label-width="labelWidth"
          :error="$v.inputForm.incomeTaxRate.$error"
          :error-label="$t('Requires non-empty data')"
        >
          <q-slider
            v-model="inputForm.incomeTaxRate"
            :min="0"
            :max="20"
            :step="1"
            label-always
            :label-value="`${ inputForm.incomeTaxRate } %`"
            markers
            snap
          />
        </q-field>
        <!-- field bankAccount -->
        <q-field
          :label="$t('Bank account')"
          :label-width="labelWidth"
        >
          <q-input
            :disable="!hasPermission(['personnel--employee-management--update'])"
            v-model="inputForm.bankAccount"
          />
        </q-field>
        <!-- submit -->
        <div class="submit">
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="save"
            wait-for-ripple
            :disable="$v.inputForm.$invalid"
            :label="$t('Save')"
            @click="addForm"
          />
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, numeric } from 'vuelidate/lib/validators'
import accountCodeOptions from 'src/components/options/accountCodeOptions'
import authUserOptions from 'src/components/options/authUserOptions'
import crudProcess from 'src/components/datatable/crudProcess'
import employmentStatusOptions from 'src/components/options/employmentStatusOptions'
import hasPermission from 'src/components/shared/hasPermission'
import publicVars from 'src/components/shared/publicVars'
export default {
  name: 'official',
  // mixins
  mixins: [
    accountCodeOptions,
    authUserOptions,
    crudProcess,
    employmentStatusOptions,
    hasPermission,
    publicVars
  ],
  // data
  data () {
    return {
      // app variable
      formAction: '',
      subMenu: this.$t('Official'),
      // inputForm
      inputForm: {
        '.key': null,
        employeeid: '',
        employmentStatus: '',
        employeePayType: '',
        wage: 0,
        additionalWage1: 0,
        additionalWage2: 0,
        additionalWage3: 0,
        incomeTaxRate: 0,
        joinDate: new Date(),
        bankAccount: '',
        createdBy: this.userId,
        createdOn: new Date(),
        modifiedBy: this.userId,
        modifiedOn: new Date(),
        authUser: this.userId
      },
      PayTypeOptions: [
        { label: this.$t('Hourly'), value: 'hourly' },
        { label: this.$t('Daily'), value: 'daily' },
        { label: this.$t('Monthly'), value: 'salary' }
      ]
    }
  },
  // validations
  validations: {
    inputForm: {
      employeeid: { required },
      employmentStatus: { required },
      employeePayType: { required },
      wage: { required, numeric },
      additionalWage1: { required, numeric },
      additionalWage2: { required, numeric },
      additionalWage3: { required, numeric },
      incomeTaxRate: { required, numeric },
      joinDate: { required }
    }
  },
  // firestore
  firestore () {
    return {
      official: this.$database.collection('official')
    }
  },
  // methods
  methods: {
    async addForm () {
      let vm = this
      if (vm.inputForm['.key']) {
        // update
        vm.inputForm.modifiedBy = vm.userId
        vm.inputForm.modifiedOn = new Date()
        vm.inputForm.authUser = vm.$route.params.id
        await vm.updateProcess(vm.$firestore.official, vm.inputForm, vm.$v.inputForm)
      } else {
        // add
        vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
        vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
        vm.inputForm.authUser = vm.$route.params.id
        await vm.addProcess(vm.$firestore.official, vm.inputForm, vm.$v.inputForm)
      }
    },
    openUpdateFrom () {
      let vm = this
      vm.formAction = 'update'
      this.$q.loading.show()
      vm.$database.collection('official')
        .where('authUser', '==', vm.$route.params.id)
        .get()
        .then(function (docs) {
          docs.forEach(function (doc) {
            vm.inputForm = {
              '.key': doc.id,
              employeeid: doc.data().employeeid,
              employmentStatus: doc.data().employmentStatus,
              employeePayType: doc.data().employeePayType,
              wage: doc.data().wage,
              additionalWage1: doc.data().additionalWage1,
              additionalWage2: doc.data().additionalWage2,
              additionalWage3: doc.data().additionalWage3,
              incomeTaxRate: doc.data().incomeTaxRate,
              joinDate: doc.data().joinDate,
              bankAccount: doc.data().bankAccount
            }
          })
          vm.$q.loading.hide()
        })
    },
    additionalWageLabel (fieldName, accountCode) {
      let vm = this
      let result = fieldName
      let label = vm._.find(vm.accountCodeOptions, {code: accountCode})
      if (!vm._.isUndefined(label)) {
        result = label['label']
      }
      return result
    }
  },
  // created
  created: async function () {
    this.$emit('updateSubMenu', this.subMenu)
    this.openUpdateFrom()
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  // watch
  watch: {
  }
}
</script>

<style>
</style>
