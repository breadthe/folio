import _ from 'lodash'

const state = {
  mapSize: 0,
  mapLastSynced: '',
  mapData: []
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
  },
  SET_WATCH_FLAG (state, symbol) {
    const itemIndex = _.findIndex(state.mapData, entry => entry.symbol === symbol)
    state.mapData[itemIndex].watch = !state.mapData[itemIndex].watch
  }
}

const actions = {
  setWatchFlag ({ commit }, symbol) {
    // do this async
    commit('SET_WATCH_FLAG', symbol)
  }
}

const getters = {
  watchedCoins: state => state.mapData.filter(coin => coin.watch),
  unwatchedCoins: state => state.mapData.filter(coin => !coin.watch)
}

export default {
  state,
  mutations,
  actions,
  getters
}
