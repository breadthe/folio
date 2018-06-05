<template>
    <div class="app-logo has-text-centered">
        <span class="logo">folio</span>
        <span class="tag">{{ theVersion }}</span>
    </div>
</template>

<script>
  export default {
    name: 'the-logo',
    props: {
      theVersion: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>
    .tags {
        padding-top: 10px;
    }
</style>
