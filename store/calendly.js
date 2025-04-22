export const state = () => ({
  id: false,
  has_access_token: false
})

export const mutations = {
  SET_HAS_ACCESS_TOKEN(state, has_access_token) {
    console.log('setting has_access_token', has_access_token)
    state.has_access_token = has_access_token
  }
}

export const actions = {
  async getToken({ state }, data) {
    return new Promise(async (resolve, reject) => {
      let code = data.code || false
      let getCalendlyToken = this.$fire.functions.httpsCallable('getCalendlyToken')
      getCalendlyToken({code}).then(async (result) => {
          console.log('getCalendlyToken result', result)
          if (result.data === true) {
            return resolve('Success!')
            
          } else {
            return reject('Fail!')
          }
      })
    })
  },
  async getMyCalendlyEvents({ state }, data) {
    return new Promise(async (resolve, reject) => {
      let getMyCalendlyEvents = this.$fire.functions.httpsCallable('getMyCalendlyEvents')
      getMyCalendlyEvents().then(async (result) => {
        console.log('getMyCalendlyEvents result', result)
        return resolve(result)
      })
    })
  }
}