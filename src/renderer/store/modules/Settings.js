import localStorage from '../localStorage'
import _ from 'lodash'

/**
 * App-level settings and defaults
 * Permanently stored in localStorage
 */
const state = {
  default: {
    theme: 'light',
    exchanges: [
      { name: 'bittrex', watch: true },
      { name: 'bitfinex', watch: true },
      { name: 'kraken', watch: true }
    ],
    coins: [
      { market: 'BTC_USD', symbol: 'BTC', name: 'Bitcoin', watch: true, lastTrade: null, qty: 0, order: 1 },
      { market: 'ETH_USD', symbol: 'ETH', name: 'Ethereum', watch: true, lastTrade: null, qty: 0, order: 2 },
      { market: 'LTC_USD', symbol: 'LTC', name: 'Litecoin', watch: true, lastTrade: null, qty: 0, order: 3 },
      { market: 'BCH_USD', symbol: 'BCH', name: 'Bitcoin Cash', watch: true, lastTrade: null, qty: 0, order: 4 },
      { market: 'BTC_SC', symbol: 'SC', name: 'Siacoin', watch: true, lastTrade: null, qty: 0, order: 5 },
      { market: 'BTC_MONA', symbol: 'MONA', name: 'MonaCoin', watch: true, lastTrade: null, qty: 0, order: 6 },
      { market: 'BTC_ZEN', symbol: 'ZEN', name: 'ZenCash', watch: true, lastTrade: null, qty: 0, order: 7 },
      { market: 'BTC_XMR', symbol: 'XMR', name: 'Monero', watch: true, lastTrade: null, qty: 0, order: 8 },
      { market: 'BTC_XRP', symbol: 'XRP', name: 'Ripple', watch: true, lastTrade: null, qty: 0, order: 9 },
      { market: 'BTC_ZEC', symbol: 'ZEC', name: 'Zcash', watch: true, lastTrade: null, qty: 0, order: 10 },
      { market: 'BTC_ZCL', symbol: 'ZCL', name: 'ZClassic', watch: true, lastTrade: null, qty: 0, order: 11 },
      { market: 'BTC_DOGE', symbol: 'DOGE', name: 'Dogecoin', watch: true, lastTrade: null, qty: 0, order: 12 },
      { market: 'BTC_DCR', symbol: 'DCR', name: 'Decred', watch: true, lastTrade: null, qty: 0, order: 13 }
    ]
  },
  theme: 'light',
  exchanges: [],
  coins: [],
  view: 'grid'
}

const mutations = {
  SET_THEME: (state, theme) => {
    localStorage.settings.set({ theme: theme })
    state.theme = localStorage.settings.get().theme
  },
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
  SET_TRADE: (state, newTrade) => {
    const itemIndex = _.findIndex(state.coins, coin => coin.market === newTrade.market)

    // The new trade's market (eg. BTC_USD) is not found in the list of coins
    // TODO: search only in watched coins
    if (itemIndex > -1) {
      state.coins[itemIndex].lastTrade = newTrade
      // save to localStorage
      localStorage.coins.set(state.coins)
    }
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
  },
  UPDATE_QTY: (state, obj) => {
    const itemIndex = _.findIndex(state.coins, entry => entry.market === obj.market)
    state.coins[itemIndex].qty = obj.qty

    // save to localStorage
    localStorage.coins.set(state.coins)
  },
  SET_VIEW: (state, view) => {
    state.view = view === 'grid' ? 'grid' : 'list'
  }
}

const actions = {
  setTheme ({ commit }, theme) {
    commit('SET_THEME', theme)
  },
  setExchanges ({ commit }, exchanges) {
    commit('SET_EXCHANGES', exchanges)
  },
  setCoins ({ commit }, coins) {
    commit('SET_COINS', coins)
  },
  setTrade ({ commit }, newTrade) {
    commit('SET_TRADE', newTrade)
  },
  toggleWatchedExchange ({ commit }, name) {
    // do this async
    commit('TOGGLE_WATCHED_EXCHANGE', name)
  },
  toggleWatchedCoin ({ commit }, market) {
    // do this async
    commit('TOGGLE_WATCHED_COIN', market)
  },
  updateQty ({ commit }, obj) {
    /**
     * obj =
     * {
     *   'market': market,
     *   'qty': qty
     * }
     */
    // do this async
    commit('UPDATE_QTY', obj)
  }
}

const getters = {
  defaultTheme: (state) => { return state.default.theme || 'light' },
  theme: (state) => { return state.theme || 'light' },
  exchanges: (state) => { return state.exchanges || [] },
  coins: (state) => { return state.coins || [] },
  defaultCoins: (state) => { return state.default.coins || [] },
  watchlistView: (state) => { return state.view || 'grid' }
}

export default {
  state,
  mutations,
  actions,
  getters
}
