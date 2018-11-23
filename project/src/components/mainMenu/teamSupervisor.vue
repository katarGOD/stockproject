<template>
  <q-collapsible
    indent
    icon="offline_pin"
    @show="toggleCollapse; getLeaveApproval(); getOvertimeApproval();"
    @hide="toggleCollapse"
    :label="$t('Supervisor')"
    :class="collapseState"
  >
    <q-item to="/my-account/leave-approve">
      <q-item-main :label="$t('Approve leave requests')"/>
        <q-item-side right>
          <q-chip small square color="primary" @click="getLeaveApproval">{{ leaveApproval }}</q-chip>
        </q-item-side>
      </q-item>
    <q-item to="/my-account/approve-overtime-approve">
      <q-item-main :label="$t('Approve OT requests')"/>
        <q-item-side right>
          <q-chip small square color="primary" @click="getOvertimeApproval">{{ overtimeApproval }}</q-chip>
        </q-item-side>
    </q-item>
  </q-collapsible>
</template>

<script>
// import
import { mapGetters } from 'vuex'
import publicFunc from 'src/components/shared/publicFunc'
// export
export default {
  // mixins
  mixins: [publicFunc],
  // data
  data () {
    return {
      collapseState: '',
      leaveApproval: 0,
      overtimeApproval: 0
    }
  },
  // firestore
  firestore () {
    return {
      leaveRequest: this.$database
        .collection('leaveRequest')
        .where('approval', '==', false),
      overtimeRequest: this.$database
        .collection('overtimeRequest')
        .where('approval', '==', false)
    }
  },
  methods: {
    getLeaveApproval () {
      let vm = this
      vm.$firestore.leaveRequest.get().then(snapshot => {
        vm.leaveApproval = snapshot.size
      })
    },
    getOvertimeApproval () {
      let vm = this
      vm.$firestore.overtimeRequest.get().then(snapshot => {
        vm.overtimeApproval = snapshot.size
      })
    }
  },
  // computed
  computed: {
    ...mapGetters(['userId'])
  },
  // created
  created: function () {
    this.getLeaveApproval()
    this.getOvertimeApproval()
  }
}
</script>
