import localStorage from '../localStorage'
import _ from 'lodash'

/**
 * App-level settings and defaults
 * Permanently stored in localStorage
 */
const state = {
  default: {
    exchanges: [
      { name: 'bittrex', watch: true },
      { name: 'bitfinex', watch: true },
      { name: 'kraken', watch: true }
    ],
    coins: [
      { market: 'BTC-USD', symbol: 'BTC', name: 'BTC', watch: true, order: 1 },
      { market: 'ETH-USD', symbol: 'ETH', name: 'Ethereum', watch: true, order: 2 },
      { market: 'LTC-USD', symbol: 'LTC', name: 'LiteCoin', watch: true, order: 3 }
    ]
  },
  exchanges: [],
  coins: []
}

const mutations = {
  SET_EXCHANGES: (state, exchanges) => {
    // If exchanges exists, save it to localStorage
    // Othewise save the default exchanges to localStorage
    localStorage.exchanges.set(exchanges.length ? exchanges : state.default.exchanges)

    state.exchanges = localStorage.exchanges.get()
  },
  SET_COINS: (state, coins) => {
    // If coins exists, save it to localStorage
    // Othewise save the default coins to localStorage
    localStorage.coins.set(coins.length ? coins : state.default.coins)

    state.coins = localStorage.coins.get()
  },
  TOGGLE_WATCHED_EXCHANGE: (state, name) => {
    const itemIndex = _.findIndex(state.exchanges, entry => entry.name === name)
    state.exchanges[itemIndex].watch = !state.exchanges[itemIndex].watch

    // save to localStorage
    localStorage.exchanges.set(state.exchanges)

    // get from local storage, set it in store
    // This may not actually be needed
    // state.exchanges = localStorage.exchanges.get()
  },
  TOGGLE_WATCHED_COIN: (state, market) => {
    const itemIndex = _.findIndex(state.coins, entry => entry.market === market)
    state.coins[itemIndex].watch = !state.coins[itemIndex].watch

    // save to localStorage
    localStorage.coins.set(state.coins)

    // get from local storage, set it in store
    // This may not actually be needed
    // state.coins = localStorage.coins.get()
  }
}

const actions = {
  setExchanges ({ commit }, exchanges) {
    commit('SET_EXCHANGES', exchanges)
  },
  setCoins ({ commit }, coins) {
    commit('SET_COINS', coins)
  },
  toggleWatchedExchange ({ commit }, name) {
    // do this async
    commit('TOGGLE_WATCHED_EXCHANGE', name)
  },
  toggleWatchedCoin ({ commit }, market) {
    // do this async
    commit('TOGGLE_WATCHED_COIN', market)
  }
}

const getters = {
  exchanges: (state) => { return state.exchanges || [] },
  coins: (state) => { return state.coins || [] }
}

export default {
  state,
  mutations,
  actions,
  getters
}
