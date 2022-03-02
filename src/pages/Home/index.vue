<template>
  <!-- <router-link to="/">主页</router-link> -->
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <HotRank/>
    <YourLike/>
    <EveryFloors/>
    <EveryFloors/>
    <IsBrand/>
  </div>
</template>

<script>
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
}
</script>

<style>

</style>