/**
 * Permanent storage is achieved with IndexedDB
 * Trades and History only
 * (previously localStorage)
 */

import Dexie from 'Dexie'
import _ from 'lodash'

const db = new Dexie('ledger')
const dbVersion = 1
db.version(dbVersion).stores({ trades: '[exchange+market], exchange, market, coin, details' })
/*
"details" object in trades:
{
  "cap24hrChange":-2.69,
  "long":"Bitcoin Gold",
  "mktcap":4642286762.641,
  "perc":-2.69,
  "price":249.06,
  "shapeshift":false,
  "short":"BTG",
  "supply":16734449,
  "usdVolume":111488000,
  "volume":111488000,
  "vwapData":258.0037698499298,
  "vwapDataBTC":258.0037698499298
}
*/

function openDB () {
  db.open().then(function () {
    // may want to do something here
  }).catch(function (err) {
    console.error('Failed to open db: ' + (err.stack || err))
  })
}

const trades = {
  /**
   * @param {object} newTrade
   * @returns {void}
   */
  set: (newTrade) => {
    if (_.size(newTrade[0])) {
      openDB()
      db.trades.put({
        exchange: newTrade[0].exchange,
        market: newTrade[0].market,
        coin: newTrade[0].coin,
        details: newTrade[0].details
      }).then(function (key) {
        /*
        Example of something to do after updating the record
        db.trades.where('exchange').equals('bitfinex').each(function (trade) {
          console.log(JSON.stringify(trade))
        })
        */
        db.trades
          // .where({'exchange': 'bittrex', 'market': 'BTC_USD', 'coin': 'BTC'})
          .where({'coin': 'ZCL'})
          .each(function (trade) {
            console.log(JSON.stringify(trade))
          })
      }).catch(function (error) {
        console.log(error.message)
      })
    }
  },
  /**
   * @returns {array}
   */
  get: () => {
    openDB()
    db.trades.get(dbVersion).then(function (trades) {
    // db.trades.where('exchange').then(function (trades) {
      if (typeof trades !== 'undefined') {
        // console.log(trades)
        return trades
      }
      return []
    }).catch(function () {
      return []
    })
  }
}

const history = {
  key: 'history',
  /**
   * @param {object} newTrade
   * @returns {void}
   */
  set: (newTrade) => {
    if (_.size(newTrade)) {
      const db = new Dexie('mydb')
      db.open()
      db.history.put({
        coin: newTrade.coin,
        exchange: newTrade.exchange,
        market: newTrade.market
      }).then(function () {
        console.log(newTrade)
      })

      // db.foo.put({id: 1, bar: 'hello rollup'}).then(id => {
      //   return db.foo.get(id)
      // }).then(item => {
      //   console.log('Found: ' + item.bar)
      // }).catch(err => {
      //   console.log('Error: ' + (err.stack || err))
      // })
      // let newHistory = {}
      // Load the previously saved history from localStorage
      // let oldHistory = history.get()
      // console.log(newTrade)
      // const exchange = newTrade.exchange
      // Try to locate the exchange "key" for the current trade in the history
      // const oldExchange = _.find(oldHistory, exchange)
      // If the exchange doesn't exist, add it as a new key
      // if (typeof oldExchange === 'undefined') {
      //   newHistory.exchange = {
      //     'hi': 'there'
      //   }
      // } else {
        // update the array for this exchange
      // }
      // oldHistory.push(newHistory)
      // window.localStorage.setItem('history', JSON.stringify(oldHistory))
    }
  },
  /**
   * @returns {array}
   */
  get: () => {
    // return JSON.parse(window.localStorage.getItem('history')) || []
  }
}

export default ({
  trades,
  history
})
