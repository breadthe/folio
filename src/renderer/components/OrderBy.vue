<template>
    <div class="sort-wrapper tw-mb-2">
      <div>
        <a :class="{'active': sortBy === 'name-asc'}" @click="orderBy('name-asc')"><span class="tw-text-sm">Name &uarr;</span></a>
        <a :class="{'active': sortBy === 'name-desc'}" @click="orderBy('name-desc')"><span class="tw-text-sm">Name &darr;</span></a>
        <a :class="{'active': sortBy === 'qty-asc'}" @click="orderBy('qty-asc')"><span class="tw-text-sm">Qty &uarr;</span></a>
        <a :class="{'active': sortBy === 'qty-desc'}" @click="orderBy('qty-desc')"><span class="tw-text-sm">Qty &darr;</span></a>
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
