// import _ from 'lodash'
// import localStorage from '../localStorage'
import moment from 'moment'

const state = {
  news: []
}

const mutations = {
  // SET_MAP_LAST_SYNCED (state, date) {
  //   localStorage.mapLastSynced.set(date)
  //   state.mapLastSynced = localStorage.mapLastSynced.get()
  // },
  SET_NEWS (state, news) {
    // localStorage.mapLastSynced.set(date)
    // state.news = localStorage.mapLastSynced.get()
    // state.news.merge(news.articles)
    state.news.push({
      source: news.source,
      articles: news.articles,
      lastSynced: moment().format('MMMM Do YYYY, h:mm:ss a')
    })
  }
}

const actions = {
  setNews ({ commit }, news) {
    commit('SET_NEWS', news)
  }
}

const getters = {
  // allCoins: (state) => { return state.mapData }
  news: (state) => { return state.news }
}

export default {
  state,
  mutations,
  actions,
  getters
}
