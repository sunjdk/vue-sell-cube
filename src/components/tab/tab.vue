<template>
<div class="tab">
  <cube-tab-bar :showSlider=true v-model="selectedLabel" :data="tabs" ref="tabBar" class="botder-bottom-1px" @click="clickHandler" @change="changeHandler">
  </cube-tab-bar>
  <div class="slide-wrapper">
    <cube-slide :loop=false :auto-play=false :show-dots=false :initial-index="index" ref="slide">
      <cube-slide-item>
        <goods></goods>
      </cube-slide-item>
      <cube-slide-item>
        <ratings></ratings>
      </cube-slide-item>
      <cube-slide-item>
        <seller></seller>
      </cube-slide-item>
    </cube-slide>
  </div>
</div>
</template>

<script>
import goods from 'components/goods/goods.vue'
import Ratings from 'components/ratings/ratings.vue'
import Seller from 'components/seller/seller.vue'
export default {
	components: { goods, Ratings, Seller },
  data(){
    return{
      selectedLabelDefault:'Vip',
      index:0,
       tabs: [{
        label: '商品',
        icon: 'cubeic-home'
      }, {
        label: '评价',
        icon: 'cubeic-like'
      }, {
        label: '商家',
        icon: 'cubeic-vip'
      }]
    }
  },
  computed:{
    selectedLabel:{
      get(){
        return this.tabs[this.index].label
      },
      set(newVal){
        this.index=this.tabs.findIndex((value)=>{
          return value.label === newVal
        })
      }
    }
  },  
  methods:{
    clickHandler(){

    },
    changeHandler(){

    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable";
.tab
  >>>.cube-tab
    padding:10px 0
  display: flex
  flex-direction: column
  height: 100%
  .slide-wrapper
    flex:1
    overflow: hidden
</style>