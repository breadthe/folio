import _ from 'lodash'

const mapLastSynced = {
  key: 'mapLastSynced',
  /**
   * @param {string} date
   * @returns {Promise} Promise object represents saving data to localStorage
   */
  set: (date) => {
    return new Promise((resolve, reject) => {
      window.localStorage.setItem('mapLastSynced', date)
    })
  },
  /**
   * @returns {string}
   */
  get: () => {
    return window.localStorage.getItem('mapLastSynced')
  }
}

const mapData = {
  key: 'mapData',
  /**
   * @param {object} data
   * @returns {void}
   */
  set: (data) => {
    // 1. Get the list of watched coins from the "old" map data (from localStorage)
    const oldMapData = mapData.get()
    const watchedCoins = oldMapData.filter(i => i.watch)

    // 2. Iterate through watched coins
    watchedCoins.map(coin => {
      // 3. Find the index in data (the coin map) matching the symbol of the watched coin
      const ix = _.findIndex(data, ['symbol', coin.symbol])
      // 4. Set that object to watched
      data[ix].watch = true
    })

    // Store the data object in localStorage
    window.localStorage.setItem('mapData', JSON.stringify(data))
  },
  /**
   * @returns {array}
   */
  get: () => {
    return JSON.parse(window.localStorage.getItem('mapData'))
  }
}

const trades = {
  key: 'trades',
  /**
   * @param {object} data
   * @returns {void}
   */
  set: (data) => {
    if (data.length) {
      window.localStorage.setItem('trades', JSON.stringify(data))
    }
  },
  /**
   * @returns {array}
   */
  get: () => {
    return JSON.parse(window.localStorage.getItem('trades'))
  }
}

export default ({
  mapLastSynced,
  mapData,
  trades
})
