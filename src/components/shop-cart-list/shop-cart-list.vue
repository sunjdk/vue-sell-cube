<template>
  <transition name="fade">
    <cube-popup v-show="visible" :mask-closable=true :z-index=90 position="buttom" type="shop-cart-list" @mask-click="maskClick">
      <transition name="move">
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.name">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>
<script>
import CartControl from 'components/cart-control/cart-control'
const EVENT_HIDE = 'hide'
export default {
  name: 'shop-cart-list',
  components: {
    CartControl
  },
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    maskClick () {
      this.hide()
    },
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
      this.$emit(EVENT_HIDE)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable";
.cube-shop-cart-list
  bottom: 48px
  &.fade-enter,&.fade-leave-active
    opacity 0
  &.fade-enter-active,&.fade-leave-active
    transition:all .3s ease-in-out
  .move-enter,.move-leave-active
    transform: translate3d(0,100%,0)
  .move-enter-active,.move-leave-active
    transition: all .3s ease-in-out
  .list-header
    height: 40px
    line-height: 40px
    padding: 0 18px
    background: $color-background-ssss
    .title
      float: left
      font-size: $fontsize-medium
      color: $color-dark-grey
    .empty
      float: right
      font-size: 12px
      color: rgb(0, 160, 220)
  .list-content
    padding:0 18px
    max-height: 217px
    overflow: hidden
    background: #fff
    .food
      position: relative
      padding: 12px 0
      box-sizing: border-box
      .name
        line-height: 24px
        font-size: 14px
        color:rgb(7,17,27)
      .price
        position:absolute
        right: 90px
        bottom: 12px
        line-height: 24px
        font-size 14px
        font-weight: 700
        color:rgb(240,20,20)
      .cart-control-wrapper
        position: absolute
        right:0
        bottom:6px
</style>
