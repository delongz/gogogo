<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--carousel全局组件-->
       <CarouselPic :list="bannerList"/>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ListContainer",
  mounted() {
    // 派发action，通知Vuex发送ajax请求，将数据存储在仓库中
    this.$store.dispatch("getBannerList");
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
 
};
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 990px;
      height: 100%;
      padding: 5px;
      float: left;
    }   
  }
}
</style>