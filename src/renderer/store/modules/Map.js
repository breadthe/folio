const state = {
  mapSize: 0,
  mapLastSynced: '',
  mapData: {}
}

const mutations = {
  SET_MAP_SIZE (state, value) {
    state.mapSize = value
  },
  SET_MAP_LAST_SYNCED (state, date) {
    state.mapLastSynced = date
  },
  SET_MAP_DATA (state, data) {
    state.mapData = data
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('SOME_MUTATION')
  }
}

export default {
  state,
  mutations,
  actions
}
