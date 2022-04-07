<template>
  <!-- <router-link to="/">主页</router-link> -->
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <HotRank/>
    <YourLike/>
    <EveryFloors v-for="(floor,index) in floorsList" :key="floor.id" :list="floor"/>
    <IsBrand/>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import HotRank from '@/pages/Home/HotRank'
import YourLike from '@/pages/Home/YourLike'  
import EveryFloors from '@/pages/Home/EveryFloors'  
import IsBrand from '@/pages/Home/IsBrand'  
export default {
    name:'IsHome',
    components:{
      ListContainer,
      TodayRecommend,
      HotRank,
      YourLike,
      EveryFloors,
      IsBrand
    },
    mounted(){
      // 获取楼梯商品的信息列表
      this.$store.dispatch('getFloorsList')
    },
    computed:{
      ...mapState({
        floorsList: state => state.home.floorsList
      })
    }
}
</script>