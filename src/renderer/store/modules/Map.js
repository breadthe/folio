import _ from 'lodash'

const state = {
  mapLastSynced: '',
  mapData: [],
  mapSize: 0
}

const mutations = {
  SET_MAP_LAST_SYNCED (state, date) {
    // save to localStorage
    window.localStorage.setItem('mapLastSynced', date)

    // get from local storage, set it in store
    state.mapLastSynced = window.localStorage.getItem('mapLastSynced')
  },
  SET_MAP_DATA (state, data) {
    // save to localStorage
    window.localStorage.setItem('mapData', JSON.stringify(data))

    // get from local storage, set it in store
    state.mapData = JSON.parse(window.localStorage.getItem('mapData'))
  },
  SET_MAP_SIZE (state) {
    state.mapSize = state.mapData.length
  },
  TOGGLE_WATCH_FLAG (state, symbol) {
    const itemIndex = _.findIndex(state.mapData, entry => entry.symbol === symbol)
    state.mapData[itemIndex].watch = !state.mapData[itemIndex].watch
  }
}

const actions = {
  toggleWatchFlag ({ commit }, symbol) {
    // do this async
    commit('TOGGLE_WATCH_FLAG', symbol)
  },
  setMapLastSynced ({ commit }, date) {
    commit('SET_MAP_LAST_SYNCED', date)
  },
  setMapData ({ commit }, data) {
    commit('SET_MAP_DATA', data)
    commit('SET_MAP_SIZE')
  },
  setMapSize ({ commit }) {
    commit('SET_MAP_SIZE')
  }
}

const getters = {
  allCoins: (state) => { return state.mapData }
}

export default {
  state,
  mutations,
  actions,
  getters
}
