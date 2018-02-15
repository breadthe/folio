<template>
  <div class="section tw-h-full tw-min-h-screen">

    <section class="container">

        <section class="tw-container tw-clearfix tw-w-full">

          <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <h6 class="tw-font-bold">Wallets</h6>
              </div>
              <div class="level-item">
                <a class="add-wallet" @click="openAddWallet"><i class="fa fa-plus tw-text-green-dark" aria-hidden="true" title="Add wallet"></i></a>
              </div>
            </div>

            <!-- Right side -->
            <!-- <div class="level-right">
              <a class="add-wallet" @click="openAddWallet"><i class="fa fa-plus tw-text-green-dark" aria-hidden="true" title="Add wallet"></i></a>
            </div> -->
          </nav>

          <!-- TODO: Make this a component -->
          <div class="add-wallet-wrapper" v-if="showAddWallet">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                    <div class="select">
                      <select v-model="newWallet.symbol">
                        <option v-for="coin in coins" :key="coin.symbol" :selected="newWallet.symbol">{{coin.symbol}}</option>
                      </select>
                    </div>
                </div>
                <div class="field">
                    <input class="input" :class="{'is-danger': formError.name}" type="text" placeholder="Name" v-model="newWallet.name" @keyup.enter="saveWallet">
                    <p class="help is-danger" v-show="formError.name">{{ formError.name }}</p>
                </div>
                <div class="field">
                    <input class="input" :class="{'is-danger': formError.address}" type="text" placeholder="Address" v-model="newWallet.address" @keyup.enter="saveWallet">
                    <p class="help is-danger" v-show="formError.address">{{ formError.address }}</p>
                </div>
                <div class="field">
                    <input class="input" :class="{'is-danger': formError.amount}" type="text" placeholder="Amount" v-model="amount" @keyup.enter="saveWallet">
                    <p class="help is-danger" v-show="formError.amount">{{ formError.amount }}</p>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-success" @click="saveWallet">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <wallets-wrapper></wallets-wrapper>

      </section>

    </section>

  </div>
</template>

<script>
  import store from '../store'
  import localStorage from '../store/localStorage'
  import WalletsWrapper from './WalletsWrapper'

  export default {
    name: 'wallets-page',
    components: { WalletsWrapper },
    data: function () {
      return {
        showAddWallet: false,
        amount: 0,
        newWallet: {
          symbol: 'BTC', // default to BTC when creating a new wallet
          name: '',
          address: '',
          amount: 0
        },
        formError: {}
      }
    },
    methods: {
      openAddWallet: function () {
        this.showAddWallet = !this.showAddWallet
      },
      saveWallet: function () {
        this.formError = {
          name: null,
          address: null,
          amount: null
        }
        try {
          store.dispatch('addWallet', this.newWallet)

          this.amount = 0
          this.newWallet = {
            symbol: 'BTC', // default to BTC when creating a new wallet
            name: '',
            address: '',
            amount: 0
          }
          this.showAddWallet = false
        } catch (e) {
          switch (e.name) {
            case 'WalletNameException':
              this.formError.name = e.message
              break
            case 'WalletAddressException':
              this.formError.address = e.message
              break
            case 'WalletAmountException':
              this.formError.amount = e.message
              break
            default:
              break
          }
        }
      }
    },
    computed: {
      coins: function () {
        return store.getters.coins
      }
    },
    watch: {
      amount: function (val) {
        this.newWallet.amount = parseFloat(this.amount)
      }
    },
    mounted: function () {
      store.dispatch('setWallets', localStorage.wallets.get())
    }
  }
</script>

<style>
  /**/
</style>
