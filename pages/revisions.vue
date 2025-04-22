<template>
    <div class="w-full h-full flex max-h-override p-3 _p pb0i mw1000p shadow">
        <div v-if="false" class="messages flex flex-col">
            <div class="container flex flex-col p-4 pb-4">
              <h2 class="text-2xl leading-7 font-semibold mb-4">Revisions</h2>
              <p class="mb-3">Changes that you want reflected in future convesrsations will appear here.</p>
              <input class="w-full rounded-sm p-3 sm:rounded-lg mb-4" v-model="messageFilter" type="text" placeholder="Filter revisions by username" name="">
            </div>
            <hr>
            <div class="container flex flex-col">
                <div v-for="(status, s) in filteredStatuses()"
                    class="width-full message message-2 flex flex-col gap-2 p-4 pt-2 pb-2 cursor-pointer" :class="{'selected-open-conversation': status.id == showConversation}" @click="openConversation(s, status)">
                    <span class="width-full flex items-center gap-2">
                        <!-- <p>{{status}}</p> -->
                        <!-- <p>{{status.username}}</p> -->
                        <svg v-if="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="starred-icon"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="starred-icon"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                        <span class="flex-1">{{otherUsername(status)}}</span>
                        <!-- <span class="flex-1">{{status.correctionMessage}}</span> -->
                        <!-- <p class="text-base message-date-text">{{status.correctionMessage}}</p> -->
                        <!-- <p class="text-base message-date-text">{{formatDate(status.messages.data[0].created_time)}}</p> -->
                    </span>
                    <span class="width-full flex items-center gap-2">
                        <span class="text-sm pl-2 pr-2 rounded-sm sm:rounded-2xl message-tag platform-tag">Instagram</span>
                        <!-- <span class="text-sm pl-2 pr-2 rounded-sm sm:rounded-2xl message-tag">{{status.new_messages_count}} message{{status.new_messages_count === 1 ? '' : 's'}}</span> -->
                    </span>
                    <span class="width-full flex items-center gap-2 mt-1 message-text">
                        <!-- <p>{{otherUsername(status)}}</p> -->
                        <p>{{status.correctionMessage}}</p>
                    </span>
                </div>
            </div>
        </div>


        <div class="message flex-1 flex flex-col h-full">
            <div class="message-top w-full p-4 flex items-center gap-2">
                <span class="flex flex-col gap-1">
                    <!-- <svg v-if="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="starred-icon"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="starred-icon"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                    <span class="flex-1"></span> -->
                    <!-- <p>{{otherUsername()}}</p> -->
                    <!-- <h2>Revisions</h2> -->
                  <h2 class="text-2xl leading-7 font-semibold mb-1">Revisions</h2>
                  <p>Give guidance to ChatSetter AI</p>
                </span>
                <span class="flex items-center gap-1 text-sm pl-2 pr-2 rounded-sm sm:rounded-2xl message-tag platform-tag">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="micro-icon"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg> -->
                    <!-- <p>
                        Revisions
                    </p> -->
                </span>
                <span class="flex-1"></span>
                <!-- <p class="text-sm">Auto-Respond</p>
                <label class="switch">
                    <input type="checkbox" :checked="showConversation ? $store.state.messages.autoRespondSettings[showConversation] : false" @change="toggleAutoRespondActive($event)">
                    <span class="slider round"></span>
                </label> -->
                <!-- <p class="bar text-2xl leading-none flex items-center">|</p> -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="detail-expand-icon cursor-pointer"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg> -->
            </div>
            <div ref="message-content" id="message-content" class="message-content flex-1 flex flex-col w-full p-4 gap-5">
                <span class="one-message flex flex-col my-message" v-if="tempMessage">
                    <p class="message-from-username mb-1 text-base">{{$store.state.instagram.username}}</p>
                    <p class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{tempMessage.message[0].text}}</p>
                    <p class="message-time-sent mt-1 text-sm">{{formatTime(new Date().getTime())}}</p>
                </span>


                 <div v-for="(status, s) in filteredStatuses()"">
                  <div class="one-message flex flex-col relative gap-2" v-for="(_message, _m) in filteredStatuses2()[s]" :class="{'my-message': _message.role == 'user', 'customer-message': _message.role == 'assistant'}">
                    <p class="message-from-username mb-1 text-base flex items-center gap-2">
                      <span v-if="_message.role == 'user'" class="flex-1"></span>
                      <span>
                        You
                      </span>
                    </p>
                    <p class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{filteredStatuses()[s].correctionMessage}}</p>
                    <p class="message-from-username mb-1 text-base flex items-center gap-2">
                      <span v-if="_message.role == 'user'" class="flex-1"></span>
                      <span class="w-full flex flex-end items-center revision-title">
                        AI
                      </span>
                    </p>
                    <p class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md platform-tag">{{_message.text}}</p>
                  </div>
                 </div>

                <!-- {{_message.role == 'user' ? 'You' : 'AI'}} -->

                <!-- <div class="one-message flex flex-col relative first-revision-message text-sm pl-2 pr-2 rounded-sm sm:rounded-2xl message-tag platform-tag">
                  <p class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{filteredStatuses()[showConversation].correctionMessage}}</p>
                </div>
                <p class="message-from-username text-base flex items-center gap-2 font-bold revision-title">
                  <span>
                    {{'Revision:'}}
                  </span>
                </p>
                <div class="one-message flex flex-col relative" v-for="(_message, _m) in filteredStatuses()[showConversation].messages.data" :class="{'my-message': $store.state.instagram.username == _message.from.username, 'customer-message': $store.state.instagram.username !== _message.from.username}">
                  <p class="message-from-username mb-1 text-base flex items-center gap-2">
                    <span v-if="$store.state.instagram.username == _message.from.username" class="flex-1"></span>
                    <span>
                      {{_message.from.username}}
                    </span>
                  </p>
                  <p class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{_message.message}}</p>
                  <p class="message-time-sent mt-1 text-sm">{{formatTime(_message.created_time)}}</p>
                </div> -->


                <!-- new messages -->
                <!-- <div class="one-message flex flex-col relative" v-for="(_message, _m) in filteredStatuses()[showConversation].messages.data" :class="{'my-message': $store.state.instagram.username == _message.from.username, 'customer-message': $store.state.instagram.username !== _message.from.username}">
                  <div v-show="_m === showingCorrectionMenu" class="correction-menu flex flex-col gap-2 rounded-xl p-4 absolute">
                    <div class="flex items-center">
                      <p class="flex-1">Make a correction</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="close-correction-menu cursor-pointer" @click="showCorrectionMenu(false)"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </div>
                    <textarea type="text" placeholder="Describe the correction you want to make" v-model="newCorrectionInput" name="" class="correction-input rounded-lg p-2">
                    </textarea>
                    <button class="correciton-button p-2 rounded-xl" @click="addCorrectionInput">Ok</button>
                  </div>
                  <p class="message-from-username mb-1 text-base flex items-center gap-2">
                    <span v-if="$store.state.instagram.username == _message.from.username" class="flex-1"></span>
                    <span>
                      {{_message.from.username}}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="message-correction-menu-icon cursor-pointer" @click="showCorrectionMenu(_m)"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
                  </p>
                  <p class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{_message.message}}</p>
                  <p class="message-time-sent mt-1 text-sm">{{formatTime(_message.created_time)}}</p>
                </div> -->



            </div>
            <form autocomplete="off" @submit.prevent="addCorrectionInput($event)" class="message-input w-full p-4 flex items-center gap-2">
                <input class="w-full rounded-sm p-3 sm:rounded-lg" type="text" placeholder="Type a revision" name="" v-model="newMessage[0].text">
                <button class="send-button rounded-sm p-2 sm:rounded-xl small-button-4 flex gap-2 items-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="small-icon-4"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                    <p class="send-button-text text-base">Send</p>
                </button>
            </form>
        </div>


        <!-- <div v-if="showConversation" class="detail-expand">
        </div> -->
        <!-- <div v-if="!showConversation" class="message flex-1 flex flex-col h-full p-4">
            <p>Select a revision</p>
        </div> -->
    </div>
