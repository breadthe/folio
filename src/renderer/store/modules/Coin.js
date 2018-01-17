import permanentStorage from '../permanentStorage'

const state = {
  trades: [],
  connect: false
}

const mutations = {
  SOCKET_CONNECT: (state, status) => {
    state.connect = status
  },
  SOCKET_USER_MESSAGE: (state, message) => {
    state.message = message
  },
  SET_TRADES: (state, trades) => {
    permanentStorage.trades.set(trades)

    state.trades = permanentStorage.trades.get()
  }
}

const actions = {
  socket_connect ({ commit }, status) {
    commit('SOCKET_CONNECT', status)
  },
  setTrades ({ commit }, trades) {
    commit('SET_TRADES', trades)
  }
}

const getters = {
  trades: (state) => { return state.trades || [] },
  connect: (state) => { return state.connect }
}

export default {
  state,
  mutations,
  actions,
  getters
}
