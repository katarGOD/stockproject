  <template>
  <q-page>
    <!-- ///////// -->
    <!-- filter -->
    <!-- ///////// -->
    <q-card style="margin-bottom: 5px">
      <q-card-title>
      <!-- title -->
      <p class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</p>
      <span slot="right">
        <q-field
          :label-width="6"
          :label="$t('Year (C.E.)')"
        >
          <q-select
            v-model="filterByYear"
            :options="yearOptions"
            style="width:100px;"
          />
        </q-field>
      </span>
      </q-card-title>
    </q-card>
    <!-- ///////// -->
    <!-- datatable leave request -->
    <!-- ///////// -->
    <q-table
      row-key=".key"
      selection="single"
      :columns="columns"
      :data="leaveRequest"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
    >
      <!-- requestDate -->
      <q-td slot="body-cell-period" slot-scope="props" :props="props">
        {{ $t('Begin date') }} : {{ FormatDate(props.row.requestDate.from, "YYYY-MM-DD HH:mm") }} -- {{ $t('End date') }} : {{ FormatDate(props.row.requestDate.to, "YYYY-MM-DD HH:mm") }}
      </q-td>
      <!-- requestDate -->
      <q-td slot="body-cell-absenceType" slot-scope="props" :props="props">
        {{ (_.find(absenceTypeOptions, {'value': props.value}) ? _.find(absenceTypeOptions, {'value': props.value}).label : 'AbsenceType' ) }}
      </q-td>
      <q-td slot="body-cell-approved" slot-scope="props" :props="props">
        <span small>
          <q-icon v-if="props.value" name="check"/>
          <q-icon v-else name="clear"/>
        </span>
      </q-td>
      <!-- selection -->
      <template slot="top-selection" slot-scope="props">
        <div style="padding-top: 8px; padding-bottom: 8px;">
          <q-btn
            color="negative"
            round
            icon="delete"
            @click="deleteRow()"
            :disable="deleteCheck(selected)"
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
          @click="openAddForm()"
        />
        <q-search
          color="secondary"
          hide-underline
          v-model="filter"
        />
      </template>
      <!-- top-right -->
      <template slot="top-right" slot-scope="props">
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />
      </template>
    </q-table>
    <!-- ///////// -->
    <!-- inputForm -->
    <!-- ///////// -->
    <q-modal v-model="formModal" maximized :content-css="{padding: '50px'}">
      <!-- ///////// -->
      <!-- datatable leave type -->
      <!-- ///////// -->
      <q-table
        row-key="code"
        selection="none"
        :columns="columns2"
        :data="leaveData"
        :filter="filter"
        :loading="loading"
        :pagination.sync="pagination"
        :visible-columns="visibleColumns2"
      >
        <template slot="body" slot-scope="props">
          <q-tr :props="props">
            <!-- code -->
            <q-td key="code" :props="props">
              <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
              {{ props.row.code }}
            </q-td>
            <!-- description -->
            <q-td key="description" :props="props">
              {{ props.row.description }}
            </q-td>
            <!-- remaining -->
            <q-td key="remaining" :props="props">
              {{ props.row.remaining }}
            </q-td>
            <!-- action btn -->
            <q-td key="actions" :props="props">
              <q-btn
                color="blue"
                icon="add"
                round
                :disable="checkRemaining(props.row.remainingHour)"
                @click="selectFrom(props.row)"
              />
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                <b>{{ $t('Entitlement') }}</b> : {{ props.row.entitlement }}<br>
                <b>{{ $t('Taken') }}</b> : {{ props.row.leaveTaken }}<br>
                <b>{{ $t('Note') }}</b> :
                <span v-if="props.row.requestLeadTime < 0">
                  {{ `${$t('Submitted within')} ${Math.abs(props.row.requestLeadTime)} ${$t('days')} ${$t('after an unplanned leave')}` }}
                </span>
                <span v-else>
                  {{ `${$t('Submitted')} ${Math.abs(props.row.requestLeadTime)} ${ $t('days') } ${ $t('in advance')}` }}
                </span>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!-- ///////// -->
      <!-- datatable roster -->
      <!-- ///////// -->
      <q-table
        row-key="name"
        selection="none"
        :columns="columns3"
        :data="myRoster"
        :filter="filter"
        :pagination.sync="pagination"
        :visible-columns="visibleColumns3"
      >
        <template slot="body" slot-scope="props">
          <q-tr :props="props">
            <template v-if="props.row.type==='ph'">
              <!-- day1 -->
              <q-td key="day1" :props="props">{{ props.row.day1 }}</q-td>
              <!-- day2 -->
              <q-td key="day2" :props="props">{{ props.row.day2 }}</q-td>
              <!-- day3 -->
              <q-td key="day3" :props="props">{{ props.row.day3 }}</q-td>
              <!-- day4 -->
              <q-td key="day4" :props="props">{{ props.row.day4 }}</q-td>
              <!-- day5 -->
              <q-td key="day5" :props="props">{{ props.row.day5 }}</q-td>
              <!-- day6 -->
              <q-td key="day6" :props="props">{{ props.row.day6 }}</q-td>
              <!-- day7 -->
              <q-td key="day7" :props="props">{{ props.row.day7 }}</q-td>
              <!-- day8 -->
              <q-td key="day8" :props="props">{{ props.row.day8 }}</q-td>
              <!-- day9 -->
              <q-td key="day9" :props="props">{{ props.row.day9 }}</q-td>
              <!-- day10 -->
              <q-td key="day10" :props="props">{{ props.row.day10 }}</q-td>
              <!-- day11 -->
              <q-td key="day11" :props="props">{{ props.row.day11 }}</q-td>
              <!-- day12 -->
              <q-td key="day12" :props="props">{{ props.row.day12 }}</q-td>
              <!-- day13 -->
              <q-td key="day13" :props="props">{{ props.row.day13 }}</q-td>
              <!-- day14 -->
              <q-td key="day14" :props="props">{{ props.row.day14 }}</q-td>
            </template>
            <template v-else>
              <!-- day1 -->
              <q-td key="day1" :props="props" style="vertical-align:top;">
                <div v-if="props.row.day1.length">
                  <div v-for="ws in props.row.day1" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT :' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day2" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT :' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day3" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT :' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day4" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT :' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day5" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT :' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day6" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT :' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day7" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day8" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day9" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day10" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day11" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day12" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day13" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
                  <div v-for="ws in props.row.day14" v-bind:key="ws.id">
                    <template v-if="ws.type=='overTime'">
                      {{ 'OT : ' + FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
                    </template>
                    <template v-else>
                      {{ FormatDate(ws.start, 'HH:mm') }} - {{ FormatDate(ws.end, 'HH:mm') }}
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
      <br><br><br>
      <div v-if="selectValue" class="row justify-center gutter-lg">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12">
          <div class="q-headline">{{ $t($changeCase.sentenceCase($options.name)) }}</div>
          <div class="q-subheading">{{ subHeading }}</div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12">
          <!-- field authUser -->
          <q-field
            :label="$t('Employee')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.authUser"
              :options="authUserOptions"
              disable
            />
          </q-field>
          <!-- Department -->
          <q-field
            :label="$t('Department')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="departmentId"
              :options="departmentOptions"
              disable
            />
          </q-field>
          <!-- Leave Type -->
          <q-field
            :label="$t('Leave type')"
            :label-width="labelWidth"
          >
            <q-select
              v-model="inputForm.absenceType"
              :options="absenceTypeOptions"
              disable
            />
          </q-field>
          <q-field
            :label="$t('Request date from') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.requestDate.from.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-datetime
              color="primary"
              type="date"
              v-model="inputForm.requestDate.from"
              :disable="inputForm.approved"
              :min="minDate"
              @blur="$v.inputForm.requestDate.from.$touch()"
              @change="val => { inputForm.requestDate.from = val }"
            />
          </q-field>
          <q-field
            :label="$t('Date to') + ' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.requestDate.to.$error"
            :error-label="$t('Requires non-empty data')"
          >
            <q-datetime
              color="secondary"
              type="date"
              v-model="inputForm.requestDate.to"
              :disable="inputForm.approved"
              :min="inputForm.requestDate.from"
              @blur="$v.inputForm.requestDate.to.$touch()"
            />
          </q-field>
          <div v-if="leaveOneday()" >
            <q-field
              :label="$t('Start') + ' *'"
              :label-width="labelWidth"
            >
              <q-datetime
                color="primary"
                format24h
                type="time"
                v-model="inputForm.requestDate.from"
                :disable="inputForm.approved"
              />
            </q-field>
            <q-field
              :label="$t('End') + ' *'"
              :label-width="labelWidth"
            >
              <q-datetime
                color="secondary"
                v-model="inputForm.requestDate.to"
                type="time"
                format24h
                :disable="inputForm.approved"
              />
            </q-field>
          </div>
          inputForm.totalHours : {{ inputForm.totalHours }}<br>
          workingHourData : {{ workingHourData }}
          <q-field
            :label="$t('Summary')"
            :label-width="labelWidth"
          >
            <blockquote>
              <span v-if="inputForm.totalHours >= workingHourData">
                {{ `${inputForm.totalHours/workingHourData} ${$t('Days')}` }}
              </span>
              <span v-else>
                {{ `${inputForm.totalHours} ${$t('Hours')}` }}
              </span>
            </blockquote>
          </q-field>
          <!-- Comments  -->
          <q-field
            :label="$t('Comments')+' *'"
            :label-width="labelWidth"
            :error="$v.inputForm.comments.$error"
            :error-label="`${!$v.inputForm.comments.required ? $t('Requires non-empty data') : ''}`"
          >
            <q-input
              type="text"
              v-model.trim="inputForm.comments"
              @blur="$v.inputForm.comments.$touch()"
            />
          </q-field>
          <q-field
            :label="$t('Approve')"
            :label-width="labelWidth"
          >
            <q-toggle
              disable
              v-model="inputForm.approved"
              checked-icon="sentiment very satisfied"
              unchecked-icon="sentiment very dissatisfied"
            />
          </q-field>
          <!-- submit -->
          <div class="submit">
            <q-btn
              v-if="formAction==='add'"
              color="primary"
              icon="save"
              style="margin-right:5px;"
              wait-for-ripple
              :disable="$v.inputForm.$invalid"
              :label="$t('save')"
              @click="addForm"
            />
            <q-btn
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
import { required, maxValue, minValue } from 'vuelidate/lib/validators'
import absenceTypeOptions from 'src/components/options/absenceTypeOptions'
import authUserOptions from 'src/components/options/authUserOptions'
import crudProcess from 'src/components/datatable/crudProcess'
import departmentOptions from 'src/components/options/departmentOptions'
import FormatDate from 'src/components/shared/formatDate'
import hasPermission from 'src/components/shared/hasPermission'
import publicVars from 'src/components/shared/publicVars'
import yearOptions from 'src/components/options/yearOptions'

export default {
  name: 'leaveRequest',
  // mixins
  mixins: [
    absenceTypeOptions,
    authUserOptions,
    crudProcess,
    departmentOptions,
    FormatDate,
    hasPermission,
    publicVars,
    yearOptions
  ],
  // data
  data () {
    return {
      // app variable
      subHeading: null,
      leaveUsed: 0,
      departmentId: '',
      compensation: false,
      selectValue: false,
      formAction: null,
      filterByYear: parseInt(date.formatDate(Date.now(), 'YYYY')),
      collectionSize: 0,
      // datatable
      pagination: {
        sortBy: 'dateSeq',
        descending: true
      },
      columns: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'dateSeq', label: this.$t('Sequence'), field: 'dateSeq', sortable: false, align: 'left' },
        { name: 'absenceType', label: this.$t('Absence type'), field: 'absenceType', sortable: false, align: 'left' },
        { name: 'period', label: this.$t('Period'), field: 'requestDate', sortable: false, align: 'left' },
        { name: 'totalHours', label: this.$t('Total hours'), field: 'totalHours', sortable: false, align: 'left' },
        { name: 'approved', label: this.$t('Approved'), field: 'approved', sortable: false, align: 'left' }
      ],
      columns2: [
        { name: 'id', label: this.$t('ID'), field: '.key', sortable: true, align: 'left' },
        { name: 'index', label: this.$t('Index'), field: 'index', sortable: true, align: 'left' },
        { name: 'code', label: this.$t('Code'), field: 'code', sortable: true, align: 'left' },
        { name: 'description', label: this.$t('Description'), field: 'description', sortable: true, align: 'left' },
        { name: 'requestLeadTime', label: this.$t('Lead time'), field: 'requestLeadTime', sortable: true, align: 'left' },
        { name: 'entitlement', label: this.$t('Entitlement'), field: 'entitlement', sortable: true, align: 'left' },
        { name: 'leaveTaken', label: this.$t('Taken'), field: 'leaveTaken', sortable: false, align: 'left' },
        { name: 'remaining', label: this.$t('Remaining'), field: 'remaining', sortable: false, align: 'left' },
        { name: 'actions', label: this.$t('Action'), field: 'actions', sortable: false, align: 'left' }
      ],
      visibleColumns: ['absenceType', 'period', 'totalHours', 'approved'],
      visibleColumns2: ['code', 'description', 'remaining', 'actions'],
      visibleColumns3: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10', 'day11', 'day12', 'day13', 'day14'],
      selected: [],
      filter: '',
      overtimeUsed: 0,
      loading: true,
      minDate: new Date(),
      remainingHour: 0,
      maxDate: new Date(),
      workingDays: [],
      workingHourData: 0,
      formModal: false,
      // data
      leaveData: [],
      myRoster: [],
      publicHolidays: [],
      // inputForm
      inputForm: {
        '.key': null,
        authUser: '',
        absenceType: '',
        employeeName: '',
        requestDate: {
          from: new Date(),
          to: new Date()
        },
        comments: '',
        approved: false,
        approvedBy: null,
        yearOfPosting: parseInt(date.formatDate(Date.now(), 'YYYY')),
        totalHours: 0,
        hours: 0,
        // upload
        category: 'leaveDocument',
        filename: '',
        fileExt: '',
        filetype: '',
        rawFile: null,
        // log
        createdBy: '',
        createdOn: '',
        modifiedBy: '',
        modifiedOn: ''
      }
    }
  },
  // validations
  validations () {
    return {
      inputForm: {
        authUser: { required },
        absenceType: { required },
        requestDate: {
          from: { required },
          to: { required }
        },
        totalHours: { maxValue: maxValue(this.remainingHour), minValue: minValue(1) },
        comments: { required }
      }
    }
  },
  // firestore
  firestore () {
    return {
      leaveRequest: this.$database.collection('leaveRequest')
        .where('authUser', '==', this.userId)
        .where('yearOfPosting', '==', this.filterByYear)
        .orderBy('dateSeq', 'desc'),
      leaveRequestDB: this.$database.collection('leaveRequest'),
      userProfile: this.$database.collection('authUser')
        .doc(this.userId),
      initialSetupList: this.$database.collection('initialSetup'),
      overtime: this.$database.collection('overtimeRequest')
        .where('authUser', '==', this.userId)
        .where('otCompensate', '==', true)
        .where('approved', '==', true)
    }
  },
  // methods
  methods: {
    overtimeResult () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$firestore.overtime.get()
          .then(docs => {
            docs.forEach(doc => {
              result.push({
                id: doc.id,
                data: doc.data(),
                overtimePay: doc.data().overtimePay
              })
            })
            let overtime = vm._.sumBy(result, 'overtimePay')
            return resolve(overtime)
          })
      })
    },
    initialInputForm () {
      let vm = this
      vm.selectValue = false
      vm.departmentId = vm.userProfile.department
      vm.selected = []
      vm.inputForm = {
        '.key': null,
        authUser: vm.userId,
        employeeName: (vm._.find(vm.authUserOptions, {'value': vm.userId}) ? vm._.find(vm.authUserOptions, {'value': vm.userId}).label : 'Employee Name'),
        comments: null,
        totalHours: 0,
        createdBy: vm.userId,
        createdOn: new Date(),
        absenceType: '',
        requestDate: {
          from: vm.minDate,
          to: date.addToDate(vm.minDate, {hours: 1})
        },
        modifiedBy: vm.userId,
        modifiedOn: new Date(),
        approved: false,
        approvedBy: null,
        yearOfPosting: parseInt(date.formatDate(Date.now(), 'YYYY')),
        category: 'leaveDocument',
        filename: '',
        fileExt: '',
        filetype: '',
        rawFile: null
      }
    },
    async openAddForm () {
      let vm = this
      vm.subHeading = vm.$t('Add')
      vm.formAction = 'add'
      vm.initialInputForm()
      let sum = await vm.overtimeResult()
      console.log(sum)
      vm.processFilter()
      vm.formModal = true
    },
    openUpdateFrom () {
      let vm = this
      vm.departmentId = vm.userProfile.department
      vm.subHeading = vm.$t('update')
      vm.selectValue = true
      vm.formAction = 'update'
      let row = vm.selected[0]
      vm.inputForm = {
        id: row['.key'],
        employeeName: row['employeeName'],
        authUser: row['authUser'],
        absenceType: row['absenceType'],
        requestDate: {
          from: row['requestDate'].from,
          to: row['requestDate'].to
        },
        comments: row['comments'],
        approved: row['approved'],
        approvedBy: row['approvedBy'],
        yearOfPosting: row['yearOfPosting'],
        totalHours: row['totalHours'],
        category: row['category'],
        filename: row['filename'],
        fileExt: row['fileExt'],
        createdBy: row['createdBy'],
        createdOn: row['createdOn'],
        modifiedBy: row['modifiedBy'],
        modifiedOn: row['modifiedOn']
      }
      vm.formModal = true
    },
    async addForm () {
      let vm = this
      vm.inputForm.approvedBy = (vm._.find(vm.authUserOptions, {'value': vm.userId}) ? vm._.find(vm.authUserOptions, {'value': vm.userId}).data.reportTo : vm.userId)
      // validate
      console.log(vm.$v.inputForm)
      if (vm.$v.inputForm.$invalid) {
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'nagetive',
          icon: 'error_outline'
        })
      } else {
        // set record
        vm.$firestore.leaveRequestDB.add({
          authUser: vm.userId,
          absenceType: vm.inputForm.absenceType,
          requestDate: {
            from: vm.inputForm.requestDate.from,
            to: vm.inputForm.requestDate.to
          },
          comments: vm.inputForm.comments,
          approved: vm.inputForm.approved,
          employeeName: vm.inputForm.employeeName,
          approvedBy: vm.inputForm.approvedBy,
          yearOfPosting: vm.inputForm.yearOfPosting,
          dateSeq: date.formatDate(vm.inputForm.requestDate.from, 'YYYYMMDD'),
          totalHours: vm.inputForm.totalHours,
          category: vm.inputForm.category,
          filename: vm.inputForm.filename,
          fileExt: vm.inputForm.fileExt,
          createdBy: vm.inputForm.createdBy,
          createdOn: vm.inputForm.createdOn,
          modifiedBy: vm.inputForm.modifiedBy,
          modifiedOn: vm.inputForm.modifiedOn
        }).then(function () {
          vm.formModal = false
          vm.collectionSize = vm.collectionSize + 1
          // clear input
          vm.initialInputForm()
          // notify
          vm.$q.notify({
            message: vm.$t('Document successfully written!'),
            type: 'positive',
            icon: 'info'
          })
        // error
        }).catch(function (error) {
          vm.$q.notify(vm.$t('submitError'))
          console.error('Error writing document: ', error)
        })
        vm.leaveData = await vm.leaveDatatable()
      }
    },
    async deleteRow () {
      let vm = this
      await vm.deleteProcess(vm.selected, vm.$firestore.leaveRequestDB)
      vm.selected = []
      vm.leaveData = await vm.leaveDatatable()
    },
    deleteCheck (selected) {
      return selected[0].approved
    },
    isHoliday (requestDate, year) {
      if (requestDate) {
        let vm = this
        let result = false
        if (!isNaN(requestDate)) {
          let DOW = parseInt(date.formatDate(new Date(new Date(year, 0).setDate(requestDate)), 'd'))
          if (vm._.includes(vm.publicHolidays, requestDate)) {
            result = true
          } else {
            if (!vm._.includes(vm.workingDays, DOW)) {
              result = true
            }
          }
        }
        return result
      }
    },
    workingHour () {
      return new Promise(resolve => {
        let result = (this._.find(this.initialSetupList, ['code', '_WRKH']) ? parseInt(this._.find(this.initialSetupList, ['code', '_WRKH']).value) : 8)
        return resolve(result)
      })
    },
    calcTotalHours () {
      let vm = this
      let totalLeaveHours = 0
      if (vm.leaveOneday()) {
        totalLeaveHours = Math.floor(parseInt(date.getDateDiff(this.inputForm.requestDate.to, this.inputForm.requestDate.from, 'minutes')) / 60)
      } else {
        // let diff = date.getDateDiff(vm.inputForm.requestDate.to, vm.inputForm.requestDate.from, 'days') + 1
        let start = parseInt(date.formatDate(vm.inputForm.requestDate.from, 'DDD'))
        let end = parseInt(date.formatDate(vm.inputForm.requestDate.to, 'DDD'))
        let year = parseInt(date.formatDate(vm.inputForm.requestDate.to, 'YYYY'))
        let dateRange = []
        while (start <= end) {
          dateRange.push(start)
          start += 1
        }
        dateRange.forEach(function (d) {
          // let requestDate = date.addToDate(vm.inputForm.requestDate.from, { days: d })
          if (vm._.find(vm.leaveData, {'value': vm.inputForm.absenceType}).includeHoliday) {
            totalLeaveHours += vm.workingHourData
          } else {
            if (!vm.isHoliday(d, year)) {
              totalLeaveHours += vm.workingHourData
            }
          }
        })
      }
      return totalLeaveHours
    },
    checkMinDate () {
      if ((date.getDateDiff(this.inputForm.requestDate.to, this.inputForm.requestDate.from, 'hours')) > 0) {
      } else {
        this.inputForm.requestDate.to = this.inputForm.requestDate.from
      }
    },
    checkRemaining (remaining) {
      let result = false
      if (remaining === 0) {
        result = true
      }
      return result
    },
    selectFrom (props) {
      let vm = this
      vm.selectValue = true
      vm.inputForm.absenceType = props.value
      vm.inputForm.requestDate.from = date.addToDate(new Date(), { days: props.requestLeadTime })
      vm.inputForm.requestDate.to = date.addToDate(new Date(), { days: props.requestLeadTime })
    },
    // getPublicHolidays
    getPublicHolidays (d) {
      return new Promise(resolve => {
        let vm = this
        let result = []
        let startYear = parseInt(date.formatDate(d, 'YYYY'))
        let endYear = parseInt(date.formatDate(d, 'YYYY')) + 1
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
    getMinMaxDate () {
      let vm = this
      if (vm.inputForm.absenceType) {
        let days = vm._.find(vm.absenceTypeOptions, {'value': vm.inputForm.absenceType}).data.requestLeadTime
        if (vm.inputForm.id) {
          vm.minDate = new Date(vm.inputForm.requestDate.from)
          vm.minDate.setDate(vm.minDate.getDate() + days)
        } else {
          vm.minDate = new Date()
          vm.minDate.setDate(vm.minDate.getDate() + days)
        }
      }
    },
    getWorkingDays () {
      return new Promise(resolve => {
        let result = []
        this.$database.collection('company').limit(1).get().then(function (docs) {
          docs.forEach(function (doc) {
            if (doc.data().sunday.workingDay) {
              result.push(0)
            }
            if (doc.data().monday.workingDay) {
              result.push(1)
            }
            if (doc.data().tuesday.workingDay) {
              result.push(2)
            }
            if (doc.data().wednesday.workingDay) {
              result.push(3)
            }
            if (doc.data().thursday.workingDay) {
              result.push(4)
            }
            if (doc.data().friday.workingDay) {
              result.push(5)
            }
            if (doc.data().saturday.workingDay) {
              result.push(6)
            }
          })
          return resolve(result)
        })
      })
    },
    getCompensationType () {
      let vm = this
      let cps = vm._.find(vm.departmentOptions, {id: vm.userProfile.department})
      let result = false
      if (cps) {
        result = cps.data.otCompensate
      }
      return result
    },
    getEndDate () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('workSchedule').where('authUser', '==', vm.userId).orderBy('end', 'desc').limit(1)
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              vm.maxDate = new Date(doc.data().end)
            })
            return resolve(result)
          })
      })
    },
    // getYear
    getYear (d) {
      return d.getFullYear()
    },
    // getMonth
    getMonth (d) {
      return d.getMonth() + 1
    },
    // getDate
    getDate (d) {
      return d.getDate()
    },
    leaveOneday () {
      let result = true
      if ((date.getDateDiff(this.inputForm.requestDate.to, this.inputForm.requestDate.from, 'days')) > 0) {
        result = false
      }
      return result
    },
    leaveOtUsed () {
      let vm = this
      let result = true
      let OTId = vm._.find(this.absenceTypeOptions, ['code', 'OTC']).value
      return new Promise(resolve => {
        vm.$firestore.leaveRequest.where('absenceType', '==', OTId).where('approved', '==', true).get()
          .then(docs => {
            docs.forEach(doc => {
              result.push({
                id: doc.id,
                data: doc.data(),
                totalHours: doc.data().totalHours
              })
            })
            let leaveUse = vm._.sumBy(result, 'totalHours')
            return resolve(leaveUse)
          })
      })
    },
    leaveDatatable () {
      let vm = this
      let result = []
      let entitlement = ''
      let entitlementHour = 0
      let leaveTaken = ''
      let leaveTakenHour = 0
      let remaining = ''
      let remainingHour = 0
      return new Promise(resolve => {
        vm.$database.collection('leaveAndAbsenceTypes')
          .orderBy('index')
          .get()
          .then(docs => {
            docs.forEach(doc => {
              leaveTaken = `${(vm._.sumBy(vm._.filter(vm.leaveRequest, {'absenceType': doc.id}), 'totalHours') / vm.workingHourData)}  ${vm.$t('days')} (${(vm._.sumBy(vm._.filter(vm.leaveRequest, {'absenceType': doc.id}), 'totalHours'))} ${vm.$t('Hours')})`
              leaveTakenHour = vm._.sumBy(vm._.filter(vm.leaveRequest, {'absenceType': doc.id}), 'totalHours')
              if (doc.data().code === 'OTC') {
                entitlement = `${(vm.overtimeUsed / vm.workingHourData)} ${vm.$t('days')}  (${vm.overtimeUsed} ${vm.$t('hours')})`
                entitlementHour = vm.overtimeUsed
              } else {
                entitlement = `${doc.data().entitlement} ${vm.$t('days')} (${(doc.data().entitlement * vm.workingHourData)} ${vm.$t('hours')})`
                entitlementHour = (doc.data().entitlement * vm.workingHourData)
              }
              remaining = `${((entitlementHour - leaveTakenHour) / vm.workingHourData)} ${vm.$t('days')} (${(entitlementHour - leaveTakenHour)} ${vm.$t('hours')})`
              remainingHour = (entitlementHour - leaveTakenHour)
              result.push({
                value: doc.id,
                index: doc.data().index,
                label: doc.data().description,
                data: doc.data(),
                code: doc.data().code,
                description: doc.data().description,
                requestLeadTime: doc.data().requestLeadTime,
                entitlement: entitlement,
                leaveTaken: leaveTaken,
                includeHoliday: doc.data().includeHoliday,
                remaining: remaining,
                entitlementHour: entitlementHour,
                leaveTakenHour: leaveTakenHour,
                remainingHour: remainingHour
              })
            })
            return resolve(result)
          }).catch(err => {
            console.log(err)
          })
        return resolve(result)
      })
    },
    leaveDataResult () {
      let vm = this
      let entitlement = {}
      let leaveTaken = {}
      let includeHoliday = {}
      return new Promise(resolve => {
        vm.absenceTypeOptions.forEach(el => {
          if (el.code === 'OTC') {
            entitlement[el.value] = vm.overtimeUsed
          } else {
            let pick = vm._.pick(el, ['value', 'data'])
            entitlement[pick.value] = pick.data.numberOfDays
          }
          // leaveTaken
          leaveTaken[el.value] = ((vm._.sumBy(vm._.filter(vm.leaveRequest, {'absenceType': el.value}), 'totalHours')) / this.workingHourData)
          includeHoliday[el.value] = el.includeHoliday
        })
        let result = {
          entitlement,
          leaveTaken,
          includeHoliday
        }
        return resolve(result)
      })
    },
    loadingStatus () {
      let vm = this
      vm.$firestore.leaveRequest.get().then(snapshot => {
        vm.collectionSize = snapshot.size
        vm.loading = false
      })
    },
    // isPublicHoliday
    isPublicHoliday (d, format) {
      let result = ''
      this.publicHolidays.forEach(ph => {
        if (date.formatDate(ph.date, format) === d) {
          result = `${ph.title}`
        }
      })
      return result
    },
    // queryWs
    queryWs () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        let fromDate = new Date(vm.inputForm.requestDate.from)
        let toDate = date.addToDate(new Date(vm.inputForm.requestDate.from), { days: 13 })
        let currentDateStart = date.buildDate({
          year: vm.getYear(fromDate),
          month: vm.getMonth(fromDate),
          date: vm.getDate(fromDate),
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        })
        let currentDateEnd = date.buildDate({
          year: vm.getYear(toDate),
          month: vm.getMonth(toDate),
          date: vm.getDate(toDate),
          hours: 23,
          minutes: 59,
          seconds: 59,
          milliseconds: 59
        })
        // workSchedule
        vm.$database.collection('workSchedule')
          .where('start', '>=', currentDateStart)
          .where('start', '<=', currentDateEnd)
          .where('authUser', '==', vm.userId)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              result.push({
                id: doc.id,
                authUser: doc.data().authUser,
                start: doc.data().start,
                end: doc.data().end,
                note: doc.data().note,
                type: doc.data().type
              })
            })
            // point to return
            return resolve(result)
          })
      })
    },
    // processFilter
    async processFilter () {
      let vm = this
      let result = []
      // publicHolidays
      let phs = []
      if (!vm.publicHolidays.length) {
        vm.publicHolidays = await this.getPublicHolidays(vm.inputForm.requestDate.from)
      }
      for (let i of vm._.range(14)) {
        let d = date.formatDate(date.addToDate(vm.inputForm.requestDate.from, {days: i}), 'YYYYMMDD')
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
      // query from roster
      let rosterRec = await vm.queryWs()
      // day1
      let d1 = date.formatDate(vm.filterByDate, 'YYYYMMDD')
      let day1 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d1)
      })
      // day2
      let d2 = date.formatDate(date.addToDate(vm.filterByDate, {days: 1}), 'YYYYMMDD')
      let day2 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d2)
      })
      // day3
      let d3 = date.formatDate(date.addToDate(vm.filterByDate, {days: 2}), 'YYYYMMDD')
      let day3 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d3)
      })
      // day4
      let d4 = date.formatDate(date.addToDate(vm.filterByDate, {days: 3}), 'YYYYMMDD')
      let day4 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d4)
      })
      // day5
      let d5 = date.formatDate(date.addToDate(vm.filterByDate, {days: 4}), 'YYYYMMDD')
      let day5 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d5)
      })
      // day6
      let d6 = date.formatDate(date.addToDate(vm.filterByDate, {days: 5}), 'YYYYMMDD')
      let day6 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d6)
      })
      // day7
      let d7 = date.formatDate(date.addToDate(vm.filterByDate, {days: 6}), 'YYYYMMDD')
      let day7 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d7)
      })
      // day8
      let d8 = date.formatDate(date.addToDate(vm.filterByDate, {days: 7}), 'YYYYMMDD')
      let day8 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d8)
      })
      // day9
      let d9 = date.formatDate(date.addToDate(vm.filterByDate, {days: 8}), 'YYYYMMDD')
      let day9 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d9)
      })
      // day10
      let d10 = date.formatDate(date.addToDate(vm.filterByDate, {days: 9}), 'YYYYMMDD')
      let day10 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d10)
      })
      // day11
      let d11 = date.formatDate(date.addToDate(vm.filterByDate, {days: 10}), 'YYYYMMDD')
      let day11 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d11)
      })
      // day12
      let d12 = date.formatDate(date.addToDate(vm.filterByDate, {days: 11}), 'YYYYMMDD')
      let day12 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d12)
      })
      // day13
      let d13 = date.formatDate(date.addToDate(vm.filterByDate, {days: 12}), 'YYYYMMDD')
      let day13 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d13)
      })
      // day14
      let d14 = date.formatDate(date.addToDate(vm.filterByDate, {days: 13}), 'YYYYMMDD')
      let day14 = vm._.filter(rosterRec, function (o) {
        return (date.formatDate(o.start, 'YYYYMMDD') === d14)
      })
      // push new result
      result.push({
        type: 'ws',
        day1: day1,
        day2: day2,
        day3: day3,
        day4: day4,
        day5: day5,
        day6: day6,
        day7: day7,
        day8: day8,
        day9: day9,
        day10: day10,
        day11: day11,
        day12: day12,
        day13: day13,
        day14: day14
      })
      vm.myRoster = result
    }
  },
  // created
  created: async function () {
    [this.collectionSize, this.loading] = await this.loadingState(this.$firestore.leaveRequest)
    this.$q.loading.show()
    this.overtimeUsed = await this.overtimeResult()
    this.workingHourData = await this.workingHour()
    this.publicHolidays = await this.getPublicHolidays(this.inputForm.requestDate.from)
    this.workingDays = await this.getWorkingDays()
    this.compensation = await this.getCompensationType()
    this.leaveData = await this.leaveDatatable()
    this.$q.loading.hide()
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ]),
    columns3 () {
      let result = [
        { name: 'day1', label: this.day1, field: 'day1', sortable: false, align: 'center' },
        { name: 'day2', label: this.day2, field: 'day2', sortable: false, align: 'center' },
        { name: 'day3', label: this.day3, field: 'day3', sortable: false, align: 'center' },
        { name: 'day4', label: this.day4, field: 'day4', sortable: false, align: 'center' },
        { name: 'day5', label: this.day5, field: 'day5', sortable: false, align: 'center' },
        { name: 'day6', label: this.day6, field: 'day6', sortable: false, align: 'center' },
        { name: 'day7', label: this.day7, field: 'day7', sortable: false, align: 'center' },
        { name: 'day8', label: this.day8, field: 'day8', sortable: false, align: 'center' },
        { name: 'day9', label: this.day9, field: 'day9', sortable: false, align: 'center' },
        { name: 'day10', label: this.day10, field: 'day10', sortable: false, align: 'center' },
        { name: 'day11', label: this.day11, field: 'day11', sortable: false, align: 'center' },
        { name: 'day12', label: this.day12, field: 'day12', sortable: false, align: 'center' },
        { name: 'day13', label: this.day13, field: 'day13', sortable: false, align: 'center' },
        { name: 'day14', label: this.day14, field: 'day14', sortable: false, align: 'center' }
      ]
      return result
    },
    // day1 - day14 format
    filterByDate () {
      return this.inputForm.requestDate.from
    },
    day1 () {
      let result = date.formatDate(this.inputForm.requestDate.from, 'dd DD-MMM-YYYY')
      return result
    },
    day2 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 1 }), 'dd DD-MMM-YYYY')
      return result
    },
    day3 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 2 }), 'dd DD-MMM-YYYY')
      return result
    },
    day4 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 3 }), 'dd DD-MMM-YYYY')
      return result
    },
    day5 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 4 }), 'dd DD-MMM-YYYY')
      return result
    },
    day6 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 5 }), 'dd DD-MMM-YYYY')
      return result
    },
    day7 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 6 }), 'dd DD-MMM-YYYY')
      return result
    },
    day8 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 7 }), 'dd DD-MMM-YYYY')
      return result
    },
    day9 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 8 }), 'dd DD-MMM-YYYY')
      return result
    },
    day10 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 9 }), 'dd DD-MMM-YYYY')
      return result
    },
    day11 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 10 }), 'dd DD-MMM-YYYY')
      return result
    },
    day12 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 11 }), 'dd DD-MMM-YYYY')
      return result
    },
    day13 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 12 }), 'dd DD-MMM-YYYY')
      return result
    },
    day14 () {
      let result = date.formatDate(date.addToDate(this.filterByDate, { days: 13 }), 'dd DD-MMM-YYYY')
      return result
    }
  },
  watch: {
    filterByYear () {
      this.$binding('leaveRequest', this.$database.collection('leaveRequest').where('authUser', '==', this.userId).where('yearOfPosting', '==', this.filterByYear))
    },
    'inputForm.requestDate.from' () {
      let vm = this
      try {
        if (vm.inputForm.requestDate.to) {
          vm.inputForm.totalHours = vm.calcTotalHours()
          this.checkMinDate()
          this.processFilter()
        } else {
        }
      } catch (error) {
        console.log(error)
      }
    },
    'inputForm.requestDate.to' () {
      let vm = this
      try {
        if (vm.inputForm.requestDate.from) {
          vm.inputForm.totalHours = vm.calcTotalHours()
        }
      } catch (error) {
        console.log(error)
      }
    },
    'inputForm.absenceType' () {
      if (this.inputForm.absenceType) {
        this.getMinMaxDate()
        this.getEndDate()
        this.remainingHour = this._.find(this.leaveData, {'value': this.inputForm.absenceType}) ? this._.find(this.leaveData, {'value': this.inputForm.absenceType}).remainingHour : 0
      }
    }
  }
}
</script>

<style>
</style>
