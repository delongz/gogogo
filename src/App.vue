<template>
  <div id="app">
    <IsHeader></IsHeader>
    <router-view></router-view>
    <IsFooter></IsFooter>
  </div>
</template>

<script>

import IsHeader from './components/Header/index'
import IsFooter from './components/Footer/index'
export default {
  name: 'App',
  components: {
      IsHeader,
      IsFooter
  },
  mounted(){
     // 派发一个action||获取商品分类三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
