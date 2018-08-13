<template>
  <section class="section tw-h-full tw-min-h-screen">

    <section class="tw-container tw-clearfix tw-w-full">
      
      <h6 class="settings">Backup</h6>

      <div class="columns">
        <div class="column">
          <h6>Export</h6>
          <p>You can export your saved movie lists in JSON format and then restore them from the saved backup.</p>
          <p>The file is saved to your default Downloads directory.</p>
          <br>

          <button class="button" @click.stop="exportData($event)">
            <i class="fa fa-download" aria-hidden="true"></i>&nbsp;Export
          </button>
        </div>

        <div class="column">

          <h6>Import</h6>
          <p>Import a previously saved JSON export of your data.</p>
          <p>This will overwrite your existing data.</p>
          <br>

          <div class="field">
            <div class="file" :class="{'has-name is-fullwidth': importedFileName}">
              <form id="fileImportForm">
                <label class="file-label">
                  <input class="file-input" type="file" name="import" @change="readFile($event)">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fa fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Import
                    </span>
                  </span>
                  <span class="file-name" v-text="importedFileName" v-if="importedFileName">
                  </span>
                </label>
              </form>
            </div>
          </div>

          <div class="field">
            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <button class="button is-success" @click="restoreConfirm = true" v-if="importedData">
                    Restore
                  </button>
                  &nbsp;&nbsp;
                  <a href="#" @click.prevent.stop="resetImportedData()" v-if="importedData" class="is-size-6 has-text-danger">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="notification is-info" v-if="restoreMsg">
            <button class="delete" @click="restoreMsg = null"></button>
            <p>{{restoreMsg}}</p>
            <p v-if="importedSeenlistCount">Seen: <strong>{{importedSeenlistCount}}</strong></p>
            <p v-if="importedWishlistCount">Wishlist: <strong>{{importedWishlistCount}}</strong></p>
          </div>

        </div>

      </div>

    </section>
  
  </section>
</template>

<script>
  import TheHero from './TheHero'
  import localStorage from '../store'
  // import moment from 'moment'
  import store from '@/store'
  // import FileBin from 'file-bin'
  // import store from '../store'
  // import _ from 'lodash'

  export default {
    name: 'backup-page',
    components: { TheHero },
    data: function () {
      return {
        importedFileName: '',
        importedData: null,
        importedSeenlistCount: null,
        importedWishlistCount: null,
        restoreConfirm: false,
        restoreMsg: null
      }
    },
    methods: {
      exportData: function ($event) {
        // const filename = `folio-data_${moment(new Date()).format('YYYY-MM-DD_HH.mm.ss')}.json`
        // const filename = `folio-data_${new Date()}.json`
        const filename = `folio-data_${Date.now('YYYY-MM-DD_HH.mm.ss')}.json`
        const exportStr = JSON.stringify({
          coins: this.coins,
          exchanges: this.exchanges,
          settings: this.settings,
          wallets: this.wallets
        })
        // let fileBin = new FileBin('./backups', ['.json'])
        // fileBin.write(filename, exportStr).then(file => console.log(file)).catch(e => console.log(e))

        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(exportStr)

        const link = document.createElement('a')
        link.href = dataUri
        link.style = 'visibility:hidden'
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      restoreData: async function () {
        // TODO: perhaps handle this more elegantly
        await window.localStorage.setItem('seenlist', JSON.stringify(this.importedData.seenlist))
        await store.dispatch('initSeenlist', JSON.parse(window.localStorage.getItem('seenlist')) || [])
        await window.localStorage.setItem('wishlist', JSON.stringify(this.importedData.wishlist))
        await store.dispatch('initWishlist', JSON.parse(window.localStorage.getItem('wishlist')) || [])
        this.resetImportedData()
        this.restoreConfirm = false
        this.restoreMsg = 'Data restored successfully'
      },
      readFile: async function ($event) {
        const $this = this
        const file = $event.target.files[0]
        if (file) {
          this.importedFileName = file.name
          const reader = new FileReader()
          reader.onload = await function (event) {
            $this.importedData = JSON.parse(event.target.result)
            $this.importedSeenlistCount = $this.importedData.seenlist.length
            $this.importedWishlistCount = $this.importedData.wishlist.length
          }
          reader.onerror = await function () {
            // handle file read error
          }
          await reader.readAsText(file)
        } else {
          $this.resetImportedData()
        }
      },
      resetImportedData: function () {
        // Reset the file input explicitly; simply clearing the data won't reset it properly
        document.getElementById('fileImportForm').reset()
        this.importedFileName = ''
        this.importedData = null
        this.restoreMsg = null
      }
    },
    computed: {
      // ...mapState([localStorage.getters.coins, localStorage.getters.exchanges, localStorage.getters.settings, localStorage.getters.wallets])
      // ...mapState(['coins', 'exchanges', 'settings', 'wallets'])
      coins () {
        return localStorage.getters.coins
      },
      exchanges () {
        return localStorage.getters.exchanges
      },
      settings () {
        return localStorage.getters.settings
      },
      wallets () {
        return localStorage.getters.wallets
      }
    }
  }
</script>

<style>
  /**/
</style>
