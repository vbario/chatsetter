<template>
    <div class="w-full h-full flex max-h-override p-3 _p pb0i mw1000p shadow">
        <div class="message flex-1 flex flex-col h-full">
            <div class="message-top w-full p-4 flex items-center gap-2">
                <span class="flex flex-col gap-1">
                  <h2 class="text-2xl leading-7 font-semibold mb-1">Instant Feedback</h2>
                  <p>Give feedback to your ChatSetter to instantly improve performance</p>
                </span>
                <span class="flex items-center gap-1 text-sm pl-2 pr-2 rounded-sm sm:rounded-2xl message-tag platform-tag">

                </span>
                <span class="flex-1"></span>
            </div>
            <div ref="message-content" id="message-content" class="message-content flex-1 flex flex-col w-full p-4 gap-5">
              <div v-for="(status, s) in filteredStatuses()"">
                <div class="one-message flex relative gap-2 relative" v-for="(_message, _m) in filteredStatuses2()[s]" :class="{'my-message': _message.role == 'user', 'customer-message': _message.role == 'assistant'}">
                  <p class="message-bubble_ __168 text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">
                    {{filteredStatuses()[s].correctionMessage}}
                  </p>
                  <p class="message-bubble_ text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md platform-tag">{{_message.text}}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bubble-menu-ellipsis" @click="showFeedbackDeleteMenu(s)"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
                  <p class="flex flex-col popup-feedback-menu shadow rounded sm:rounded" v-if="(showingFeedbackDeleteMenu === s)">
                    <span class="flex justify-center items-center gap-2" @click="deleteFeedback()">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="delete-feedback-icon"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
                      Delete feedback
                    </span>
                    <span class="w-full flex justify-between items-center gap-2" @click="showFeedbackDeleteMenu(false)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="delete-feedback-icon invisible"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
                      Cancel
                    </span>
                  </p>
                </div>
              </div>
              <span class="one-message flex flex-col my-message" v-if="addingNewCorrection">
                  <p class="message-bubble_ __168 text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">Processing</p>
                  <p class="message-bubble_ text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md platform-tag"></p>
              </span>
            </div>
            <form autocomplete="off" @submit.prevent="addCorrectionInput($event)" class="message-input w-full p-4 flex items-center gap-2">
                <input v-if="Object.keys(filteredStatuses()).length < 10" class="w-full rounded-sm p-3 sm:rounded-lg" type="text" placeholder="Type your feedback here" name="" v-model="newMessage[0].text">
                <input v-else class="w-full rounded-sm p-3 sm:rounded-lg disabled-input" type="text" disabled placeholder="Maximum feedback reached (10). Remove an entry to add more feedback." name="" v-model="newMessage[0].text">
                <button class="send-button rounded-sm p-2 sm:rounded-xl small-button-4 flex gap-2 items-center mr-2" :class="{'disabled-button': !(Object.keys(filteredStatuses()).length < 10)}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="small-icon-4"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                    <p class="send-button-text text-base">Send</p>
                </button>
            </form>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Revisions',
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
      showingFeedbackDeleteMenu: false,
      newCorrectionInput: '',
      addingNewCorrection: false
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
    deleteFeedback (m) {
      console.log('deleteFeedback')
      let entryKey = this.showingFeedbackDeleteMenu
      this.$store.dispatch('messages/deleteFeedbackEntry', {
          entryKey: this.showingFeedbackDeleteMenu
      }).then((res) => {
        this.getMyRevisions()
        this.showingFeedbackDeleteMenu = false
      })
    },
    showCorrectionMenu (m) {
      console.log('showCorrectionMenu', m)
      this.showingCorrectionMenu = m
    },
    showFeedbackDeleteMenu (m) {
      console.log('showFeedbackDeleteMenu', m)
      this.showingFeedbackDeleteMenu = m
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
      this.addingNewCorrection = true
      this.$store.dispatch('messages/addNewCorrection', newInput).then((res) => {
        // this.showingCorrectionMenu = false
        // this.newMessage = this.defaultMessage
        this.$store.dispatch('messages/getMyRevisions', {}).then((res) => {
          // scroll to bottom of revision
          this.addingNewCorrection = false
          this.$forceUpdate()
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
    },
    getMyRevisions () {
      this.$store.dispatch('messages/getMyRevisions', {}).then((res) => {
        // scroll to bottom of revision
        let box = document.getElementById('message-content')
        console.log('box', box)
        box.scrollTo(0, box.scrollHeight)
      })
    }
  },
  mounted () {
    this.getMyRevisions()
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
.my-message > .message-bubble_ {
    background-color: #f6f6f6;
    margin-left: 40px;
    align-self: flex-end;
}
.customer-message > .message-bubble_ {
    background-color: #ebebeb;
    /*margin-right: 40px;*/
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
.bubble-menu-ellipsis {
  position: absolute;
  width: 12px;
  top: 8px;
  right: -16px;
  cursor: pointer;
}
.__168 {
  min-width: 168px;
}
.popup-feedback-menu {
  padding: 10px;
  display: block;
  position: absolute;
  top: 4px;
  right: -16px;
  border: 1px solid #333;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}
.delete-feedback-icon {
  width: 14px;
  cursor: pointer;
}
.invisible {
  opacity: 0;
}
.disabled-button {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}
.disabled-input {
  border-color: #ccc !important;
  outline: 1px solid #ccc !important;
}
</style>