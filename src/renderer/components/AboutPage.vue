<template>
  <div class="section tw-h-screen">
    <section class="container">

      <p>This app is build with love and:
        <ul>
          <li><a class="storyblok-button blue tw-float-left tw-m-1" @click="open('https://vuejs.org')">Vue.js</a></li>
          <li><a class="storyblok-button blue tw-float-left tw-m-1" @click="open('https://electronjs.org')">Electron</a></li>
          <li><a class="storyblok-button blue tw-float-left tw-m-1" @click="open('https://bulma.io')">Bulma</a></li>
          <li><a class="storyblok-button blue tw-float-left tw-m-1" @click="open('https://tailwindcss.com')">TailwindCSS</a></li>
          <li><a class="storyblok-button blue tw-float-left tw-m-1" @click="open('https://socket.io')">Socket.io</a></li>
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
