<template>
  <div class="section tw-h-screen">
    <section class="container">

      <p>This app is built with love and:
        <ul>
          <li><a @click="open('https://vuejs.org/')">Vue.js</a></li>
          <li><a @click="open('https://electronjs.org/')">Electron</a></li>
          <li><a @click="open('https://bulma.io/')">Bulma</a></li>
          <li><a @click="open('https://tailwindcss.com/')">TailwindCSS</a></li>
          <li><a @click="open('https://socket.io/')">Socket.io</a></li>
          <li><a @click="open('https://greensock.com/')">Green Sock Animation Platform (GSAP)</a></li>
          <li><a @click="open('https://masonry.desandro.com/')">Masonry Layout</a></li>
        </ul>
      </p>

    </section>
  </div>
</template>

<script>
  export default {
    name: 'about-page',
    data: function () {
      return {
        pageTitle: 'About',
        pageSubTitle: '',
        message: '',
        button: {
          isLoading: false,
          isDisabled: false
        }
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    computed: {
    }
  }
</script>

<style>
  /**/
</style>
