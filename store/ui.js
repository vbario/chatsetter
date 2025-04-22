export const state = () => ({
  showAIPlayground: true
})

export const mutations = {
  openAIPlayground(state, todo) {
    state.showAIPlayground = true
  },
  closeAIPlayground(state, todo) {
    state.showAIPlayground = false
  }
}

export const actions = {
  async closeAIPlayground({ state }, data) {
    this.commit('ui/closeAIPlayground', {})
  },
  async openAIPlayground({ state }, data) {
    this.commit('ui/openAIPlayground', {})
  },
}