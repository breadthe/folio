<template>
    <section class="hero is-light small-section">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    {{ pageTitle }}
                </h1>
                <h2 class="subtitle">
                    Last synced: {{ mapLastSynced || 'unknown' }}
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'the-hero',
    props: [ 'pageTitle', 'mapLastSynced' ]
  }
</script>

<style>
</style>
