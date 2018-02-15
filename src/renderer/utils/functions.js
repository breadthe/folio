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

export {
  totalAmountByCoin
}
