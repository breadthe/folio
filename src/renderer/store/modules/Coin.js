import localStorage from '../localStorage'

const state = {
  trades: [],
  connect: false,
  sort: 'name-asc',
  sortOptions: ['name-asc', 'name-desc', 'qty-asc', 'qty-desc']
}

const mutations = {
  SOCKET_CONNECT: (state, status) => {
    state.connect = status
  },
  SOCKET_USER_MESSAGE: (state, message) => {
    state.message = message
  },
  SET_TRADES: (state, trades) => {
    localStorage.trades.set(trades)

    state.trades = localStorage.trades.get()
  },
  SET_SORT: (state, sort) => {
    state.sort = state.sortOptions.find(function (el) { return el === sort }) ? sort : 'name-asc'
  }
}

const actions = {
  socket_connect ({ commit }, status) {
    commit('SOCKET_CONNECT', status)
  },
  setTrades ({ commit }, trades) {
    commit('SET_TRADES', trades)
  },
  setSort ({ commit }, sort) {
    commit('SET_SORT', sort)
  }
}

const getters = {
  trades: (state) => { return state.trades || [] },
  connect: (state) => { return state.connect },
  sortBy: (state) => { return state.sort }
}

export default {
  state,
  mutations,
  actions,
  getters
}
