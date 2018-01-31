<template>
    <div class="sort-wrapper tw-mb-2">
      <div>
        <button :disabled="sortBy === 'name-asc'" @click="orderBy('name-asc')"><span class="tw-text-sm">Name &uarr;</span></button>
        <button :disabled="sortBy === 'name-desc'" @click="orderBy('name-desc')"><span class="tw-text-sm">Name &darr;</span></button>
        <button :disabled="sortBy === 'qty-asc'" @click="orderBy('qty-asc')"><span class="tw-text-sm">Qty &uarr;</span></button>
        <button :disabled="sortBy === 'qty-desc'" @click="orderBy('qty-desc')"><span class="tw-text-sm">Qty &darr;</span></button>
      </div>
    </div>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'order-by',
    methods: {
      orderBy: function (order) {
        store.dispatch('setSort', order)
      }
    },
    computed: {
      sortBy: function () {
        return store.getters.sortBy
      }
    },
    mounted: function () {
    }
  }
</script>

<style>
  /**/
</style>
