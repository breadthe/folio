import _ from 'lodash'
import localStorage from '../localStorage'

const state = {
  mapLastSynced: '',
  mapData: [],
  mapSize: 0
}

const mutations = {
  SET_MAP_LAST_SYNCED (state, date) {
    // save to localStorage
    localStorage.mapLastSynced.set(date)

    // get from local storage, set it in store
    state.mapLastSynced = localStorage.mapLastSynced.get()
  },
  SET_MAP_DATA (state, data) {
    // 1. Get the list of watched coins from the "old" map data
    const oldMapData = state.mapData
    const watchedCoins = oldMapData.filter(i => i.watch)

    // 2. Iterate through watched coins
    watchedCoins.map(coin => {
      // 3. Find the index in data (the coin map) matching the symbol of the watched coin
      const ix = _.findIndex(data, ['symbol', coin.symbol])
      // 4. Set that object to watched
      data[ix].watch = true
    })

    // save to localStorage
    localStorage.mapData.set(data)

    // get from local storage, set it in store
    state.mapData = localStorage.mapData.get()
  },
  SET_MAP_SIZE (state) {
    state.mapSize = state.mapData.length
  },
  TOGGLE_WATCH_FLAG (state, symbol) {
    const itemIndex = _.findIndex(state.mapData, entry => entry.symbol === symbol)
    state.mapData[itemIndex].watch = !state.mapData[itemIndex].watch

    // save to localStorage
    localStorage.mapData.set(state.mapData)

    // get from local storage, set it in store
    state.mapData = localStorage.mapData.get()
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
  allCoins: (state) => { return state.mapData },
  watchedCoins: (state) => { return state.mapData.filter(coin => coin.watch) }
}

export default {
  state,
  mutations,
  actions,
  getters
}
