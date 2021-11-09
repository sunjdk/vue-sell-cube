<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"/>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import { urlParse } from 'common/js/util'
import { getSeller } from 'api/index'
import Tab from './components/tab/tab.vue'
import Goods from 'components/goods/goods.vue'
import Ratings from 'components/ratings/ratings.vue'
import Seller from 'components/seller/seller.vue'

const ERR_OK = 0
const debug = process.env.NODE_ENV !== 'production'

export default {
  name: 'app',
  components: {
    VHeader,
    Tab
  },
  computed: {
    tabs () {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created () {
    const url = debug ? '/api/seller' : 'http://ustbhuangyi.com/sell/api/seller'
    getSeller(url + '?id=' + this.seller.id).then(res => {
      const response = res.data
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data)
      }
    })
  }
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  .tab-wrapper
    position: fixed
    top:136px;
    left: 0
    right: 0
    bottom: 0
</style>
