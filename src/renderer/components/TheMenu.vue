<template>
    <aside class="menu tw-fixed tw-w-1/6">
        <the-logo :the-version="theVersion"></the-logo>

        <ul class="menu-list" v-if="menuItems.length">
            <li v-for="item in menuItems" :key="item.name">
                <a :href="item.path" @click="setMenuItemActive(item.name)" :class="item.active ? 'is-active' : ''">
                    <span><i class="fa fa-3x" :class="['fa-' + item.logo + ' ' + item.color]" aria-hidden="true"></i></span>
                    <span>{{ item.name }}</span>
                </a>
            </li>
        </ul>
        <div class="conn-status">
            <p :title="isConnected ? 'Connected' : 'Not Connected'">
              <i class="fa fa-circle fa-lg tw-mr-2" :class="isConnected ? 'has-text-success' : 'has-text-danger'" aria-hidden="true"></i>
            </p>
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
        required: true
      }
    },
    data: function () {
      return {
        menuItems: [
          { path: '#/', name: 'Dashboard', logo: 'tachometer', color: 'tw-text-red-dark', active: false },
          { path: '#/watch-list', name: 'Watchlist', logo: 'area-chart', color: 'tw-text-blue-dark', active: false },
          { path: '#/wallets', name: 'Wallets', logo: 'briefcase', color: 'tw-text-green-dark', active: false },
          { path: '#/settings', name: 'Settings', logo: 'cogs', color: 'tw-text-purple-dark', active: false },
          { path: '#/backup', name: 'Backup /\nRestore', logo: 'archive', color: 'tw-text-yellow-dark', active: false },
          { path: '#/about', name: 'About', logo: 'question', color: 'tw-text-orange-dark', active: false }
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
