<template>
  <q-page>
    <!-- leave request -->
    <!-- filter -->
    <q-card style="margin-bottom: 5px">
      <q-card-title>
      <!-- title -->
      <p class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</p>
      <span slot="right">
        <q-field
          style="width:200px"
          :label-width="6"
          :label="$t('Year (C.E.)')"
        >
          <q-select
            v-model="filterByYear"
            :options="yearOptions"
          />
        </q-field>
      </span>
      </q-card-title>
    </q-card>
    <!-- datatable: leave request -->
    <q-table
      row-key=".key"
      selection="single"
      :columns="leaveRequestColumns"
      :data="leaveRequestDatatable"
      :filter="filter"
      :loading="loading"
      :pagination.sync="leaveRequestPagination"
      :selected.sync="selected"
      :visible-columns="leaveRequestVisibleColumns"
    >
      <!-- selection -->
      <template slot="top-selection" slot-scope="props">
        <div style="padding-top: 8px; padding-bottom: 8px;">
          <q-btn
            v-if="selected.length==1"
            class="q-mr-sm"
            color="primary"
            icon="edit"
            round
            @click="iOpenUpdateFrom()"
          />
          <q-btn
            class="q-mr-sm"
            color="negative"
            icon="delete"
            round
            @click="deleteRow()"
          />
        </div>
      </template>
      <!-- top-left -->
      <template slot="top-left" slot-scope="props">
        <q-btn
          class="q-mr-sm"
          color="secondary"
          icon="add_circle"
          round
          @click="iOpenAddForm()"
        />
        <q-search hide-underline color="secondary" v-model="filter"/>
      </template>
      <!-- top-right -->
      <template slot="top-right" slot-scope="props">
        <q-table-columns
          class="q-mr-sm"
          color="secondary"
          v-model="leaveRequestVisibleColumns"
          :columns="leaveRequestColumns"
        />
      </template>
      <q-td slot="body-cell-absenceType" slot-scope="props" :props="props">
        <q-btn
          flat
          :label="(_.find(absenceTypeOptions, {'value': props.value}) ? _.find(absenceTypeOptions, {'value': props.value}).label : 'AbsenceType' )"
          @click="selected=[_.find(leaveRequestDatatable, {'.key': props.row['.key']})]; iOpenUpdateFrom();"
        />
      </q-td>
      <!-- datesRequestedFrom -->
      <q-td slot="body-cell-datesRequestedFrom" slot-scope="props" :props="props">
        {{ FormatDate(props.value, 'ddd, DD MMM YYYY HH:mm') }}
      </q-td>
      <!-- datesRequestedTo -->
      <q-td slot="body-cell-datesRequestedTo" slot-scope="props" :props="props">
        {{ FormatDate(props.value, 'ddd, DD MMM YYYY HH:mm') }}
      </q-td>
      <!-- approval -->
      <q-td slot="body-cell-approval" slot-scope="props" :props="props">
        <q-chip v-if="props.value" icon="check" color="positive">
          {{ $t('Approved') }}
        </q-chip>
        <q-chip v-else icon="clear" color="warning">
          {{ $t('Waiting') }}
        </q-chip>
      </q-td>
    </q-table>
    <!-- inputForm: leave request -->
    <q-modal v-model="formModal" maximized :content-css="{padding: '25px'}">
      <!-- datatable: workschedule -->
      <div class="row" style="padding-bottom:25px;">
        <div class="col">
          <q-table
            row-key="name"
            selection="none"
            :columns="myRosterColumns"
            :data="myRosterDatatable"
            :filter="filter"
            :visible-columns="myRosterVisibleColumns"
          >
            <template slot="body" slot-scope="props">
              <q-tr :props="props">
                <template v-if="props.row.type==='ws'">
                  <!-- day1 -->
                  <q-td key="day1" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day1.length">
                      <div v-for="wk in props.row.day1" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day2 -->
                  <q-td key="day2" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day2.length">
                      <div v-for="wk in props.row.day2" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day3 -->
                  <q-td key="day3" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day3.length">
                      <div v-for="wk in props.row.day3" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day4 -->
                  <q-td key="day4" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day4.length">
                      <div v-for="wk in props.row.day4" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day5 -->
                  <q-td key="day5" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day5.length">
                      <div v-for="wk in props.row.day5" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day6 -->
                  <q-td key="day6" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day6.length">
                      <div v-for="wk in props.row.day6" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day7 -->
                  <q-td key="day7" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day7.length">
                      <div v-for="wk in props.row.day7" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day8 -->
                  <q-td key="day8" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day8.length">
                      <div v-for="wk in props.row.day8" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day9 -->
                  <q-td key="day9" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day9.length">
                      <div v-for="wk in props.row.day9" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day10 -->
                  <q-td key="day10" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day10.length">
                      <div v-for="wk in props.row.day10" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day11 -->
                  <q-td key="day11" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day11.length">
                      <div v-for="wk in props.row.day11" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day12 -->
                  <q-td key="day12" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day12.length">
                      <div v-for="wk in props.row.day12" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day13 -->
                  <q-td key="day13" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day13.length">
                      <div v-for="wk in props.row.day13" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                  <!-- day14 -->
                  <q-td key="day14" :props="props" style="vertical-align:top;">
                    <div v-if="props.row.day14.length">
                      <div v-for="wk in props.row.day14" v-bind:key="wk.id">
                        <template v-if="wk.type=='overTime'">
                          {{ 'OT :' + FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                        <template v-else>
                          {{ FormatDate(wk.start, 'HH:mm') }} - {{ FormatDate(wk.end, 'HH:mm') }}
                        </template>
                      </div>
                    </div>
                    <div v-else class="text-red">
                      {{ $t('OFF') }}
                    </div>
                  </q-td>
                </template>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <div class="row justify-center gutter-lg">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12">
          <div class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</div>
          <div class="q-subheading">{{ subHeading }}</div>
            <br><br>
            <q-list>
              <q-collapsible icon="info" :label="$t('Leave summary')">
                <q-list highlight>
                  <q-item>
                    <q-item-main>
                      <div class="row">
                        <div class="col-2">{{ $t('Type') }}</div>
                        <div class="col-5">{{ $t('Entitlement') }}</div>
                        <div class="col-5">{{ $t('Remaining') }}</div>
                      </div>
                    </q-item-main>
                  </q-item>
                  <q-item v-for="l in leaveInfo" v-bind:key="l.code">
                    <q-item-main>
                      <div class="row">
                        <div class="col-2">{{ l.code }}</div>
                        <div class="col-5">{{ l.entitlement }}</div>
                        <div class="col-5">{{ l.remaining }}</div>
                      </div>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-collapsible>
            </q-list>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12">
          <!-- inputForm -->
          <!-- field authUser -->
          <q-field
            :label="$t('Employee')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.authUser"
              disable
              :options="authUserOptions"
            />
          </q-field>
          <!-- Leave Type -->
          <q-field
            :label="$t('Leave type')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.absenceType"
              :disable="inputForm.approval"
              :options="absenceTypeOptions"
            />
          </q-field>
          <!-- dates requestd from -->
          <q-field
            :label="$t('Dates requested from') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.datesRequestedFrom.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-datetime
              v-model="inputForm.datesRequestedFrom"
              color="primary"
              format="ddd, DD MMM YYYY - HH:mm"
              format24h
              type="datetime"
              :disable="inputForm.approval || _.isEmpty(inputForm.absenceType)"
              :min="getLeadTime"
              @blur="$v.inputForm.datesRequestedFrom.$touch()"
              @change="val => { inputForm.datesRequestedFrom = val }"
            />
          </q-field>
          <!-- dates requestd to -->
          <q-field
            :label="$t('Dates requested to') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.datesRequestedTo.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-datetime
              v-model="inputForm.datesRequestedTo"
              color="secondary"
              format="ddd, DD MMM YYYY - HH:mm"
              format24h
              type="datetime"
              :disable="inputForm.approval || _.isEmpty(inputForm.absenceType)"
              :min="inputForm.datesRequestedFrom"
              @blur="$v.inputForm.datesRequestedTo.$touch()"
              @change="val => { inputForm.datesRequestedTo = val }"
            />
          </q-field>
          <!-- note  -->
          <q-field
            :label="$t('Note')"
            :label-width="labelWidth"
          >
            <q-editor
              v-model="inputForm.note"
              :disable="inputForm.approval || _.isEmpty(inputForm.absenceType)"
            />
          </q-field>
          <!-- attachment -->
          <q-field
            :label="$t('Attachment')"
            :label-width="labelWidth"
          >
            <q-uploader
              url=""
              :url-factory="uploadAttachment"
            />
          </q-field>
          <!-- field attachment -->
          <q-field
            v-if="inputForm.attachment"
            label=' '
            :label-width="labelWidth"
          >
            <a v-bind:href="inputForm.attachment" target="_blank">{{ $t('Download attachment') }}</a>
          </q-field>
          <!-- approval -->
          <q-field
            :label="$t('Approval')"
            :label-width="labelWidth"
          >
            <q-toggle
              disable
              v-model="inputForm.approval"
              checked-icon="sentiment very satisfied"
              unchecked-icon="sentiment very dissatisfied"
            />
          </q-field>
          <!-- field approvedBy -->
          <q-field
            :label="$t('Approved by')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.approvedBy"
              disable
              :options="authUserOptions"
            />
          </q-field>
          <!-- action -->
          <!-- submit -->
          <div class="submit">
            <q-btn
              v-if="formAction==='add'"
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('save')"
              @click="addForm"
            />
            <q-btn
              v-if="formAction==='update'"
              class="q-mr-sm"
              color="primary"
              icon="save"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('Save')"
              @click="updateForm"
            />
            <q-btn
              class="q-mr-sm"
              icon="cancel"
              color="light"
              wait-for-ripple
              :label="$t('cancel')"
              @click="formModal=false"
            />
          </div>
        </div>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import absenceTypeOptions from 'src/components/options/absenceTypeOptions'
import authUserOptions from 'src/components/options/authUserOptions'
import crudProcess from 'src/components/datatable/crudProcess'
import FormatDate from 'src/components/shared/formatDate'
import publicVars from 'src/components/shared/publicVars'
import yearOptions from 'src/components/options/yearOptions'

export default {
  name: 'leaveRequest',
  mixins: [
    absenceTypeOptions,
    authUserOptions,
    crudProcess,
    FormatDate,
    publicVars,
    yearOptions
  ],
  // data
  data () {
    return {
      // -------------
      // variable
      // -------------
      defaultWorkingHours: 8,
      // -------------
      // leave request
      // -------------
      // filter
      filterByYear: parseInt(date.formatDate(Date.now(), 'YYYY')),
      // datatable
      leaveRequestColumns: [
        { name: '.key', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'absenceType', label: this.$t('Type'), field: 'absenceType', sortable: false, align: 'left' },
        { name: 'datesRequestedFrom', label: this.$t('From'), field: 'datesRequestedFrom', sortable: true, align: 'left' },
        { name: 'datesRequestedTo', label: this.$t('To'), field: 'datesRequestedTo', sortable: true, align: 'left' },
        { name: 'totalHours', label: this.$t('Hours'), field: 'totalHours', sortable: false, align: 'left' },
        { name: 'approval', label: this.$t('Approval'), field: 'approval', sortable: false, align: 'left' }
      ],
      leaveRequestVisibleColumns: ['absenceType', 'datesRequestedFrom', 'datesRequestedTo', 'approval'],
      leaveRequestPagination: {
        sortBy: 'datesRequestedFrom',
        descending: true
      },
      // input form
      inputForm: {
        '.key': null,
        // request
        authUser: '',
        authUserName: '',
        absenceType: '',
        datesRequestedFrom: new Date(),
        datesRequestedTo: new Date(),
        totalHours: 0,
        note: '',
        attachment: '',
        approval: false,
        approvedBy: null,
        calendarYear: parseInt(date.formatDate(Date.now(), 'YYYY')),
        // log
        createdBy: null,
        createdOn: null,
        modifiedBy: null,
        modifiedOn: null
      },
      // -------------
      // myRoster
      // -------------
      myRosterDatatable: [],
      myRosterVisibleColumns: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10', 'day11', 'day12', 'day13', 'day14'],
      publicHolidays: [],
      workingSchedule: [],
      overtimeRequest: [],
      // -------------
      // leaveInfo
      // -------------
      companyInfo: {},
      leaveInfo: [],
      overtimePay: 0,
      entitlement: '',
      entitlementHour: 0,
      leaveTaken: '',
      leaveTakenHour: 0,
      remaining: '',
      remainingHour: 0,
      currentTotalHours: 0
    }
  },
  // validations
  validations () {
    return {
      inputForm: {
        authUser: { required },
        absenceType: { required },
        datesRequestedFrom: { required },
        datesRequestedTo: { required },
        totalHours: { required }
      }
    }
  },
  // firestore
  firestore () {
    return {
      company: this.$database.collection('company'),
      initialSetup: this.$database.collection('initialSetup'),
      leaveRequestDatatable: this.$database.collection('leaveRequest')
        .where('authUser', '==', this.userId)
        .where('calendarYear', '==', this.filterByYear)
        .orderBy('datesRequestedFrom', 'desc'),
      leaveRequest: this.$database.collection('leaveRequest'),
      overtime: this.$database.collection('overtimeRequest')
        .where('approval', '==', true)
        .where('authUser', '==', this.userId)
        .where('otCompensate', '==', true)
        .where('calendarYear', '==', this.filterByYear)
    }
  },
  // methods
  methods: {
    // utility
    calculateTotalHours () {
      let vm = this
      let result = 0
      let leaveOneday = vm.isLeaveOneday()
      let les = vm.inputForm.datesRequestedFrom
      let lee = vm.inputForm.datesRequestedTo
      let start = null
      let end = null
      let dateSequence = ''
      let lastWorkSchedule = vm._.last(vm.workingSchedule)
      let haveWs = ''
      let wss = new Date()
      let wse = new Date()
      if (leaveOneday) {
        // -------------
        // if oneday leave
        // -------------
        dateSequence = vm.FormatDate(les, 'YYYYMMDD')
        haveWs = vm._.find(vm.workingSchedule, {sequence: dateSequence, type: 'workSchedule'})
        if (vm._.isUndefined(haveWs)) {
          // no work schedule
          if (date.getDateDiff(les, lastWorkSchedule, 'days') > 0) {
            let dwd = vm._.toLower(date.formatDate(vm.inputForm.datesRequestedTo, 'dddd'))
            let dws = vm.companyInfo[dwd]['rangeFrom']
            let dwe = vm.companyInfo[dwd]['rangeTo']
            if (date.getDateDiff(les, dws, 'minutes') >= 0) {
              start = dws
            } else {
              start = les
            }
            if (date.getDateDiff(lee, dwe, 'minutes') >= 0) {
              end = dwe
            } else {
              end = lee
            }
            result = date.getDateDiff(end, start, 'hours')
          }
        } else {
          // has workschedule
          wss = haveWs.start
          wse = haveWs.end
          if (date.getDateDiff(les, wss, 'minutes') >= 0) {
            start = wss
          } else {
            start = les
          }
          if (date.getDateDiff(lee, wse, 'minutes') >= 0) {
            end = wse
          } else {
            end = lee
          }
          result = date.getDateDiff(end, start, 'hours')
        }
        return result
      } else {
        // -------------
        // multiple days
        // -------------
        // for loop from start
        let dateRange = date.getDateDiff(lee, les, 'days') + 1
        let onDate = new Date()
        let onDateStart = new Date()
        let onDateEnd = new Date()
        let dwd = null
        let dws = null
        let dwe = null
        for (let i of vm._.range(dateRange)) {
          onDate = date.addToDate(les, { days: i })
          onDateStart = date.addToDate(les, { days: i })
          onDateEnd = date.addToDate(lee, { days: i })
          dateSequence = vm.FormatDate(onDate, 'YYYYMMDD')
          // ----------
          if (date.getDateDiff(onDate, lastWorkSchedule, 'days') > 0) {
            // after last work schedule
            dwd = vm._.toLower(date.formatDate(onDate, 'dddd'))
            dws = vm.companyInfo[dwd]['rangeFrom']
            dwe = vm.companyInfo[dwd]['rangeTo']
            if (date.getDateDiff(onDateStart, dws, 'minutes') >= 0) {
              start = dws
            } else {
              start = onDateStart
            }
            if (date.getDateDiff(onDateEnd, dwe, 'minutes') >= 0) {
              end = dwe
            } else {
              end = onDateEnd
            }
            result += date.getDateDiff(end, start, 'hours')
          } else {
            // in workschedule range
            haveWs = vm._.find(vm.workingSchedule, {sequence: dateSequence, type: 'workSchedule'})
            if (!vm._.isUndefined(haveWs)) {
              wss = haveWs.start
              wse = haveWs.end
              if (date.getDateDiff(onDateStart, wss, 'minutes') >= 0) {
                start = wss
              } else {
                start = onDateStart
              }
              if (date.getDateDiff(onDateEnd, wse, 'minutes') >= 0) {
                end = wse
              } else {
                end = onDateEnd
              }
              result += date.getDateDiff(end, start, 'hours')
            }
          }
        }
        return result
      }
    },
    getCompanyInfo () {
      return new Promise(resolve => {
        let result = {}
        this.$firestore.company
          .orderBy('name')
          .limit(1)
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result = doc.data()
            })
            return resolve(result)
          })
      })
    },
    getWorkingHour () {
      return new Promise(resolve => {
        let result = (this._.find(this.initialSetup, ['code', '_WRKH']) ? parseInt(this._.find(this.initialSetup, ['code', '_WRKH']).value) : 8)
        return resolve(result)
      })
    },
    getCurrentDateStart (d) {
      let result = date.buildDate({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: d.getDate(),
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      })
      return result
    },
    getCurrentDateEnd (d) {
      let result = date.buildDate({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: d.getDate(),
        hours: 23,
        minutes: 59,
        seconds: 59,
        milliseconds: 59
      })
      return result
    },
    getLeaveInfo () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.absenceTypeOptions.forEach(function (e) {
          // entitlement
          if (e.code === 'OTC') {
            vm.entitlement = `${(vm.overtimePay / vm.defaultWorkingHours)} ${vm.$t('days')}  (${vm.overtimePay} ${vm.$t('hours')})`
            vm.entitlementHour = vm.overtimePay
          } else {
            vm.entitlement = `${e.entitlement} ${vm.$t('days')} (${(e.entitlement * vm.defaultWorkingHours)} ${vm.$t('hours')})`
            vm.entitlementHour = (e.entitlement * vm.defaultWorkingHours)
          }
          // taken
          vm.leaveTaken = `${(vm._.sumBy(vm._.filter(vm.leaveRequest, {'absenceType': e.id}), 'totalHours') / vm.defaultWorkingHours)}  ${vm.$t('days')} (${(vm._.sumBy(vm._.filter(vm.leaveRequest, {'absenceType': e.id}), 'totalHours'))} ${vm.$t('Hours')})`
          vm.leaveTakenHour = vm._.sumBy(vm._.filter(vm.leaveRequest, {'absenceType': e.id}), 'totalHours')
          // remaining
          vm.remaining = `${((vm.entitlementHour - vm.leaveTakenHour) / vm.defaultWorkingHours)} ${vm.$t('days')} (${(vm.entitlementHour - vm.leaveTakenHour)} ${vm.$t('hours')})`
          vm.remainingHour = (vm.entitlementHour - vm.leaveTakenHour)
          // result
          result.push({
            id: e.id,
            code: e.code,
            entitlement: vm.entitlement,
            entitlementHour: vm.entitlementHour,
            leaveTaken: vm.leaveTaken,
            leaveTakenHour: vm.leaveTakenHour,
            remaining: vm.remaining,
            remainingHour: vm.remainingHour
          })
        })
        return resolve(result)
      })
    },
    getOvertimePay () {
      return new Promise(resolve => {
        let vm = this
        let otRec = []
        let result = 0
        vm.$firestore.overtime
          .get()
          .then(docs => {
            docs.forEach(doc => {
              otRec.push({
                id: doc.id,
                data: doc.data(),
                overtimePay: doc.data().overtimePay
              })
            })
            result = vm._.sumBy(otRec, 'overtimePay')
            return resolve(result)
          })
      })
    },
    getPublicHoliday () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        let startYear = parseInt(date.formatDate(vm.inputForm.datesRequestedFrom, 'YYYY'))
        let endYear = parseInt(date.formatDate(vm.inputForm.datesRequestedFrom, 'YYYY')) + 1
        vm.$database.collection('publicHolidays')
          .where('year', '>=', startYear)
          .where('year', '<=', endYear)
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                id: doc.id,
                title: doc.data().holiday,
                date: doc.data().date
              })
            })
            return resolve(result)
          })
      })
    },
    getWorkingSchedule () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        let fromDate = new Date(vm.inputForm.datesRequestedFrom)
        let toDate = date.addToDate(new Date(vm.inputForm.datesRequestedFrom), { days: 13 })
        let currentDateStart = vm.getCurrentDateStart(fromDate)
        let currentDateEnd = vm.getCurrentDateEnd(toDate)
        // workSchedule
        vm.$database.collection('workSchedule')
          .where('start', '>=', currentDateStart)
          .where('start', '<=', currentDateEnd)
          .where('authUser', '==', vm.userId)
          .orderBy('start')
          .get()
          .then(docs => {
            docs.forEach(doc => {
              result.push({
                id: doc.id,
                authUser: doc.data().authUser,
                start: doc.data().start,
                end: doc.data().end,
                note: doc.data().note,
                type: doc.data().type,
                sequence: date.formatDate(doc.data().start, 'YYYYMMDD')
              })
            })
            // point to return
            return resolve(result)
          })
      })
    },
    isLeaveOneday () {
      let result = true
      if ((date.getDateDiff(this.inputForm.datesRequestedTo, this.inputForm.datesRequestedFrom, 'days')) > 0) {
        result = false
      }
      return result
    },
    isPublicHoliday (d, format) {
      let result = ''
      this.publicHolidays.forEach(ph => {
        if (date.formatDate(ph.date, format) === d) {
          result = `${ph.title}`
        }
      })
      return result
    },
    rosterCalendar (d, i) {
      let result = date.formatDate(date.addToDate(d, { days: i }), 'ddd DD-MMM-YYYY')
      return result
    },
    uploadAttachment (file) {
      let vm = this
      let folder = `leaveDocument/${vm.userId}/${date.formatDate(new Date(), 'YYYYMMDD-HHmmss')}`
      let fileName = file.name
      vm.$storage.ref().child(`${folder}/${fileName}`).put(file)
        .then(function (snapshot) {
          // notify
          vm.$q.notify({
            message: `${vm.$t('Attachment uploaded successfully')}`,
            type: 'info',
            icon: 'info'
          })
          snapshot.ref.getDownloadURL().then(function (downloadURL) {
            vm.inputForm.attachment = downloadURL
          })
        })
    },
    // process
    createWorkScheduleTable () {
      let vm = this
      let result = []
      // public holiday
      let phs = []
      for (let i of vm._.range(14)) {
        let d = date.formatDate(date.addToDate(vm.inputForm.datesRequestedFrom, {days: i}), 'YYYYMMDD')
        let ph = vm.isPublicHoliday(d, 'YYYYMMDD')
        phs.push(ph)
      }
      result.push({
        type: 'ph',
        day1: phs[0],
        day2: phs[1],
        day3: phs[2],
        day4: phs[3],
        day5: phs[4],
        day6: phs[5],
        day7: phs[6],
        day8: phs[7],
        day9: phs[8],
        day10: phs[9],
        day11: phs[10],
        day12: phs[11],
        day13: phs[12],
        day14: phs[13]
      })
      // workschedule
      let wks = []
      for (let i of vm._.range(14)) {
        let d = date.formatDate(date.addToDate(vm.inputForm.datesRequestedFrom, {days: i}), 'YYYYMMDD')
        let wk = vm._.filter(vm.workingSchedule, function (o) {
          return (date.formatDate(o.start, 'YYYYMMDD') === d)
        })
        wks.push(wk)
      }
      result.push({
        type: 'ws',
        day1: wks[0],
        day2: wks[1],
        day3: wks[2],
        day4: wks[3],
        day5: wks[4],
        day6: wks[5],
        day7: wks[6],
        day8: wks[7],
        day9: wks[8],
        day10: wks[9],
        day11: wks[10],
        day12: wks[11],
        day13: wks[12],
        day14: wks[13]
      })
      return result
    },
    // custom crud
    async iOpenAddForm () {
      let vm = this
      this.$q.loading.show()
      vm.companyInfo = await vm.getCompanyInfo()
      vm.publicHolidays = await vm.getPublicHoliday()
      vm.defaultWorkingHours = await vm.getWorkingHour()
      vm.overtimePay = await vm.getOvertimePay()
      vm.leaveInfo = await vm.getLeaveInfo()
      // initial inputForm
      vm.openAddForm(vm.inputForm)
      vm.workingSchedule = await vm.getWorkingSchedule()
      vm.myRosterDatatable = vm.createWorkScheduleTable()
      vm.inputForm.authUser = vm.userId
      vm.$q.loading.hide()
    },
    async iOpenUpdateFrom () {
      let vm = this
      this.$q.loading.show()
      vm.companyInfo = await vm.getCompanyInfo()
      vm.publicHolidays = await vm.getPublicHoliday()
      vm.defaultWorkingHours = await vm.getWorkingHour()
      vm.overtimePay = await vm.getOvertimePay()
      vm.leaveInfo = await vm.getLeaveInfo()
      // open inputForm
      vm.openUpdateFrom(vm.inputForm, vm.selected[0])
      vm.currentTotalHours = vm.inputForm.totalHours
      vm.workingSchedule = await vm.getWorkingSchedule()
      vm.myRosterDatatable = vm.createWorkScheduleTable()
      vm.$q.loading.hide()
    },
    async addForm () {
      let vm = this
      let remaining = vm._.find(vm.leaveInfo, {id: vm.inputForm.absenceType})['remainingHour']
      vm.inputForm.totalHours = await vm.calculateTotalHours()
      if (vm.inputForm.totalHours <= remaining) {
        vm.inputForm.authUserName = vm._.find(vm.authUserOptions, {id: vm.userId})['label']
        vm.inputForm.calendarYear = parseInt(date.formatDate(vm.inputForm.datesRequestedFrom, 'YYYY'))
        vm.inputForm.createdBy = vm.inputForm.modifiedBy = vm.userId
        vm.inputForm.createdOn = vm.inputForm.modifiedOn = new Date()
        await vm.addProcess(vm.$firestore.leaveRequest, vm.inputForm, vm.$v.inputForm)
      } else {
        // notify
        vm.$q.notify({
          message: `${vm.$t('Over limit')}`,
          type: 'negative',
          icon: 'error_outline'
        })
      }
    },
    async updateForm () {
      let vm = this
      let remaining = vm._.find(vm.leaveInfo, {id: vm.inputForm.absenceType})['remainingHour']
      vm.inputForm.totalHours = await vm.calculateTotalHours()
      if (vm.inputForm.totalHours <= (remaining + vm.currentTotalHours)) {
        vm.inputForm.modifiedBy = vm.userId
        vm.inputForm.modifiedOn = new Date()
        await vm.updateProcess(vm.$firestore.leaveRequest, vm.inputForm, vm.$v.inputForm)
      } else {
        // notify
        vm.$q.notify({
          message: `${vm.$t('Over limit')}`,
          type: 'negative',
          icon: 'error_outline'
        })
      }
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.leaveRequest)
      vm.selected = []
    }
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ]),
    myRosterColumns () {
      let result = []
      for (let i of this._.range(14)) {
        result.push({
          name: `day${i + 1}`,
          label: this.rosterCalendar(this.inputForm.datesRequestedFrom, i),
          field: `day${i + 1}`,
          sortable: false,
          align: 'center'
        })
      }
      return result
    },
    getLeadTime () {
      let vm = this
      let result = new Date()
      if (vm.inputForm.absenceType) {
        let days = vm._.find(vm.absenceTypeOptions, {'value': vm.inputForm.absenceType}).data.requestLeadTime
        if (vm.formAction === 'update') {
          let d = new Date(vm.inputForm.createdOn)
          result = date.buildDate({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            date: d.getDate(),
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
          })
          result.setDate(result.getDate() + days)
        } else {
          let d = new Date()
          result = date.buildDate({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            date: d.getDate(),
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
          })
          result.setDate(result.getDate() + days)
        }
      }
      return result
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.leaveRequestDatatable)
  },
  // watch
  watch: {
    'inputForm.absenceType' () {
      if (this.inputForm.absenceType) {
        // case add
        if (this.formAction === 'add') {
          this.inputForm.datesRequestedFrom = this.getLeadTime
          this.inputForm.datesRequestedTo = this.getLeadTime
        }
      }
    },
    async 'inputForm.datesRequestedFrom' () {
      // case add
      if (this.formAction === 'add') {
        this.publicHolidays = await this.getPublicHoliday()
        this.workingSchedule = await this.getWorkingSchedule()
        this.myRosterDatatable = this.createWorkScheduleTable()
      }
      // from > to ?
      if (this.inputForm.datesRequestedFrom > this.inputForm.datesRequestedTo) {
        this.inputForm.datesRequestedTo = this.inputForm.datesRequestedFrom
      }
    },
    async 'inputForm.datesRequestedTo' () {
      // from > to ?
      if (this.inputForm.datesRequestedFrom > this.inputForm.datesRequestedTo) {
        this.inputForm.datesRequestedTo = this.inputForm.datesRequestedFrom
      }
    }
  }
}
</script>
