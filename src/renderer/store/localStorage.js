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
    window.localStorage.setItem('mapData', JSON.stringify(data))
  },
  /**
   * @returns {array}
   */
  get: () => {
    return JSON.parse(window.localStorage.getItem('mapData'))
  }
}

export default ({
  mapLastSynced,
  mapData
})