</template>

<script>
export default {
  name: 'MessagesPage',
  layout: 'app',
  data () {
    return {
      defaultMessage: [
        {type: 'text', text: ''}
      ],
      messageFilter: '',
      showConversation: false,
      detailExpand: false,
      newMessage: [
        {type: 'text', text: ''}
      ],
      tempMessage: false,
      showingCorrectionMenu: false,
      newCorrectionInput: ''
    }
  },
  computed: {
    conversations () {
        return this.$store.state.messages.getConversations
    }
  },
  methods: {
    // addCorrectionInput () {
    //   let newInput = {
    //     messageIndex: this.showingCorrectionMenu,
    //     correctionMessage: this.newCorrectionInput,
    //     otherUserInstagramId: this.showConversation
    //   }
    //   this.$store.dispatch('messages/addNewCorrection', newInput).then((res) => {
    //     console.log('back')
    //     this.showingCorrectionMenu = false
    //     this.newCorrectionInput = ''
    //   })
    // },
    showCorrectionMenu (m) {
      console.log('showCorrectionMenu', m)
      this.showingCorrectionMenu = m
    },
    filteredStatuses () {
      let statuses = this.$store.state.messages.revisions
      return statuses
      // console.log('statuses', statuses)
      // return statuses.filter(v => {
        // return v.other_user_instagram_username.indexOf(this.messageFilter) > -1
      // })
      // statuses.filter(())
    },
    filteredStatuses2 () {
      let statuses = this.$store.state.messages.revisionsAfter
      // console.log('statuses2', statuses)
      return statuses
      // console.log('statuses', statuses)
      // return statuses.filter(v => {
        // return v.other_user_instagram_username.indexOf(this.messageFilter) > -1
      // })
      // statuses.filter(())
    },
    toggleAutoRespondActive (event) {
      let checked = event.target.checked
      this.$store.dispatch('messages/toggleAutoRespondActive', {
          conversationId: this.showConversation,
          active: checked
      }).then((res) => {})
    },
    sendMessage (event) {
      event.preventDefault()
      console.log('sendMessage', this.showConversation, this.newMessage)

      this.tempMessage = {
        created_time: new Date(),
        from: {
          id: "",
          username: ""
        },
        id: "temporaryId",
        message: this.newMessage,
        to: {
          data: [
            {
              id: "",
              username: ""
            }
          ]
        }
      }

      console.log('this.otherUid()')
      console.log(this.otherUid())

      this.$store.dispatch('messages/sendInstagramMessageRevision', {
        revisionId: this.showConversation,
        message: this.newMessage
      }).then((res) => {
        this.tempMessage = false
        this.$forceUpdate()
      })

      this.newMessage = this.defaultMessage
    },
    addCorrectionInput (event) {
      event.preventDefault()
      console.log('........')
      // let messages = []
      // if (this.showConversation && this.$store.state.messages.conversations[this.showConversation]) {
      //       messages = this.$store.state.messages.conversations[this.showConversation].messages
      //   }
      let newInput = {
        messageIndex: false,
        correctionMessage: this.newMessage[0].text,
        otherUserInstagramId: false,
        otherUserInstagramUsername: false,
        messages: {}
      }
      console.log('newInput', newInput)
      this.$store.dispatch('messages/addNewCorrection', newInput).then((res) => {
        // this.showingCorrectionMenu = false
        // this.newMessage = this.defaultMessage
        this.$store.dispatch('messages/getMyRevisions', {}).then((res) => {
          // scroll to bottom of revision
          let box = document.getElementById('message-content')
          console.log('box', box)
          box.scrollTo(0, box.scrollHeight)
        })
        // let box = document.getElementById('message-content')
        // box.scrollTo(0, box.scrollHeight)
      })
      this.newMessage = this.defaultMessage
    },
    otherUsername (_status) {
        let status = _status || this.filteredStatuses()[this.showConversation]
        // if (!status) {
        //     if (this.showConversation && this.$store.state.messages.conversations[this.showConversation]) {
        //         status = this.$store.state.messages.conversations[this.showConversation]
        //     }
        // }
        return status.otherUserInstagramUsername
        if (status) {
            let myUsername = this.$store.state.instagram.username
            let participants = status.participants.data

            for (let p in participants) {
                let participant = participants[p]
                if (participant.username !== myUsername) {
                    return participant.username
                }
            }
        }
        return '-'
    },
    otherUid (_status) {
        let status = _status
        if (!status) {
            if (this.showConversation && this.$store.state.messages.conversations[this.showConversation]) {
                status = this.$store.state.messages.conversations[this.showConversation]
            }
        }
        if (status) {
            let myUsername = this.$store.state.instagram.username
            let participants = status.participants.data

            for (let p in participants) {
                let participant = participants[p]
                if (participant.username !== myUsername) {
                    return participant.id
                }
            }
        }
        return '-'
    },
    openConversation (s, status) {
      let conversationUser = status.id
      console.log('s, status', s, status)
      this.showConversation = s
      // console.log('s', s)
      // console.log('status', status)
      // let getDetails = () => {
      //   this.$store.dispatch('messages/getConversation', {conversationId: conversationUser}).then((res) => {
      //     console.log('res', res)
      //     if (res == 'ok') {
      //       this.$forceUpdate()
      //     }
      //   })
      // }
      // getDetails()
      // this.showCorrectionMenu(false)
      // this.watchForUpdates()
    },
    // watchForUpdates () {
    //     let uid = this.$store.state.auth.uid
    //     if (uid) {
    //       console.log('watching')
    //       console.log('instagram_conversations_messages/' + (uid || 'f') + '/' + this.showConversation)
    //       let getDetails = () => {
    //         this.$store.dispatch('messages/getConversation', {conversationId: this.showConversation}).then((res) => {
    //           console.log('res', res)
    //           if (res == 'ok') {
    //             this.$forceUpdate()
    //           }
    //         })
    //       }

    //       this.$fire.database.ref('instagram_conversations_messages/' + (uid || 'f') + '/' + this.showConversation).on('value', (snap) => {
    //           let snapVal = snap.val()
    //           console.log('snapVal', snapVal)
    //           this.$forceUpdate()
    //           getDetails()
    //       })
    //     } else {
    //         setTimeout(() => {
    //             this.watchForUpdates()
    //         }, 500)
    //     }
    // },
    formatTime (date) {
        var dt = new Date(date)
            return `${
            (dt.getHours() % 12).toString()}:${
            dt.getMinutes().toString().padStart(2, '0')}`+(dt.getHours() > 11 ? 'pm' : 'am')
    },
    formatDate (date) {
        var dt = new Date(date)
            return `${
            (dt.getMonth()+1).toString().padStart(2, '0')}/${
            dt.getDate().toString().padStart(2, '0')}/${
            dt.getFullYear().toString().padStart(4, '0')}`
    }
  },
  mounted () {
    this.$store.dispatch('messages/getMyRevisions', {}).then((res) => {
      // scroll to bottom of revision
      let box = document.getElementById('message-content')
      console.log('box', box)
      box.scrollTo(0, box.scrollHeight)
    })
  }
}
</script>

