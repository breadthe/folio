<template>
    <div class="app-logo has-text-centered">
        <i class="fa fa-book fa-4x" aria-hidden="true"></i>
        <div class="tags has-addons">
            <span class="tag is-light">alpha</span>
            <span class="tag is-white">{{ theVersion }}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'the-logo',
    props: [ 'theVersion' ]
  }
</script>

<style>
    .tags {
        padding-top: 10px;
    }
</style>
