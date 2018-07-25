import localStorage from '../localStorage'
import _ from 'lodash'

const WalletNameException = function (message) {
  this.message = message
  this.name = 'WalletNameException'
}
const WalletAddressException = function (message) {
  this.message = message
  this.name = 'WalletAddressException'
}
const WalletAmountException = function (message) {
  this.message = message
  this.name = 'WalletAmountException'
}

/**
 * My wallets
 * Permanently stored in localStorage
 */
const state = {
  wallets: {}
}

const mutations = {
  SET_WALLETS: (state, wallets) => {
    localStorage.wallets.set(wallets)

    state.wallets = localStorage.wallets.get()
  },
  ADD_WALLET: (state, wallet) => {
    const wallets = localStorage.wallets.get() || {}
    const newWallet = {
      'name': wallet.name,
      'address': wallet.address,
      'amount': parseFloat(wallet.amount)
    }
    // If the symbol key (eg. 'BTC') does not exist, then create it and add the wallet to the new key
    if (!_.has(wallets, [wallet.symbol])) {
      // console.log([wallet.symbol])
      wallets[[wallet.symbol]] = [newWallet]
    } else {
    // Otherwise search for the new wallet's address

      // Check if name is empty
      if (!wallet.name.length) {
        throw new WalletNameException('Wallet name should not be empty')
      }

      // Check if address is empty
      if (!wallet.address.length) {
        throw new WalletAddressException('Wallet address should not be empty')
      }

      // Check if amount is a valid float
      if (isNaN(parseFloat(wallet.amount))) {
        throw new WalletAmountException('Amount is not a floating number')
      }

      // Try to locate the address under the corresponding coin symbol
      const ix = _.findIndex(wallets[wallet.symbol], ['address', wallet.address])
      if (ix < 0) { // The address does not exist, add the new wallet
        wallets[[wallet.symbol]].push(newWallet)
      } else { // The address exists, don't add the new wallet
        throw new WalletAddressException('Wallet address already exists')
      }
    }

    localStorage.wallets.set(wallets)
    state.wallets = localStorage.wallets.get()
  },
  DELETE_WALLET: (state, obj) => {
    // Locate the wallet for the corresponding coin
    const wallets = state.wallets
    const coinWallet = wallets[obj.symbol]
    if (coinWallet) {
      // Locate the wallet inside the array by wallet address
      const itemIndex = _.findIndex(coinWallet, wallet => wallet.address === obj.address)
      if (itemIndex > -1) {
        coinWallet.splice(itemIndex, 1) // Remove the wallet

        if (coinWallet.length) {
          wallets[obj.symbol] = coinWallet // Assign the new array back
        } else { // If there are no wallets for a coin, remove the coin property from the wallets obj
          _.unset(wallets, obj.symbol)
        }

        // save to localStorage
        localStorage.wallets.set(wallets)
        state.wallets = localStorage.wallets.get()
      }
    }
  },
  UPDATE_WALLET: (state, obj) => {
    // Check if amount is a valid float
    if (isNaN(parseFloat(obj.amount))) {
      throw new WalletAmountException('Amount is not a floating number')
    }

    // Locate the wallet for the corresponding coin
    const wallets = state.wallets
    const coinWallet = wallets[obj.symbol]
    if (coinWallet) {
      // Locate the wallet inside the array by wallet address
      const itemIndex = _.findIndex(coinWallet, wallet => wallet.address === obj.address)
      if (itemIndex > -1) {
        // coinWallet[itemIndex].name = obj.amount // TODO: Update the wallet name
        // coinWallet[itemIndex].address = obj.amount // TODO: Update the wallet address
        coinWallet[itemIndex].amount = parseFloat(obj.amount) // Update the amount

        wallets[obj.symbol] = coinWallet // Assign the new array back

        // save to localStorage
        localStorage.wallets.set(wallets)
        state.wallets = localStorage.wallets.get()
      }
    }
  }

}

const actions = {
  setWallets ({ commit }, wallets) {
    commit('SET_WALLETS', wallets)
  },
  addWallet ({ commit }, wallet) {
    commit('ADD_WALLET', wallet)
  },
  deleteWallet ({ commit }, obj) {
    commit('DELETE_WALLET', obj)
  },
  updateWallet ({ commit }, obj) {
    commit('UPDATE_WALLET', obj)
  },
  updateAmount ({ commit }, obj) {
    /**
     * obj =
     * {
     *   'coin': coin,
     *   'name': name,
     *   'address': address,
     *   'amount': amount
     * }
     */
    // do this async
    commit('UPDATE_AMOUNT', obj)
  }
}

const getters = {
  wallets: (state) => { return state.wallets || {} }
}

export default {
  state,
  mutations,
  actions,
  getters
}
