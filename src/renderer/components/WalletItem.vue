<template>
    <tr>
        <td>{{wallet.name}}</td>
        <td><a>{{wallet.address}}</a></td>
        <td class="tw-text-right">{{wallet.amount}}</td>
        <td><a class="add-wallet" @click="editWallet(wallet.address)"><i class="fa fa-pencil-square-o tw-text-blue" aria-hidden="true" title="Add wallet"></i></a></td>
        <td>
          <div class="tw-relative">
            <div class="tw-block">
              <a class="add-wallet" @click="confirmDeleteWallet(wallet.address)"><i class="fa fa-times tw-text-red" aria-hidden="true" title="Add wallet"></i></a>
            </div>

            <!-- Delete Confirmation -->
            <nav v-show="showDeleteConfirmation" class="level tw-absolute tw-bg-grey-dark tw-pin-r tw-py-1 tw-px-2 tw-w-64 tw-shadow-lg">
              <div class="level-left">
                <div class="level-item">
                  Are you sure?
                </div>
              </div>

              <div class="level-right">
                <div class="level-item">
                  <a @click="deleteWallet(wallet.address)">YES</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a @click="showDeleteConfirmation = false">NO</a>
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
        showDeleteConfirmation: false
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
        console.log(this.symbol, walletAddress)
      }
    },
    computed: {
    }
  }
</script>

<style>
  /**/
</style>
