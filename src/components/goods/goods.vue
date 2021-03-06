<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav :side="true" :data="goods" :options="scrollOptions" v-if="goods.length">
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar direction="vertical" :labels="props.labels" :txts="barTxts" :current="props.current">
            <template slot-scope="props">
              <div class="text">
                <support-ico v-if="props.txt.type>=1" :size=3 :type="props.txt.type"></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel v-for="item in goods" :key="item.name" :label="item.name" :title="item.name">
          <ul>
            <li v-for="food in item.foods" :key="food.name" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="food.name">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="onAdd"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
    </div>
  </div>
</template>
<script>
import { getGoods } from 'api/index'
import shopCart from '../shop-cart/shop-cart.vue'
import CartControl from '../cart-control/cart-control.vue'
import Bubble from '../bubble/bubble.vue'
import SupportIco from '../support-ico/support-ico.vue'
const ERR_OK = 0
export default {
  components: { shopCart, CartControl, Bubble, SupportIco },
  name: 'goods',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      goods: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller () {
      return this.data.seller
    },
    selectFoods () {
      let ret = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            ret.push(food)
          }
        })
      })
      return ret
    },
    barTxts () {
      let ret = []
      this.goods.forEach((good) => {
        const { type, name, foods } = good
        let count = 0
        foods.forEach((food) => {
          count += food.count || 0
        })
        ret.push({
          type, name, count
        })
      })
      return ret
    }
  },
  methods: {
    fetch () {
      getGoods().then((res) => {
        const response = res.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      })
    },
    onAdd (el) {
      this.$refs.shopCart.drop(el)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin";
@import "~common/stylus/variable";
.goods
  display: flex
  position: relative
  text-align: left
  height: 100%
  .scroll-nav-wrapper
    position: absolute
    width: 100%
    top:0
    left 0
    bottom: 48px
  >>> .cube-scroll-nav-bar
    width: 80px
    white-space:normal
    overflow hidden
  >>> .cube-scroll-nav-bar-item
    padding:0 10px
    display: flex
    align-items:center
    height:56px
    line-height:14px
    font-size:$font-size-small
    background:$color-background-ssss
    .text
      flex: 1
      position: relative
    .num
      position: absolute
      right: -8px
      top -10px
    .support-ico
      display: inline-block
      vertical-align: top
      margin-right:4px
    &.cube-scroll-nav-bar-item_active
      position: relative
      z-index: 10
      margin-top: -1px
      background: #fff
      font-weight: 700
  >>>.cube-sticky
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin:2px 0 8px 0
            height: 14px
            line-height: 14px
            color:rgb(7,17,27)
          .desc,extra
            line-height: 10px
            font size 10px
            color:rgb(147,153,159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin bottom 8px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color:rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size: 10px
              color:rgb(147,153,159)
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: 12px
  >>>.cube-sticky-content
        .cube-scroll-nav-panel-title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color:rgb(147,153,159)
          background: #f3f5f7
  .shop-cart-wrapper
    position: absolute
    bottom: 0
    background: #000
    color: #ffffff
</style>
