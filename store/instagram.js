export const state = () => ({
  has_access_token: 0,
  user_id: false,
  username: false
})

export const mutations = {
  SET_HAS_ACCESS_TOKEN(state, has_access_token) {
    console.log('setting has_access_token', has_access_token)
    state.has_access_token = has_access_token
  },
  setMyInstagramId(state, user_id) {
    console.log('setting user_id', user_id)
    state.user_id = user_id
  },
  setMyInstagramUsername(state, username) {
    console.log('setting username', username)
    state.username = username
  },
}

export const actions = {
  async getToken({ state }, data) {
    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let getInstagramToken = this.$fire.functions.httpsCallable('getInstagramToken')
      getInstagramToken({code}).then(async (result) => {
          console.log('getInstagramToken result', result)
          if (result.data === true) {
            // instagram is now connected
            // go to the step after getting messages
            return resolve('Success!')
            
          } else {
            // say failed to get messages
            return reject('Fail!')
          }
      })
    })
  }
}