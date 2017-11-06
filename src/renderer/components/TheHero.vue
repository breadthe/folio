<template>
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
</template>

<script>
  export default {
    name: 'the-hero',
    props: {
      pageTitle: {
        type: String,
        required: true,
        default: ''
      },
      pageSubTitle: {
        type: String,
        required: false,
        default: ''
      }
    },
    data () {
      return {
        menuIsActive: false
      }
    }
  }
</script>

<style>
</style>
