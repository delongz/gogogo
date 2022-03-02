<template>
  <div id="app">
    <IsHeader></IsHeader>
     <h2>
       <router-view></router-view>
     </h2>
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
  }
}
</script>

<style>

</style>
