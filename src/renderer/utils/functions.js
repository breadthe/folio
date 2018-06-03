import store from '../store'

/**
 * Returns a k-v array of consolidated amounts for each coin
 * [
 *  BTC: 0.45,
 *  ETH: 2.34
 * ]
 */
const consolidatedWalletAmounts = function () {
  const symbols = Object.keys(store.getters.wallets)
  const consolidatedWallet = []
  if (symbols) {
    symbols.map(symbol => {
      consolidatedWallet[symbol] = totalAmountBySymbol(symbol)
    })
  }
  return consolidatedWallet
}

const totalAmountBySymbol = function (symbol) {
  // Get all the wallets for a coin denoted by the symbol
  const coinWallets = store.getters.wallets[symbol] || null
  // let totalBTCValue = 0
  // let totalUSDValue = 0
  let totalWalletAmount = 0

  if (coinWallets) {
    // Add up the amounts in all the wallets for this coin
    coinWallets.forEach(function (wallet) {
      if (wallet.amount > 0) {
        totalWalletAmount += parseFloat(wallet.amount)
      }
    })
  }

  return parseFloat(totalWalletAmount)
}

const totalAmountByCoin = function (coinWallet) {
  // let totalBTCValue = 0
  // let totalUSDValue = 0
  let totalWalletAmount = 0

  coinWallet.forEach(function (wallet) {
    if (wallet.amount > 0) {
      totalWalletAmount += parseFloat(wallet.amount)
    }
  })

  return parseFloat(totalWalletAmount)
}

const coinNameFromSymbol = function (symbol) {
  const coin = store.getters.defaultCoins.filter(coin => coin.symbol === symbol)[0]
  return coin.name
}

/**
 * Gets the price for a coin
 * @param {*} symbol
 */
const priceByCoin = function (symbol) {
  const coin = store.getters.coins.filter(coin => coin.symbol === symbol)[0]
  return coin.lastTrade.details.price
}

export {
  consolidatedWalletAmounts,
  totalAmountBySymbol,
  totalAmountByCoin,
  coinNameFromSymbol,
  priceByCoin
}
