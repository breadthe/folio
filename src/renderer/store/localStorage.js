const settings = {
  /**
   * @param {object} data
   * @returns {void}
   */
  set: (data) => {
    if (data) {
      window.localStorage.setItem('settings', JSON.stringify(data))
    }
  },
  /**
   * @returns {array}
   */
  get: () => {
    return JSON.parse(window.localStorage.getItem('settings')) || {}
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

const wallets = {
  /**
   * @param {object} data
   * @returns {void}
   */
  set: (data) => {
    if (data) {
      window.localStorage.setItem('wallets', JSON.stringify(data))
    }
  },
  /**
   * @returns {array}
   */
  get: () => {
    return JSON.parse(window.localStorage.getItem('wallets')) || {}
  }
}

export default ({
  // mapLastSynced,
  // mapData,
  // trades,
  settings,
  exchanges,
  coins,
  wallets
})
