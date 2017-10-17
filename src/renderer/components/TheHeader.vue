<template>
    <nav class="navbar" role="navigation" aria-label="dropdown navigation">
        <a class="navbar-item">
            <i class="fa fa-bar-chart" aria-hidden="true"></i>&nbsp;H
        </a>

        <div class="navbar-item has-dropdown"><!-- is-active -->
            <a class="navbar-link">
                Docs
            </a>

            <div class="navbar-dropdown">
                <a class="navbar-item">
                    Overview
                </a>
                <a class="navbar-item is-active">
                    Elements
                </a>
                <a class="navbar-item">
                    Components
                </a>
                <hr class="navbar-divider">
                <div class="navbar-item">
                    Version 0.6.0
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {
    name: 'the-header',
    data () {
      return {
        menuIsActive: false
      }
    },
    methods: {
      toggleMenu: function () {
        this.menuIsActive = !this.menuIsActive
      }
    }
  }
</script>

<style>
</style>
