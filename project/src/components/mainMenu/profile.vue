<template>
  <q-collapsible
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Profile')"
    :class="collapseState"
  >
    <!-- official -->
    <q-item to="/my-account/profile/official">
      <q-item-main :label="$t('official')"/>
    </q-item>
    <!-- document -->
    <q-item to="/my-account/profile/document">
      <q-item-main :label="$t('document')"/>
    </q-item>
    <!-- leave -->
    <q-item to="/my-account/profile/leave">
      <q-item-main :label="$t('leave')"/>
    </q-item>
    <!-- salary -->
    <q-item to="/my-account/profile/salary">
      <q-item-main :label="$t('salary')"/>
    </q-item>
    <!-- personalInfo -->
    <q-item to="/my-account/profile/personalInfo">
      <q-item-main :label="$t('personal')"/>
    </q-item>
    <!-- contact -->
    <q-item to="/my-account/profile/contact">
      <q-item-main :label="$t('Content')"/>
    </q-item>
    <!-- skill -->
    <q-item to="/my-account/profile/skill">
      <q-item-main :label="$t('Skill')"/>
    </q-item>
    <!-- jobhistory -->
    <q-item to="/my-account/profile/jobhistory">
      <q-item-main :label="$t('jobhistory')"/>
    </q-item>
    <!-- experience -->
    <q-item to="/my-account/profile/experience">
      <q-item-main :label="$t('experience')"/>
    </q-item>
    <!-- education -->
    <q-item to="/my-account/profile/education">
      <q-item-main :label="$t('Education')"/>
    </q-item>
    <!-- training -->
    <q-item to="/my-account/profile/training">
      <q-item-main :label="$t('Training')"/>
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
  mixins: [
    publicFunc
  ],
  // data
  data () {
    return {
      collapseState: ''
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}
</script>
