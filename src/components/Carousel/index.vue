<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
    // 引入swiper
    import Swiper from "swiper";
    export default {
    name: "CarouselPic",
    props:['list'],
    // watch监听属性监听swiper轮播图的变化，当数据发生变化[]->有数据
    watch: {
        list: {
            //在初始显示时就立即执行一次
            immediate:true,
        // 如果执行handler方法，代表组件实例身上已经有了这个属性【数组：四个元素】
        handler() {
            // 函数执行无法保证v-for是否执行完毕，使用nextTick
            this.$nextTick(() => {
            new Swiper(this.$refs.cur, {
                loop: true, // 循环模式选项
                autoplay: true,
                // 如果需要分页器
                pagination: {
                el: ".swiper-pagination",
                // 点击按钮
                clickable: true,
                },
                // 如果需要前进后退按钮
                navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                },
            });
            });
        },
        },
    },
};
</script>

<style>
</style>