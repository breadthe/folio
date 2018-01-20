<template>
    <aside class="menu tw-fixed tw-w-1/6">
        <the-logo :the-version="theVersion"></the-logo>

        <ul class="menu-list" v-if="menuItems.length">
            <li v-for="item in menuItems" :key="item.name">
                <a :href="item.path" @click="setMenuItemActive(item.name)" :class="item.active ? 'is-active' : ''">
                    <i :class="['fa', 'fa-' + item.logo]" aria-hidden="true"></i>&nbsp;&nbsp;{{ item.name }}
                </a>
            </li>
        </ul>
        <div class="conn-status">
            <p v-if="isConnected"><i class="fa fa-circle has-text-success tw-mr-2" aria-hidden="true"></i>Connected</p>
            <p v-else><i class="fa fa-circle has-text-danger tw-mr-2" aria-hidden="true"></i>Not Connected</p>
        </div>
    </aside>
</template>

<script>
  import store from '../store'
  import _ from 'lodash'
  import theLogo from '@/components/TheLogo.vue'

  export default {
    name: 'the-menu',
    components: { theLogo },
    props: {
      theVersion: {
        type: String,
        required: true,
        default: 'v0.0.0'
      }
    },
    data: function () {
      return {
        menuItems: [
          { path: '#/', name: 'Dashboard', logo: 'tachometer', active: false },
          { path: '#/watch-list', name: 'Watchlist', logo: 'area-chart', active: false },
          { path: '#/settings', name: 'Settings', logo: 'gear', active: false },
          { path: '#/about', name: 'About', logo: 'question', active: false }
        ],
        menuItemIsSelected: true
      }
    },
    methods: {
      setMenuItemActive: function (name) {
        // Loop through each menu item and make 'active' false
        this.menuItems.map(function (i) { i.active = false })

        // Find the array index for the item that matches the name of the currently selected menu item
        const ix = _.findIndex(this.menuItems, function (o) { return o.name === name })
        // Set 'active' on the current item
        this.menuItems[ix].active = true

        // Set the currently selected menu item in Vuex
        store.commit('UPDATE_SELECTED_MENU_ITEM', name)
      }
    },
    computed: {
      isConnected: function () {
        return store.getters.connect
      }
    },
    mounted: function () {
      // Retrieve the default (Home) selected menu item from Vuex and activate the corresponding menu item
      this.setMenuItemActive(store.getters.selectedMenuItem)
    }
  }
</script>
