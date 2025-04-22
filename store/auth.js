export const state = () => ({
  uid: 0,
  email: '',
  emailVerified: '',
  hasPlan: false,
  admin_data: {},
  admin_comment_data: {},
  admin_datab: {},
  instagram_details: {},
  loaded: false,
  hasCid: false
})

export const mutations = {
  setUid(state, uid) {
    state.uid = uid
  },
  setHasPlan(state, hasPlan) {
    state.hasPlan = hasPlan
  },
  setAdminData(state, admin_data) {
    state.admin_data = admin_data
  },
  setAdminCommentData(state, admin_comment_data) {
    state.admin_comment_data = admin_comment_data
  },
  setAdminDataB(state, admin_data) {
    state.admin_datab = admin_data
  },
  setHasCid(state, hasCid) {
    state.hasCid = hasCid
  },
  setInstagramDetails(state, instagram_details) {
    state.instagram_details = instagram_details
  },
  setLoaded(state, loaded) {
    state.loaded = loaded
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, {authUser, claims}) => {
    if (authUser) {
      const {uid, email, emailVerified} = authUser
      state.uid = uid
      state.email = email
      state.emailVerified = emailVerified
    } else {
      state.uid = 0
      state.email = ''
      state.emailVerified = ''
    }
  },
}

export const getters = {
  uid (state) {
    return state.uid
  }
}

