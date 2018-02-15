<template>
    <tr class="tw-h-10">
        <td class="tw-w-64">{{wallet.name}}</td>
        <td class="tw-w-48"><a>{{wallet.address}}</a></td>
        <td class="tw-w-48 tw-text-right">

          <!-- Edit Amount -->
          <div v-if="showEditAmount">
            <div class="field has-addons">
              <div class="control">
                <input class="input is-small" :class="{'is-danger': formError.amount}" type="text" placeholder="Amount" v-model="amount" v-focus @keyup.enter="saveAmount(wallet.address)">
              </div>
              <div class="control">
                <button class="button is-small is-success" @click="saveAmount(wallet.address)">Save</button>
              </div>
            </div>
            <p class="help is-danger tw-text-left" v-show="formError.amount">{{ formError.amount }}</p>
          </div>

          <div v-else>
            {{wallet.amount}}
          </div>

        </td>
        <td class="tw-w-16">
          <div class="tw-relative">
            <div>
              <a class="add-wallet" @click="confirmDeleteWallet(wallet.address)"><i class="fa fa-times tw-text-red" aria-hidden="true" title="Edit amount"></i></a>
            </div>
            <div class="tw-mr-6">
              <a class="add-wallet" @click="editWallet(wallet.address)"><i class="fa fa-pencil-square-o tw-text-blue" aria-hidden="true" title="Delete wallet"></i></a>
            </div>

            <!-- Delete Confirmation -->
            <nav v-show="showDeleteConfirmation" class="level delete-wallet-confirmation">
              <div class="level-left">
                <div class="level-item">
                  Are you sure?
                </div>
              </div>

              <div class="level-right">
                <div class="level-item">
                  <a @click="deleteWallet(wallet.address)" class="button is-small is-success">YES</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <a @click="showDeleteConfirmation = false" class="button is-small is-danger">NO</a>
                </div>
              </div>
            </nav>

          </div>
        </td>
    </tr>
</template>

<script>
  import store from '../store'

  export default {
    name: 'wallet-item',
    props: ['symbol', 'wallet'],
    data: function () {
      return {
        showDeleteConfirmation: false,
        showEditAmount: false,
        amount: 0,
        formError: {}
      }
    },
    methods: {
      confirmDeleteWallet: function (walletAddress) {
        this.showDeleteConfirmation = true
      },
      deleteWallet: function (walletAddress) {
        store.dispatch('deleteWallet', { 'symbol': this.symbol, 'address': walletAddress })
        this.showDeleteConfirmation = false
      },
      editWallet: function (walletAddress) {
        this.amount = parseFloat(this.wallet.amount)
        this.showEditAmount = true
      },
      saveAmount: function (walletAddress) {
        this.formError = {
          name: null,
          address: null,
          amount: null
        }
        try {
          store.dispatch('updateWallet', { 'symbol': this.symbol, 'address': walletAddress, 'amount': parseFloat(this.amount) })

          this.amount = 0
          this.showEditAmount = false
        } catch (e) {
          switch (e.name) {
            // TODO
            // case 'WalletNameException':
              // this.formError.name = e.message
              // break
            // TODO
            // case 'WalletAddressException':
              // this.formError.address = e.message
              // break
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
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style>
  /**/
</style>
