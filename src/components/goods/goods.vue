<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        @change="changeHandler"
        @sticky-change="stickyChangeHandler"
        v-if="goods.length"
      >
        <cube-scroll-nav-panel
          v-for="item in goods"
          :key="item.name"
          :label="item.name"
          :title="item.name">
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
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
  </div>
</template>
<script>
import { getGoods } from 'api/index'
const ERR_OK = 0
export default {
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
  methods: {
    changeHandler (label) {
      console.log('changed to:', label)
    },
    stickyChangeHandler (current) {
      console.log('sticky-change', current)
    },
    fetch () {
      getGoods().then((res) => {
        const response = res.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin";
@import "~common/stylus/variable";
.goods
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
</style>
