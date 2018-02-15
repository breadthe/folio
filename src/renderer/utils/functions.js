import store from '../store'

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

const priceByCoin = function (symbol) {
  return 17
}

export {
  totalAmountByCoin,
  coinNameFromSymbol,
  priceByCoin
}
