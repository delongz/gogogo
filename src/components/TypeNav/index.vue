<template>
  <!-- 导航分类---三级联动 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveCurrent" @mouseenter="enterType">
        <h2 class="all" >全部商品分类</h2>
      <!-- 三级联动 -->
      <!-- 过渡动画 -->
     <transition name="sort">
      <div class="sort" v-show="show">
         <!-- 使用编程式跳转+事件委派 -->
        <div class="all-sort-list2" @click="goSearch">
          <!-- 一级分类 -->
          <div class="item" 
            v-for="(c1,index) in categoryList.data" 
            :key="c1.categoryId"
            :class="{cur:currentIndex==index}">
            <h3 @mouseenter="changeCurrent(index)">
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <!-- 二、三级联动 -->
            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
              <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt >
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div> 
        </div>
      </div>
     </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">go超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
     
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data(){
    return{
      // 设置样式变化时的初始索引值
       currentIndex:-1,
      // 三级联动样式展开
       show:true,
    }
  },
  mounted(){
    if(this.$route.path !='/home'){
      this.show = false
    }
  },
  computed:{
    ...mapState({
      // 右侧需要的是一个函数，当使用这个右侧函数的时候，计算数据就会调用一次
      categoryList:state=> state.home.categoryList
    })
  },
  methods:{
    // 节流鼠标滑动
    changeCurrent:throttle(function(index){
       this.currentIndex = index
    },50),
    // 鼠标移入全部商品展开
    enterType(){
      this.show =true
    },
    // 鼠标离开
    leaveCurrent(){
      // 商品索引
      this.currentIndex=-1
      // 当不在home页面时鼠标移开不展示
      if(this.$route.path !='/home'){
        this.show= false
      }
    },

    // 跳转到search页面
    goSearch(event){
      // 1把子节点中所有a标签绑定自定义属性data-categoryName，
      let element = event.target
      // dataset可以获取节点的自定义属性和属性值(解构赋值)
      let {categoryname,category1id,category2id,category3id} = element.dataset
      if(categoryname){
        let location = {name:'search'}
        let query = {categoryName:categoryname}
        // 一级二级三级的a标签
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else {
          query.category3Id = category3id
        }
        // 合并参数
        location.query = query
        if(this.$route.params){
          location.params = this.$route.params
          this.$router.push(location)
        }
      }
    }
  }
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid rgb(54, 66, 234);
  h2,a{
    cursor: pointer;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: rgb(54, 66, 234);
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        text-decoration: none;
        cursor: pointer;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 462px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
          height: 30*15+8px;
          overflow: hidden;
        .item {
          h3 {
            line-height: 31px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                    font-size: 12px;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur{
          background-color: skyblue;
        }
      }
    }

  // 三级联动过渡动画
    .sort-enter,.sort-leave-to{
        height: 0;
    }
    .sort-enter-to,.sort-leave{
      height: 462px;
    }
    .sort-enter-active,.sort-leave-active{
      transition: all .2s linear;
    }
  }
}
</style>