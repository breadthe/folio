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
    return JSON.parse(window.localStorage.getItem('trades')) || []
  }
}

const exchanges = {
  /**
   * @param {object} data
   * @returns {void}
   */
  set: (data) => {
    if (data.length) {
      window.localStorage.setItem('exchanges', JSON.stringify(data))
    }
  },
  /**
   * @returns {array}
   */
  get: () => {
    return JSON.parse(window.localStorage.getItem('exchanges')) || []
  }
}

const coins = {
  /**
   * @param {object} data
   * @returns {void}
   */
  set: (data) => {
    if (data.length) {
      window.localStorage.setItem('coins', JSON.stringify(data))
    }
  },
  /**
   * @returns {array}
   */
  get: () => {
    return JSON.parse(window.localStorage.getItem('coins')) || []
  }
}

export default ({
  mapLastSynced,
  mapData,
  trades,
  exchanges,
  coins
})
