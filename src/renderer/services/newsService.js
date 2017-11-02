import News from '../store'
import axios from 'axios'

const apiKey = '69df7764e189497b821de93e1aeca7ca'

// let news = []

let msg = []

const newsSources = [
  // { url: 'http://feeds.feedburner.com/CoinDesk', name: 'Coindesk' }
  { url: 'https://newsapi.org/v1/articles?source=techcrunch&apiKey=' + apiKey, name: 'TechCrunch' }
]

const getNews = () => {
  newsSources.forEach((source) => {
    axios.get(source.url)
      .then((response) => {
        console.log(response)
        // news.push(response)

        News.dispatch('setNews', response.data)
        // this.message = 'Finished getting data'
        // this.button.sync.disabled = false
        // this.button.sync.loading = false

        // this.saveMapToStore(response.data)
      })
      .catch((error) => {
        msg.push = '[' + source.name + '] ' + error
      })
  })
}

export default ({
  getNews,
  // news,
  msg
})
