<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级联动面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索框面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 商品品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 属性信息面包屑 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{'icon-jiantouxia':isDown,'icon-jiantoushang':isUp}"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{'icon-jiantouxia':isDown,'icon-jiantoushang':isUp}"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 测试分页器 -->
          <IsPagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="totals" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "SearchPage",
  data() {
    return {
      searchParams: {
        // 一级列表
        category1Id: "",
        // 二级列表
        category2Id: "",
        // 三级列表
        category3Id: "",
        // 列表商品名称
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序方式
        order: "1:desc",
        // 页码
        pageNo: 1,
        // 每页数量
        pageSize: 3,
        // 商品属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 再发请求之前，把接口需要传递参数，进行整理（再给服务器发送请求之前，把参数整理好，服务器就会返回相应的参数）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  components: {
    SearchSelector,
  },
  // 组件挂在完毕之下只执行一次
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList",'totals']),
    // 计算是否升降序
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isDown() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    isUp() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
  methods: {
    // 向服务器发送请求获取search数据模块
    // 把方法分装在函数中，当需要的时候调用即可
    getData() {
      return this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    // 删除三级联动面包屑的内容
    removeCategoryName() {
      // 清楚后重写页面
      // 如果属性值为空的字符串的话，还是会把数据发送给服务器的
      // 把字段改为undefined的话，则不会发送给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category1Id = undefined;
      // 清除数据后重新发送
      this.getData();
      // 地址栏也需要重新修改
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$routeparams });
      }
    },
    // 删除搜索框面包屑的内容
    removeKeyword() {
      // 将关键词清空
      this.searchParams.keyword = undefined;
      // 重新发数据，刷新页面
      this.getData();
      // 通知兄弟组件header清除keyword
      this.$bus.$emit("clear");
      // 更改，清除params参数
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 自定义事件品牌信息
    trademarkInfo(trademark) {
      // 整理数据样式
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 删除品牌面包屑内容
    removeTrademark() {
      // 清除数据
      this.searchParams.trademark = undefined;
      // 重新发送数据
      this.getData();
    },
    // 自定义事件属性信息
    attrInfo(attr, attrValue) {
      // 重新阻止属性信息
      let info = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(info) == -1) {
        // 把信息推送给props
        this.searchParams.props.push(info);
      }
      // 重新获取数据发送服务器
      this.getData();
    },
    // 删除属性面包屑
    removeAttr() {
      this.searchParams.props = undefined;
      this.getData();
    },
    // 改变排序,flag形参代表传入的值
    changeOrder(flag){
      let originOrder = this.searchParams.order
      let changeFlag = originOrder.split(':')[0]
      let changeSolt = originOrder.split(':')[1]
      let newOrder = ''
      if(flag == changeFlag){
        newOrder = `${changeFlag}:${changeSolt=='desc'?'asc':'desc'}`
      } else{
        newOrder = `${flag}:${'desc'}`
      }
      this.searchParams.order = newOrder
       this.getData()
    },
    // 自定义事件--获取当前页面
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  // 监听搜索的变化
  watch: {
    $route() {
      // 数据改变后重新整理然后再发送给服务器
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // 清空三级联动标签的重复Id
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      this.searchParams.category1Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>