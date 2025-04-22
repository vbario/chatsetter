export const state = () => ({
  statuses: [],
  conversations: {},
  autoRespondSettings: {},
  filterList: '',
  noRespondList: '',
  revisions: {},
  revisionsAfter: {},
  followUpMode: false,
  commentReplyMode: false
})

export const getters = {
  getConversations(state) {
    return state.conversations
  }
}

export const mutations = {
  setMessagesStatuses(state, statuses) {
    console.log('setting statuses', statuses)
    state.statuses = statuses
  },
  setFilterList(state, filterList) {
    console.log('setting filter list', filterList)
    state.filterList = filterList
  },
  setNoRespondList(state, noRespondList) {
    console.log('setting noRespondList', noRespondList)
    state.noRespondList = noRespondList
  },
  setRevisions(state, revisions) {
    console.log('setting revisions', revisions)
    state.revisions = revisions
  },
  setRevisionsAfter(state, revisionsAfter) {
    console.log('setting revisionsAfter', revisionsAfter)
    state.revisionsAfter = revisionsAfter
  },
  setFollowUpMode(state, followUpMode) {
    console.log('setting followUpMode', followUpMode)
    state.followUpMode = followUpMode
  },
  setCommentReplyMode(state, commentReplyMode) {
    console.log('setting commentReplyMode', commentReplyMode)
    state.commentReplyMode = commentReplyMode
  },
  setConversation(state, data) {
    let conversationId = data.conversationId
    let conversation = data.conversation
    console.log('state.conversations', state.conversations)
    console.log('setConversation', conversationId, conversation)
    state.conversations[conversationId] = conversation
  },
  addMessageToConversation(state, data) {
    let conversationId = data.conversationId
    let message = data.message[0].text

    // let sender_id = data.sender_id
    // let sender_iusername = data.sender_username
    // let receiver_id = data.sender_id
    // let receiver_iusername = data.sender_username

    console.log('addMessageToConversation', conversationId, message)

    let temporaryMessage = {
      created_time: new Date(),
      from: {
        id: "17841406167739845",
        username: "cup.wise"
      },
      id: "temporaryId",
      message,
      to: {
        data: [
          {
            id: "939938238239440",
            username: "vladimirrobots"
          }
        ]
      }
    }

    state.conversations[conversationId].unshift(temporaryMessage)
  },
  setAutoResponseStatus(state, data) {
    console.log('setAutoResponseStatus', data)
    state.autoRespondSettings = data
  }
}

