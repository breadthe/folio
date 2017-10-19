<template>
    <aside class="menu">
        <ul class="menu-list" v-if="menuItems.length">
            <li v-for="item in menuItems">
                <a :href="item.path" @click="setMenuItemActive" ref="menuItem">
                    <i :class="['fa', 'fa-' + item.logo]" aria-hidden="true"></i>&nbsp;&nbsp;{{ item.name }}
                </a>
            </li>
        </ul>
    </aside>
</template>

<script>
  export default {
    name: 'the-menu',
    data: function () {
      return {
        menuItems: [
          { path: '#/', name: 'Home', logo: 'home', active: false },
          { path: '#/coin-map', name: 'Map', logo: 'map', active: false },
          { path: '#/settings', name: 'Settings', logo: 'gear', active: false },
          { path: '#/about', name: 'About', logo: 'question', active: false }
        ],
        menuItemIsSelected: true
      }
    },
    methods: {
      setMenuItemActive: function (e) {
        // Loop through each menu item and remove the 'is-active' class
        this.$refs.menuItem.forEach(i => { i.classList.remove('is-active') })

        // Set 'is-active' on the current item
        e.target.setAttribute('class', 'is-active')
      }
    },
    computed: {
    },
    mounted: function () {
      // Check if the current route is Home, in which case make the Home menu entry active
      if (this.$route.path === '/') {
        this.$refs.menuItem[0].setAttribute('class', 'is-active')
      }
    }
  }
</script>
