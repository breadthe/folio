<template>
  <div class="section">
    <section class="container">
      <button @click="clickButton" class="button" :class="{ 'is-loading' : button.isLoading, 'is-disabled' : button.isDisabled }">
        <i class="fa fa-circle-o-notch" aria-hidden="true"></i>&nbsp;Button
      </button>
      <div>
        Obj size: {{ objSize }}
      </div>
      <div>
        {{ message }}
      </div>
      <ul>
        <li v-for="entry in page.sc">
          {{ entry }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'home-page',
    components: { },
    data: function () {
      return {
        message: '',
        button: {
          isLoading: false,
          isDisabled: false
        },
        page: {
          sc: {}
        }
      }
    },
    methods: {
      clickButton: function () {
        const url = 'http://socket.coincap.io/page/SC'
        this.message = 'Getting data'
        this.button = {
          isLoading: true,
          isDisabled: true
        }
        this.$http.get(url)
          .then((response) => {
            this.message = 'Finished getting data'
            this.button = {
              isLoading: false,
              isDisabled: false
            }
            this.page.sc = response.data
          })
          .catch((error) => {
            this.message = 'There was an error' + error
          })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    computed: {
      objSize: function () {
        return _.size(this.page.sc)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
