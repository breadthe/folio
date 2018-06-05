<template>
    <div class="app-logo has-text-centered">
        <span class="logo">folio</span>
        <div class="tags has-addons">
            <span class="tag">alpha</span>
            <span class="tag">{{ theVersion }}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'the-logo',
    props: {
      theVersion: {
        type: String,
        required: true,
        default: 'v0.0.0'
      }
    }
  }
</script>

<style>
    .tags {
        padding-top: 10px;
    }
</style>
