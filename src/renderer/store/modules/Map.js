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
  // allCoins: state => state.mapData, // need to filter the rest of the getters by allCoins
  // watchedCoins: state => state.mapData.filter(coin => coin.watch),
  // watchedCoins: filteredCoins => filteredCoins.filter(coin => coin.watch),
  // unwatchedCoins: state => state.mapData.filter(coin => !coin.watch),
  // unwatchedCoins: filteredCoins => filteredCoins.filter(coin => !coin.watch),
  watchedCoins: (state, getters) => (filterStr, matchCase) => {
    if (filterStr.length) {
      // Regex case sensitive/insensitive depending on the Match Case checkbox
      const params = matchCase ? 'g' : 'ig'
      const re = new RegExp(filterStr, params)
      return state.mapData.filter(coin => coin.name.match(re)) // name doesn't work for some reason
      // return state.mapData.filter(coin => coin.symbol.match(re))
    }
    return state.mapData.filter(coin => coin.watch)
  },
  unwatchedCoins: (state, getters) => (filterStr, matchCase) => {
    if (filterStr.length) {
      // Regex case sensitive/insensitive depending on the Match Case checkbox
      const params = matchCase ? 'g' : 'ig'
      const re = new RegExp(filterStr, params)
      return state.mapData.filter(coin => coin.name.match(re)) // name doesn't work for some reason
      // return state.mapData.filter(coin => coin.symbol.match(re))
    }
    return state.mapData.filter(coin => !coin.watch)
  },
  filteredCoins: (state, getters) => (filterStr, matchCase) => {
    if (filterStr.length) {
      // Regex case sensitive/insensitive depending on the Match Case checkbox
      const params = matchCase ? 'g' : 'ig'
      const re = new RegExp(filterStr, params)
      return state.mapData.filter(coin => coin.name.match(re)) // name doesn't work for some reason
      // return state.mapData.filter(coin => coin.symbol.match(re))
    }
    return state.mapData
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
