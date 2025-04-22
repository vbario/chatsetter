export const state = () => ({
  demoAIChatID: false,
  aiConversation: {},
  playgroundAIChatID: false,
  playgroundConversation: {},
  reverseAIChatID: false,
  reverseConversation: {},
  conversionType: 'book-sales-calls',
  commentTriggerKeywords: ''
  // showAIPlayground: true
})

export const mutations = {
  setConversationId(state, demoAIChatID) {
    state.demoAIChatID = demoAIChatID
  },
  setConversionType(state, conversionType) {
    state.conversionType = conversionType
  },
  setPlaygroundConversationId(state, demoAIChatID) {
    state.playgroundAIChatID = demoAIChatID
  },
  setReverseConversationId(state, demoAIChatID) {
    console.log('setting chat id', demoAIChatID)
    state.reverseAIChatID = demoAIChatID
  },
  setConversation(state, aiConversation) {
    state.aiConversation = aiConversation
  },
  setPlaygroundConversation(state, aiConversation) {
    state.playgroundConversation = aiConversation
  },
  setReverseConversation(state, aiConversation) {
    state.reverseConversation = aiConversation
  },
  setCommentTriggerKeywords(state, commentTriggerKeywords) {
    state.commentTriggerKeywords = commentTriggerKeywords
  },
  optimisticallyAddMessage(state, message) {
    // create random ID
    console.log('optimisticallyAddMessage', message)
    let randomId = Math.floor(Math.random() * 1000000000000000).toString()
    // state.aiConversation[randomId] = { role: 'user', content: [{type: 'text', test: message}] }
    let aiConversation = state.aiConversation
    // aiConversation['test'] = { role: 'user', content: [{type: 'text', text: message}] }
    // state.aiConversation = aiConversation
    state.aiConversation = {...state.aiConversation, [randomId]: { role: 'user', content: [{type: 'text', text: message}] }}
    setTimeout(() => {
        let el = document.getElementById('demo-chat-box')
        console.log('el', el, el.scrollHeight)
        el.scrollTo(0, el.scrollHeight)
    }, 100)
  },
  optimisticallyAddPlaygroundMessage(state, message) {
    // create random ID
    console.log('optimisticallyAddPlaygroundMessage', message)
    let randomId = Math.floor(Math.random() * 1000000000000000).toString()
    let aiConversation = state.playgroundConversation
    state.playgroundConversation = {...state.playgroundConversation, [randomId]: { role: 'user', content: [{type: 'text', text: message}] }}
    setTimeout(() => {
        let el = document.getElementById('playground-chat-box')
        console.log('el', el, el.scrollHeight)
        el.scrollTo(0, el.scrollHeight)
    }, 100)
  },
  optimisticallyAddReverseMessage(state, message) {
    // create random ID
    console.log('optimisticallyAddReverseMessage', message)
    let randomId = Math.floor(Math.random() * 1000000000000000).toString()
    // let aiConversation = state.playgroundConversation
    state.reverseConversation = {...state.reverseConversation, [randomId]: { role: 'user', content: [{type: 'text', text: message}] }}
    setTimeout(() => {
        let el = document.getElementById('reverse-chat-box')
        console.log('el', el, el.scrollHeight)
        el.scrollTo(0, el.scrollHeight)
    }, 100)
  },
  // closeAIPlayground(state, todo) {
  //   state.showAIPlayground = false
  // }
}

