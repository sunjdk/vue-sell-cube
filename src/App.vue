<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import { urlParse } from 'common/js/util'
import { getSeller } from 'api/index'

const ERR_OK = 0
const debug = process.env.NODE_ENV !== 'production'

export default {
  name: 'app',
  components: {
    'v-header': VHeader
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
      console.log(response)
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
</style>
