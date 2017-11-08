// import _ from 'lodash'
import localStorage from '../localStorage'

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
  SET_TRADES: (state, data) => {
    localStorage.trades.set(data)

    state.trades = localStorage.trades.get()
  }
}

const actions = {
  socket_connect ({ commit }, status) {
    commit('SOCKET_CONNECT', status)
  }
}

const getters = {
  trades: (state) => {
    return state.trades
  },
  connect: (state) => {
    return state.connect
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