export const actions = {
  async handleAuth({ state }, item) {
    let user = item.authUser || false
    if (user) {
      let uid = user.uid || 'f'
      let _accountStatus = await this.$fire.database.ref('accountStatus/' + uid).once('value')
      let accountStatus = _accountStatus.val() || {}

      this.dispatch('ai/getConversionType', {})
      this.dispatch('ai/getCommentKeywordTriggers', {})
      this.dispatch('messages/getFollowUpMode', {})
      this.dispatch('messages/getCommentReplyMode', {})

       console.log('uid', uid)

      // let _hasPlan = await this.$fire.database.ref('hasPlan/' + uid).once('value')
      // let hasPlan = _hasPlan.val()

      let _hasCid = await this.$fire.database.ref('cids/' + uid + '/exists').once('value')
      let hasCid = _hasCid.val()

      let _statuses = await this.$fire.database.ref('instagram_conversations_statuses/' + uid).once('value')
      let statuses = _statuses.val() || {}
      let _revisions = await this.$fire.database.ref('conversationCorrections/' + uid).once('value')
      let revisions = _revisions.val() || {}
      let _revisionsAfter = await this.$fire.database.ref('conversationCorrectionsAfter/' + uid).once('value')
      let revisionsAfter = _revisionsAfter.val() || {}

      let revisionsAfter2 = {}

      for (let r in revisionsAfter) {
        let s = revisionsAfter[r]
        s = s.reverse()
        revisionsAfter2[r] = s
      }

      // this.commit('auth/setHasPlan', hasPlan)
      this.commit('auth/setHasCid', hasCid)
      this.commit('messages/setRevisions', revisions)
      this.commit('messages/setRevisionsAfter', revisionsAfter2)

      let statusesArray = Object.keys(statuses).map((v, i) => {
        console.log('v, i', v, i)
        return {
          ...statuses[v],
          id: v
        }
      })

      await this.dispatch('identity/getMemory')
      await this.dispatch('identity/getIdentity')

      statusesArray.sort((a, b) => {
        let timeA = (new Date(a.messages.data[0].created_time)).getTime()
        let timeB = (new Date(b.messages.data[0].created_time)).getTime()
        return timeB - timeA
      })

      let _myInstagramInfo = await this.$fire.database.ref('instagram_details/' + uid).once('value')
      let myInstagramInfo = _myInstagramInfo.val() || {}
      let _messageFilter = await this.$fire.database.ref('messageFilter/' + uid).once('value')
      let messageFilter = _messageFilter.val ? (_messageFilter.val() || '') : ''
      let _noRespondList = await this.$fire.database.ref('noRespondList/' + uid).once('value')
      let noRespondList = _noRespondList.val ? (_noRespondList.val() || '') : ''
      this.commit('messages/setMessagesStatuses', statusesArray)
      this.commit('instagram/setMyInstagramId', myInstagramInfo.id)
      this.commit('instagram/setMyInstagramUsername', myInstagramInfo.username)
      this.commit('messages/setFilterList', messageFilter)
      this.commit('messages/setNoRespondList', noRespondList)
      let _hasInstagramToken = await this.$fire.database.ref('instagram_tokens_long_lived/' + uid + '/token_type').once('value')
      let hasInstagramToken = _hasInstagramToken.val ? _hasInstagramToken.val() : false
      console.log('hasInstagramToken', hasInstagramToken)
      if (hasInstagramToken) {
        this.commit('instagram/SET_HAS_ACCESS_TOKEN', true)
      } else {
        this.commit('instagram/SET_HAS_ACCESS_TOKEN', false)
      }

      let _hasCalendlyToken = await this.$fire.database.ref('calendly_tokens/' + uid + '/token_type').once('value')
      let hasCalendlyToken = _hasCalendlyToken.val ? _hasCalendlyToken.val() : false
      console.log('hasCalendlyToken', hasCalendlyToken)
      if (hasCalendlyToken) {
        this.commit('calendly/SET_HAS_ACCESS_TOKEN', true)
      } else {
        this.commit('calendly/SET_HAS_ACCESS_TOKEN', false)
      }

      this.dispatch('messages/getAutoRespondStatus', {})
      this.dispatch('identity/getSequences', {})
      this.commit('auth/setLoaded', true)
    } else {
      console.log("AUTH status: not logged in.")
      this.commit('instagram/SET_HAS_ACCESS_TOKEN', false)
      this.commit('messages/setMessagesStatuses', {})
      this.commit('auth/setLoaded', true)
    }
  },
  async storeCid({ state }, data) {
    return new Promise(async (resolve, reject) => {
      let storeCid = await this.$fire.functions.httpsCallable('storeCid')
      storeCid(data).then(async (result) => {
          console.log('storeCid result', result)
        return resolve(true)
      })
    })
  },
  async getAdminData({ state }) {
    return new Promise(async (resolve, reject) => {
      let _admin_data = await this.$fire.database.ref('cost_tracking').limitToFirst(25).once('value')
      let admin_data = _admin_data.val()
      let _comment_reply_tracking = await this.$fire.database.ref('comment_reply_tracking').limitToFirst(25).once('value')
      let comment_reply_tracking = _comment_reply_tracking.val()
      let _instagram_details = await this.$fire.database.ref('instagram_details').once('value')
      let instagram_details = _instagram_details.val()
      let _statuses = await this.$fire.database.ref('ghl_logs').once('value')
      let statuses = _statuses.val()
      console.log('admin_data', admin_data)
      this.commit('auth/setAdminData', admin_data)
      this.commit('auth/setAdminCommentData', comment_reply_tracking)
      this.commit('auth/setInstagramDetails', instagram_details)
      return resolve(statuses)
    })
  },
  async getAdminDataD({ state }) {
    return new Promise(async (resolve, reject) => {
      let _statuses = await this.$fire.database.ref('ghl_logs').once('value')
      let statuses = _statuses.val()
      return resolve(statuses)
    })
  },
  async getAdminDataB({ state }) {
    let _admin_data = await this.$fire.database.ref('traffic').limitToLast(25).once('value')
    let admin_data = _admin_data ? (_admin_data.val() || {}) : {}
    let _instagram_details = await this.$fire.database.ref('instagram_details').once('value')
    let instagram_details = _instagram_details.val()
    console.log('traffic')
    console.log(admin_data)
    this.commit('auth/setAdminDataB', admin_data)
    this.commit('auth/setInstagramDetails', instagram_details)
  },
  async fetchSomething({ state }) {
    let res = { uid: 'Success.' }
    let uid = res.uid || 'f'
    this.commit('auth/setUid', uid)
    return uid
  },
  async register({ state }, data) {
    let email = data.email
    let password = data.password
    let instagramAccount = data.instagramAccount
    var register = this.$fire.auth.createUserWithEmailAndPassword(email, password)
    return register.then(async (user) => {
      console.log('register complete')
      let saveInstagramAccountOnSignup = await this.$fire.functions.httpsCallable('saveInstagramAccountOnSignup')
      saveInstagramAccountOnSignup({instagramAccount}).then(async (result) => {
        console.log('saveInstagramAccountOnSignup result', result)
        this.$router.push('/settings')
      })
    }).catch((message) => {
      console.log('register failed', message)
    }) 
  },
  async login({ state }, data) {
    let email = data.email
    let password = data.password
    var signIn = this.$fire.auth.signInWithEmailAndPassword(email, password)
    return signIn.then((user) => {
      console.log('login complete')
      this.$router.push('/identity')
    }).catch((message) => {
      console.log('login failed', message)
    }) 
  },
  async getCheckoutSession({ state }, data) {
      let getCheckoutSession = await this.$fire.functions.httpsCallable('getCheckoutSession')
      getCheckoutSession({}).then(async (result) => {
          console.log('getCheckoutSession result', result)
          let url = result.data
          window.location = url
      })
  },
  async logout({ state }, data) {
    console.log('logout')
    var signOut = this.$fire.auth.signOut().then(() => {
      console.log('Signed out')
      this.$router.push('/')
    }, (error) => {
      console.log('Error when logging out', error)
    })
  }
}