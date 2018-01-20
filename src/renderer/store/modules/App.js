const state = {
  selectedMenuItem: 'Dashboard' // default view is the Home page
}

const mutations = {
  UPDATE_SELECTED_MENU_ITEM (state, newItem) {
    state.selectedMenuItem = newItem
  }
}

const getters = {
  selectedMenuItem: (state) => {
    return state.selectedMenuItem
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