export const actions = {
  async getCommentKeywordTriggers({ state }, data) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let _commentTriggerKeywords = await this.$fire.database.ref('/commentTriggerKeywords/' + uid).once('value')
    let commentTriggerKeywords = _commentTriggerKeywords.val()
    console.log('commentTriggerKeywords', commentTriggerKeywords)
    if (commentTriggerKeywords) {
      this.commit('ai/setCommentTriggerKeywords', commentTriggerKeywords)
    }
  },
  async setCommentKeywordTriggers({ state }, data) {
    let commentTriggerKeywords = data
    let uid = this.$fire.auth.currentUser.uid || 'f'
    console.log('commentTriggerKeywords', commentTriggerKeywords, uid)

    // update
    await this.$fire.database.ref('/commentTriggerKeywords/' + uid).set(commentTriggerKeywords)
    this.commit('ai/setCommentKeywordTriggers', commentTriggerKeywords)
  },
  async getConversionType({ state }, data) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let _conversionType = await this.$fire.database.ref('/converstionType/' + uid).once('value')
    let conversionType = _conversionType.val()
    console.log('conversionType', conversionType)
    if (conversionType) {
      this.commit('ai/setConversionType', conversionType)
    }
  },
  async setConversionType1({ state }, data) {
    let conversionType = data.conversionType
    let uid = this.$fire.auth.currentUser.uid || 'f'
    console.log('conversionType', conversionType)
    await this.$fire.database.ref('/converstionType/' + uid).set(conversionType)
    this.commit('ai/setConversionType', conversionType)
  },
  async setConversionType2({ state }, data) {
    let commentTriggerKeywords = data.commentKeywordTriggers
    let uid = this.$fire.auth.currentUser.uid || 'f'
    console.log('commentTriggerKeywords', commentTriggerKeywords)
    await this.$fire.database.ref('/commentTriggerKeywords/' + uid).set(commentTriggerKeywords)
    this.commit('ai/setCommentTriggerKeywords', commentTriggerKeywords)
  },
  async sendDemoChatMessage({ state }, data) {
    let demoConversationId = data.demoConversationId
    let message = data.message

    // optimistically set message as sent
    this.commit('ai/optimisticallyAddMessage', message)

    let sendDemoChatMessage = this.$fire.functions.httpsCallable('sendDemoChatMessage')
    sendDemoChatMessage({
      demoConversationId: state.demoAIChatID || demoConversationId,
      message
    }).then(async (result) => {
      let conversationId = result.data.conversationId || 'f'
      this.commit('ai/setConversationId', conversationId)
      let _aiConversation = await this.$fire.database.ref('demo_ai_chats/' + conversationId).once('value')
      let aiConversation = _aiConversation.val()
      this.commit('ai/setConversation', aiConversation)
      setTimeout(() => {
        let el = document.getElementById('demo-chat-box')
        console.log('el', el, el.scrollHeight)
        el.scrollTo(0, el.scrollHeight)
      }, 100)
    }).catch(async (error) => {
      console.log('Error in sendDemoChatMessage', error)
      // mark the failed message as unsent (the message that was optimistically set as sent above)
    })

    // if (!demoConversationId), new conversation will be started
    // this.commit('ui/closeAIPlayground', {})
  },
  async sendPlaygroundChatMessage({ state }, data) {
    let demoConversationId = data.demoConversationId
    let message = data.message

    // optimistically set message as sent
    this.commit('ai/optimisticallyAddPlaygroundMessage', message)

    let sendPlaygroundChatMessage = this.$fire.functions.httpsCallable('sendPlaygroundChatMessage')
    sendPlaygroundChatMessage({
      demoConversationId: state.playgroundAIChatID || demoConversationId,
      message
    }).then(async (result) => {
      let conversationId = result.data.conversationId || 'f'
      this.commit('ai/setPlaygroundConversationId', conversationId)
      let _aiConversation = await this.$fire.database.ref('playground_ai_chats/' + conversationId).once('value')
      let aiConversation = _aiConversation.val()

      console.log('playground conversation')
      console.log(aiConversation)

      this.commit('ai/setPlaygroundConversation', aiConversation)
      setTimeout(() => {
        let el = document.getElementById('playground-chat-box')
        console.log('el', el, el.scrollHeight)
        el.scrollTo(0, el.scrollHeight)
      }, 100)
    }).catch(async (error) => {
      console.log('Error in sendPlaygroundChatMessage', error)
      // mark the failed message as unsent (the message that was optimistically set as sent above)
    })

    // if (!demoConversationId), new conversation will be started
    // this.commit('ui/closeAIPlayground', {})
  },
  async clearStyleChat({ state }, data) {
    this.commit('ai/setReverseConversation', {})
    this.commit('ai/setReverseConversationId', false)
  },
  async sendReverseChatMessage({ state }, data) {
    let reverseAIChatID = data.reverseAIChatID
    let message = data.message
    let style = data.style

    // optimistically set message as sent
    this.commit('ai/optimisticallyAddReverseMessage', message)

    let sendReverseChatMessage = this.$fire.functions.httpsCallable('sendReverseChatMessage')
    sendReverseChatMessage({
      reverseAIChatID: state.reverseAIChatID || reverseAIChatID,
      message,
      style
    }).then(async (result) => {
      console.log('result', result)
      let conversationId = result.data.conversationId || 'f'
      this.commit('ai/setReverseConversationId', conversationId)
      let _aiConversation = await this.$fire.database.ref('reverse_ai_chats/' + conversationId).once('value')
      let aiConversation = _aiConversation.val()

      console.log('reverse conversation')
      console.log(conversationId, aiConversation)

      this.commit('ai/setReverseConversation', aiConversation)
      setTimeout(() => {
        let el = document.getElementById('reverse-chat-box')
        console.log('el', el, el.scrollHeight)
        el.scrollTo(0, el.scrollHeight)
      }, 100)
    }).catch(async (error) => {
      console.log('Error in sendReverseChatMessage', error)
    })
  },
  // async closeAIPlayground({ state }, data) {
  //   this.commit('ui/closeAIPlayground', {})
  // },
  // async openAIPlayground({ state }, data) {
  //   this.commit('ui/openAIPlayground', {})
  // },
}