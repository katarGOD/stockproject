<template>
  <q-page>
    <!-- pageTitle -->
    <p class="q-headline">{{ $t('My team') }}</p>

    <!-- ///////// -->
    <!-- inputForm -->
    <!-- ///////// -->
    <div class="row justify-center gutter-lg">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12">
        <div style="text-decoration: underline"> {{ $t('sender') }} : {{ userAccount.email }}</div>
        <div class="q-display-1 text-weight-thin">
          {{ $t('Invitation email') }}
        </div>
        <!-- email list -->
        <div style="padding-bottom: 20px;">
          <div
            v-for="(person, index) in listOfInvitee"
            v-bind:key="person"
          >
            <q-field
              :error="$v.listOfInvitee.$each[index].email.$error"
              :error-label="!$v.listOfInvitee.$each[index].email.required? $t('Required.') : !$v.listOfInvitee.$each[index].email.email ? $t('notValidEmail') : ''"
            >
              <q-input
                type="text"
                :float-label="$t('Email')+ ' ' + (index + 1)"
                v-model="person.email"
                @keyup="$v.listOfInvitee.$each[index].email.$touch"
              />
            </q-field>
          </div>
          <div>
            <q-btn icon="add" @click="listOfInvitee.push({email: ''})">
              {{ $t('Add') }}
            </q-btn>
            <q-btn icon="remove" v-if="listOfInvitee.length > 1" @click="listOfInvitee.pop()">
              {{ $t('Remove') }}
            </q-btn>
          </div>
          <div class="form-group" v-bind:class="{ 'form-group--error': $v.listOfInvitee.$error }"></div>
        </div>

        <!-- message box -->
        <q-editor v-model="messageBox" />
        <!-- submit -->
        <q-btn icon="mail_outline" @click="sendInvitation">
          {{ $t('Send') }}
        </q-btn>

      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12">
        <div
          v-for="friend in myTeam"
          v-bind:key="friend"
          class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"
        >
          <q-card>
            <q-card-title>
              {{ friend.firstName }} {{ friend.lastName }}
              <span slot="subtitle">{{ friend.email }}</span>
              <div slot="right" class="row items-center">{{ friend.nickName }}</div>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <img :src="friend.photo" class="responsive"/>
              <div>
                <q-toggle v-model="friend.active" color="primary" :label="$t('Status')" left-label disable/>
                </div>
            </q-card-main>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import publicVars from 'src/components/shared/publicVars'
export default {
  name: 'myTeam',
  // mixins
  mixins: [
    publicVars
  ],
  // data
  data () {
    return {
      inviter: '',
      listOfInvitee: [{email: ''}],
      existsList: [],
      messageBox: `
        Dear friend,<br>
        I send this invitation for you to join our team.<br>
        I would be happy with your participation in the events.<br>
        <br>
        Thank you
        `
    }
  },
  // validations
  validations: {
    inviter: required,
    listOfInvitee: {
      required,
      $each: {
        email: {
          required,
          email
        }
      }
    }
  },
  // firestore
  firestore () {
    return {
      myTeam: this.$database.collection('authUser').where('reportTo', '==', this.userId).orderBy('firstName')
    }
  },
  // methods
  methods: {
    // isUserExists
    isUserExists (email) {
      return new Promise(resolve => {
        let vm = this
        this.$binding('authUser', this.$database.collection('authUser').where('email', '==', email))
          .then((users) => {
            users.forEach(function (user) {
              vm.existsList.push(email)
            })
            return resolve(true)
          })
      })
    },
    // sendInvitation
    async sendInvitation () {
      let vm = this
      if (!vm.$v.$invalid) {
        let promiseArray = []
        vm.listOfInvitee.forEach(function (person) {
          promiseArray.push(vm.isUserExists(person.email))
        })
        // execute promise all
        Promise.all(promiseArray)
          .then(() => {
            let result = vm._.difference(vm._.map(vm.listOfInvitee, 'email'), vm.existsList)
            // data
            let data = {
              ownerId: vm.inviter,
              invitedList: result,
              invitationMessage: vm.messageBox
            }
            if (result.length) {
              // Performs invitation
              vm.$http.post(`https://cors-anywhere.herokuapp.com/https://us-central1-proofspelling.cloudfunctions.net/invite`, data)
                .then(response => {
                  vm.$q.notify(`vm.$t('user') ${vm._.concat(vm.existsList)} ${vm.$t('alreadyExists')}`)
                  vm.$q.notify(`${vm.$t('completedSentInvitation')}`)
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              vm.$q.notify(`${vm.$t('user')} ${vm._.concat(vm.existsList)} ${vm.$t('alreadyExists')}`)
            }
            // clear form
            vm.clearlistOfInvitee()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        vm.$q.notify({
          message: vm.$t('Form validation error'),
          type: 'nagetive',
          icon: 'error_outline'
        })
      }
    },
    // clearlistOfInvitee
    clearlistOfInvitee () {
      let vm = this
      vm._.forEach(vm.listOfInvitee, function (value, key) {
        if (key > 0) {
          vm.listOfInvitee.pop()
        }
      })
    }
  },
  // created
  created: function () {
    this.inviter = this.userId
  },
  // computed
  computed: {
    ...mapGetters([
      'userId',
      'userAccount'
    ])
  }
}
</script>
