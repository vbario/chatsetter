// let debug = process.env.NODE_ENV !== 'production'
// import firebaseInstance from '~/plugins/firebase'
// import auth from '~/plugins/firebase'

export const state = () => ({
  counter: 0,
  signedIn: false
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
  getSignedIn(state) {
    return state.signedIn
  },
}

export const mutations = {
  increment(state) {
    state.counter++
  },
  setSignedIn(state, value) {
    state.signedIn = value
  }
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  },
  nuxtServerInit ({ commit }, { req }) {
    console.log('...nuxtServerInit => get user details')
    // this.$fire.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     console.log("AUTH status: logged in.", user)
    //     this.commit('setSignedIn', user.uid)
    //     // commit('user', req.session.user)
    //     // state.commit('AUTH.SET_UID', user.uid)
    //   } else {
    //     console.log("AUTH status: not logged in.")
    //     this.commit('setSignedIn', '-false-')
    //   }
    // })
  }
}