export const actions = {
  async getCommentReplies({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid || 'f'
      let path = 'customCommentReplies/' + uid
      let _steps = await this.$fire.database.ref(path).once('value')
      let steps = _steps.val()
      console.log('STEPS', steps)
      return resolve(steps || [])
    })
  },
  async saveCommentReplies({ state }, item) {
    console.log('item', item)
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let steps = item.steps
    let path = 'customCommentReplies/' + uid
    await this.$fire.database.ref(path).set(steps)
  },
  async getFollowupMessages({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid || 'f'
      let path = 'customFollowupMessages/' + uid
      let _steps = await this.$fire.database.ref(path).once('value')
      let steps = _steps.val()
      console.log('STEPS', steps)
      return resolve(steps || [])
    })
  },
  async saveFollowupMessages({ state }, item) {
    console.log('item', item)
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let steps = item.steps
    let path = 'customFollowupMessages/' + uid
    await this.$fire.database.ref(path).set(steps)
  },
  async toggleAutoRespondActive({ state }, item) {
    console.log('item', item)
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let otherUserInstagramId = item.conversationId || 'f'
    let status = item.active || false
    let path = 'autoRespondSettings/' + uid + '/' + otherUserInstagramId
    await this.$fire.database.ref(path).set(status)

    let active_conversation_path = 'active_conversations/' + uid + '/' + otherUserInstagramId
    let _current_conversation = await this.$fire.database.ref(active_conversation_path).once('value')
    let current_conversation = _current_conversation.val()

    let my_sequences_path = 'sequences/' + uid
    let _sequences = await this.$fire.database.ref(my_sequences_path).once('value')
    let sequences = _sequences.val()

    let defaultSequence = sequences[0] ? sequences[0].id : false
    
    let object = {
      sequenceId: current_conversation ? current_conversation.sequenceId : defaultSequence,
      status: current_conversation ? current_conversation.status : 'active',
      task: current_conversation ? current_conversation.task : 0
    }
    await this.$fire.database.ref(active_conversation_path).update(object)

    this.dispatch('messages/getAutoRespondStatus', {})
  },
  async updateFilterList({ state }, item) {
    console.log('item', item)
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'messageFilter/' + uid
    await this.$fire.database.ref(path).set(item)
    this.commit('messages/setFilterList', item)
  },
  async updateNoRespondList({ state }, item) {
    console.log('item', item)
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'noRespondList/' + uid
    await this.$fire.database.ref(path).set(item)
    this.commit('messages/setNoRespondList', item)
  },
  async getAutoRespondStatus({ state }, item) {
    console.log('item', item)
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'autoRespondSettings/' + uid
    let _status = await this.$fire.database.ref(path).once('value')
    let status = _status.val()
    this.commit('messages/setAutoResponseStatus', status)
  },
  async toggleFollowUpMode({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'followUpMode/' + uid
    await this.$fire.database.ref(path).set(!state.followUpMode)
    this.commit('messages/setFollowUpMode', !state.followUpMode)
  },
  async getFollowUpMode({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'followUpMode/' + uid
    let _status = await this.$fire.database.ref(path).once('value')
    let status = _status.val()
    console.log('followUpMode', status)
    this.commit('messages/setFollowUpMode', status)
  },
  async toggleCommentReplyMode({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'commentReplyMode/' + uid
    await this.$fire.database.ref(path).set(!state.commentReplyMode)
    this.commit('messages/setCommentReplyMode', !state.commentReplyMode)
  },
  async getCommentReplyMode({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'commentReplyMode/' + uid
    let _status = await this.$fire.database.ref(path).once('value')
    let status = _status.val()
    this.commit('messages/setCommentReplyMode', status)
  },
  async deleteFeedbackEntry({ state }, item) {
    return new Promise(async (resolve, reject) => {
    let uid = this.$fire.auth.currentUser.uid || 'f'
      console.log('deleteFeedbackEntry', item.entryKey)

      await this.$fire.database.ref('conversationCorrections/' + uid + '/' + (item.entryKey || 'f')).set(null)
      await this.$fire.database.ref('conversationCorrectionsAfter/' + uid + '/' + (item.entryKey || 'f')).set(null)

      return resolve('ok')
    })
  },
  async addNewCorrection({ state }, item) {
    return new Promise(async (resolve, reject) => {
      console.log('item', item)
      let uid = this.$fire.auth.currentUser.uid || 'f'
      let path = 'conversationCorrections/' + uid
      let v = await this.$fire.database.ref(path).push(item)
      // console.log('1', v.val())
      console.log('2', v.key)
      // make the AI generate a response

      let revisionId = v.key
      let receiver_instagram_id = item.otherUserInstagramId

      let sendData = {
        uid,
        revisionId,
        receiver_instagram_id,
        override: true
      }

      console.log('sending data', sendData)

      this.dispatch('messages/sendInstagramMessageRevision', sendData).then((res) => {
        return resolve('ok')
      })
      console.log('done')
      // this.commit('messages/setAutoResponseStatus', status)
    })
  },
  async getMyRevisions({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    return new Promise(async (resolve, reject) => {
      let _statuses = await this.$fire.database.ref('instagram_conversations_statuses/' + uid).once('value')
      let statuses = _statuses.val() || {}
      let _revisions = await this.$fire.database.ref('conversationCorrections/' + uid).once('value')
      let revisions = _revisions.val() || {}
      let _revisionsAfter = await this.$fire.database.ref('conversationCorrectionsAfter/' + uid).once('value')
      let revisionsAfter = _revisionsAfter.val() || {}

      let revisionsAfter2 = {}
      for (let c in revisionsAfter) {
        revisionsAfter2[c] = [revisionsAfter[c][0]]
      }

      // console.log('got getMyRevisions', getMyRevisions)

      this.commit('messages/setRevisions', revisions)
      this.commit('messages/setRevisionsAfter', revisionsAfter2)

      return resolve('ok')
    })
  },
  async getMyRecentMessages({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let getMyRecentMessages = this.$fire.functions.httpsCallable('getMyRecentMessages')
      getMyRecentMessages(item).then(async (result) => {
          console.log('getMyRecentMessages result', result)
          return resolve(result)
      })
    })
  },
  async getConversation({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let user = this.$fire.auth.currentUser.uid
      let uid = this.$fire.auth.currentUser.uid || 'f'
      let conversationId = item.conversationId || 'f'
      let pageUp = item.pageUp

      console.log('uid, conversationId, pageUp')
      console.log(uid, conversationId, pageUp)

      // if pageUp, get more messages
      if (pageUp) {
        let getMoreMessages = this.$fire.functions.httpsCallable('getMoreMessages')
        getMoreMessages(item).then(async (result) => {
            console.log('getMoreMessages result', result)
            return resolve('ok')
        })
      } else {
        let path = 'instagram_conversations_messages/' + uid + '/' + conversationId
        let _conversation = await this.$fire.database.ref(path).once('value')
        let conversation = _conversation.val() || {} 
        this.commit('messages/setConversation', {conversationId, conversation})
        return resolve('ok')
      }
    })
  },
  async searchForUser({ state }, data) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let searchForUser = this.$fire.functions.httpsCallable('searchForUser')
      searchForUser(data).then(async (result) => {
          console.log('searchForUser result', result)
          if (result.data && result.data.username) {
            return resolve(result)
          } else {
            return reject('fail')
          }
      })
    })
  },
  async sendInstagramMessage({ state }, data) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let conversationId = data.conversationId
    let receiver_instagram_id = data.receiver_instagram_id
    let message = data.message

    //optimistically unshift message to state.conversations[conversationId]
    // this.commit('messages/addMessageToConversation', {conversationId, message})
    // console.log('****', state.conversations[conversationId])

    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let sendInstagramMessage = this.$fire.functions.httpsCallable('sendInstagramMessage')
      sendInstagramMessage({conversationId, message, receiver_instagram_id}).then(async (result) => {
          console.log('sendInstagramMessage result', result)
          if (result.data && (result.data.result === 'ok')) {
            // on success add message to conversation or reload conversation altogether
            // update conversation with convesationId

            let path = 'instagram_conversations_messages/' + uid + '/' + conversationId
            let _conversation = await this.$fire.database.ref(path).once('value')
            let conversation = _conversation.val() || {} 

            console.log('conversation >>', conversationId, conversation)
            this.commit('messages/setConversation', {conversationId, conversation})
            return resolve('sendInstagramMessage success!')
          } else {
            return reject('sendInstagramMessage fail!')
          }
      })
    })
  },
  async catchUp({ state }, data) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let conversationId = data.conversationId
    let receiver_instagram_id = data.receiver_instagram_id
    let message = data.message

    //optimistically unshift message to state.conversations[conversationId]
    // this.commit('messages/addMessageToConversation', {conversationId, message})
    // console.log('****', state.conversations[conversationId])

    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let catchUp = this.$fire.functions.httpsCallable('catchUp')
      catchUp({}).then(async (result) => {
          console.log('catchUp result', result)
          if (result.data && (result.data.result === 'ok')) {
            // on success add message to conversation or reload conversation altogether
            // update conversation with convesationId

            let path = 'instagram_conversations_messages/' + uid + '/' + conversationId
            let _conversation = await this.$fire.database.ref(path).once('value')
            let conversation = _conversation.val() || {} 

            console.log('conversation >>', conversationId, conversation)
            this.commit('messages/setConversation', {conversationId, conversation})
            return resolve('catchUp success!')
          } else {
            return reject('catchUp fail!')
          }
      })
    })
  },
  async startFollowups({ state }, data) {
    let uid = data.uid
    let conversationId = data.conversationId
    let receiver_instagram_id = data.receiver_instagram_id

    let _data = {
      uid,
      conversationId,
      receiver_instagram_id
    }
    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let startFollowups = this.$fire.functions.httpsCallable('startFollowups')
      startFollowups(_data).then(async (result) => {
        console.log('startFollowups result', result)
        return resolve(result)
      })
    })
  },
  async sendOneMessageAsAdmin({ state }, data) {
    let uid = data.uid
    let conversationId = data.conversationId
    let receiver_instagram_id = data.receiver_instagram_id

    let _data = {
      uid,
      conversationId,
      receiver_instagram_id
    }
    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let sendOneMessageAsAdmin = this.$fire.functions.httpsCallable('sendOneMessageAsAdmin')
      sendOneMessageAsAdmin(_data).then(async (result) => {
        console.log('sendOneMessageAsAdmin result', result)
        return resolve(result)
      })
    })
  },
  async sendOneOffMessage({ state }, data) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let conversationId = data.conversationId
    let receiver_instagram_id = data.receiver_instagram_id
    let message = data.message

    //optimistically unshift message to state.conversations[conversationId]
    // this.commit('messages/addMessageToConversation', {conversationId, message})
    // console.log('****', state.conversations[conversationId])

    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let sendOneOffMessage = this.$fire.functions.httpsCallable('sendOneOffMessage')
      sendOneOffMessage({conversationId, message, receiver_instagram_id}).then(async (result) => {
          console.log('sendOneOffMessage result', result)
          if (result.data && (result.data.result === 'ok')) {
            // on success add message to conversation or reload conversation altogether
            // update conversation with convesationId

            let path = 'instagram_conversations_messages/' + uid + '/' + conversationId
            let _conversation = await this.$fire.database.ref(path).once('value')
            let conversation = _conversation.val() || {} 

            console.log('conversation >>', conversationId, conversation)
            this.commit('messages/setConversation', {conversationId, conversation})
            return resolve('sendOneOffMessage success!')
          } else {
            return reject('sendOneOffMessage fail!')
          }
      })
    })
  },
  async sendInstagramMessageRevision({ state }, data) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let revisionId = data.revisionId
    let receiver_instagram_id = data.receiver_instagram_id
    let message = data.message
    let override = data.override

    //optimistically unshift message to state.conversations[conversationId]
    // this.commit('messages/addMessageToConversation', {conversationId, message})
    // console.log('****', state.conversations[conversationId])

    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let sendInstagramMessageRevision = this.$fire.functions.httpsCallable('sendInstagramMessageRevision')
      sendInstagramMessageRevision({revisionId, message, receiver_instagram_id, override}).then(async (result) => {
          console.log('sendInstagramMessageRevision result', result)
          if (result.data && (result.data.result === 'ok')) {

            // update revision conversations
            let _revisionsAfter = await this.$fire.database.ref('conversationCorrectionsAfter/' + uid).once('value')
            let revisionsAfter = _revisionsAfter.val() || {}

            let revisionsAfter2 = {}

            for (let r in revisionsAfter) {
              let s = revisionsAfter[r]
              s = s.reverse()
              revisionsAfter2[r] = s
            }

            this.commit('messages/setRevisionsAfter', revisionsAfter2)

            // on success add message to conversation or reload conversation altogether
            // update conversation with convesationId

            // let path = 'instagram_conversations_messages/' + uid + '/' + conversationId
            // let _conversation = await this.$fire.database.ref(path).once('value')
            // let conversation = _conversation.val() || {} 

            // console.log('conversation >>', conversationId, conversation)
            // this.commit('messages/setConversation', {conversationId, conversation})


            return resolve('sendInstagramMessageRevision success!')
          } else {
            return reject('sendInstagramMessageRevision fail!')
          }
      })
    })
  }
}