<style lang="scss">
hr {
    background-color: #ddd;
    border-color: #ddd;
}
.messages {
    max-width: 380px;
    /*max-height: calc(100vh - 50px);*/
    overflow-y: auto;
    border-right: 1px solid #ddd;
}
.message {
    /*max-height: calc(100vh - 50px);*/
    overflow-y: hidden;
    border-bottom: 1px solid #eee;
}
.message-2 {
    &:hover {
        background-color: #f5f5f5;
    }
}
.selected-open-conversation {
    background-color: #f5f5f5;
}
.message-content {
    overflow-y: auto;
}
.small-button {
    font-size: 14px;
}
.small-icon {
    width: 16px;
}
.starred-icon {
    width: 20px;
    fill: #aaa;
}
.message-date-text {
    color: #555;
}
.message-text {
    color: #444;
    white-space: nowrap; overflow: hidden;
    display: block;
    text-overflow: ellipsis;
}
.message-tag {
    background-color: #eee;
    color: #333;
}
.platform-tag {
    background-color: #e2d9ff !important;
    color: #5a38c9;
}
.max-h-override {
    /*max-height: calc(100vh - 50px);*/
}
.micro-icon {
    width: 10px;
    height: 10px;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.delete-icon {
    height: 20px;
    color: #ccc;
    fill: #ccc;
}
.detail-expand-icon {
    height: 20px;
    color: #ccc;
    fill: #ccc;
}
.bar {
    color: #ccc;
    transform: translateY(2px);
}
.message-input {
    border-top: 1px solid #eee;
}
.small-button-4 {
    background-color: #2196F3;
    outline: #2196F3;
    border: 1px solid #2196F3;
}
.small-button-5 {
    background-color: #2196F3;
    outline: #2196F3;
    width: 100%;
    max-width: 180px;
    align-self: flex-end;
}
.small-button-6 {
    background-color: #fff;
    outline: #000;
    border: 1px solid #000;
    width: 100%;
    max-width: 180px;
    align-self: flex-end;
}
.small-icon-4 {
    height: 16px;
    width: 16px;
    color: #fff;
    fill: #fff;
}
.small-icon-5 {
    height: 18px;
    width: 18px;
    color: #fff;
    fill: #fff;
}
.small-icon-6 {
    height: 18px;
    width: 18px;
    color: #000;
    fill: #000;
}
.send-button {
    height: 48px;
}
.send-button-2 {
    height: 48px;
}
.send-button-text {
    color: #fff;
}
.my-message > .message-from-username, .my-message > .message-time-sent {
    text-align: right;
}
.customer-message > .message-from-username, .customer-message > .message-time-sent {
    /*text-align: right;*/
}
.my-message > .message-bubble {
    background-color: #f6f6f6;
    margin-left: 40px;
    align-self: flex-end;
}
.customer-message > .message-bubble {
    background-color: #ebebeb;
    margin-right: 40px;
}
.message-correction-menu-icon {
  width: 20px;
  height: 20px;
}
.correction-menu {
  top: 0;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
}
.correction-input {
  width: 300px;
}
.correction-button {

}
.close-correction-menu {
  width: 20px;
  /*align-self: flex-end;*/
}
.first-revision-message {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.revision-title {
  color: #5a38c9;
  margin-bottom: -12px;
}
._p {
  background-color: #fcfbf7;
}
.pb0i {
  padding-bottom: 0 !important;
}
.mw1000p {
  max-width: 1000px;
  width: 1000px;
}
</style>