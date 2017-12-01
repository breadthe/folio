<template>
    <aside class="menu">
        <ul class="menu-list" v-if="menuItems.length">
            <li v-for="item in menuItems">
                <a :href="item.path" @click="setMenuItemActive(item.name)" :class="item.active ? 'is-active' : ''">
                    <i :class="['fa', 'fa-' + item.logo]" aria-hidden="true"></i>&nbsp;&nbsp;{{ item.name }}
                </a>
            </li>
        </ul>
        <div class="conn-status">
            <p v-if="isConnected"><i class="fa fa-circle has-text-success" aria-hidden="true"></i>&nbsp;Connected</p>
            <p v-else><i class="fa fa-circle has-text-danger" aria-hidden="true"></i>&nbsp;Not Connected</p>
        </div>
    </aside>
</template>

<script>
  import store from '../store'
  import _ from 'lodash'

  export default {
    name: 'the-menu',
    data: function () {
      return {
        menuItems: [
          { path: '#/', name: 'Home', logo: 'home', active: false },
          { path: '#/watch-list', name: 'Watchlist', logo: 'area-chart', active: false },
          { path: '#/coin-map', name: 'Map', logo: 'map', active: false },
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
