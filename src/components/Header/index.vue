<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>gogogo官网</p>&nbsp;
            <p v-if="!userInfo.name">
              <span>请</span>
              <!-- 声明式导航，注册登录界面 -->
              <router-link to="/login">登录</router-link>
              <router-link class="register" to="/register"
                >免费注册</router-link
              >
            </p>
            <p v-else>
              <!-- 登陆后的账号 -->
              <a href="###">{{ userInfo.name }}</a
              >&nbsp;|
              <a @click="userLogout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">客户服务</a>
            <a href="###">企业采购</a>
            <a href="###">网站导航</a>
            <a href="###">合作招商</a>
             <a href="###">手机 go</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
              @keyup.enter="goSearch"
            />
            <!-- 编程式导航 -->
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "IsHeader",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // 搜索按钮的回调函数，需要向search模块跳转
      // this.$router.push('/search')
      // 字符串方式传参params/query
      // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
      // 模板字符串写法
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 对象写法
      // 需要判断是否有query参数
      if(this.$route.query){
        this.$router.push({ name: "search",query:this.$route.query ,params: { keyword: this.keyword || undefined} });
      }
    },
    // 退出登录
    async userLogout(){
      try {
        // 派发action
        await this.$store.dispatch('userLogout')
        // 回到首页
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    // 通过全局事件总线清除keyword
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    // 获取小仓库中的用户信息
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      a{
        text-decoration: none;
      }
      a:hover{
        color: #3750db;
      }

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            color:#3750db;
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          margin-top:10px ;
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid rgb(54, 66, 234);
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          margin-top: 10px;
          height: 32px;
          width: 68px;
          background-color: rgb(54, 66, 234);
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>