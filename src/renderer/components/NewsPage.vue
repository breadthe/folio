<template>
  <div class="section">
    <section class="container">

        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ pageTitle }}
                    </h1>
                    <h2 class="subtitle">
                        {{ pageSubTitle }}
                    </h2>
                </div>
            </div>
        </section>

        <!--<div class="tile is-ancestor" v-if="newsCount">-->
        <div class="tile is-ancestor" v-if="news.length">
            <div class="tile notification is-primary is-6">
                <article class="tile is-child notification is-primary">
                    <p class="title">Map contains</p>
                    <p class="subtitle"><strong>0</strong> items</p>
                </article>
            </div>
            <div class="tile">
                <!-- Add content or other tiles -->
            </div>
        </div>

        <section v-if="news.length">
            <news-card :news="news"></news-card>
        </section>

    </section>
  </div>
</template>

<script>
  import _ from 'lodash'
  import store from '../store'
  import newsService from '../services/newsService'
  import NewsCard from './NewsCard'

  export default {
    name: 'news-page',
    components: { NewsCard },
    data: function () {
      return {
        pageTitle: 'News',
        pageSubTitle: 'Latest crypto news',
        news: []
      }
    },
    computed: {
      newsCount: () => {
        return _.size(this.news)
      }
    },
    mounted: function () {
      newsService.getNews()
      this.news = store.getters.news
    }
  }
</script>

<style>
  /**/
</style>
