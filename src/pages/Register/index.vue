<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        欢迎注册!
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          placeholder="请输入手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <button class="ver-code" @click="getCode">发送验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入6-20位密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{6,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请再次输入密码"
          v-model="password2"
          name="password2"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password2') }"
        />
        <span class="error-msg">{{ errors.first("password2") }}</span>
      </div>
      <div class="controls">
        <input
          type="checkbox"
          v-model="agree"
          name="agree"
          v-validate="{ required: true, tongyi: true }"
          :class="{ invalid: errors.has('agree') }"
        />&nbsp;
        <span>同意协议并注册《go用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <el-button :plain="true" @click="userRegister" class="regbutton"
          >注&nbsp;&nbsp;&nbsp;册</el-button
        >
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>人才招聘</li>
        <li>销售联盟</li>
        <li>go社区</li>
      </ul>
      <div class="address">地址：宇宙中心</div>
      <div class="beian">beian beian beian</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IsRegister",
  data() {
    return {
      phone: "",
      code: "",
      // 密码
      password: "",
      // 确认密码
      password2: "",
      // 是否同意
      agree: false,
    };
  },
  methods: {
    async getCode() {
      const { phone } = this;
      // 判断是否有手机号
      try {
        // 将验证码自动输入（省钱）
        phone && (await this.$store.dispatch("getCode", this.phone));
        this.code = this.$store.state.user.code;
      } catch (error) {
        alert(error.message);
      }
    },
    // 用户完成注册
    async userRegister() {
      const { phone, code, password, password2 } = this;
      //全部表单验证成功
      const success = await this.$validator.validateAll();
      // 全部验证成功后再向服务器发送请求
      if (success) {
        try {
          // 满足派发action
          await this.$store.dispatch("sendUserResister", {
            phone,
            code,
            password,
          });
          // 成功后跳转登录界面
          this.$router.push("/login");
        } catch (error) {
          this.$message.error({
            message: "手机号已被注册！",
            offset: 60,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 900px;
    height: 440px;
    box-shadow: 5px 10px 15px rgb(196, 196, 196);
    margin: 10px auto;
    margin-bottom: 20px;
    border: 5px;

    h3 {
      background: #f5f4f4;
      margin: 0;
      padding: 6px 15px;
      color: rgb(70, 70, 70);
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: rgb(54, 66, 230);
          text-decoration: none;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 230px;
      margin-bottom: 20px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin: 0 7px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 335px;
        color: rgb(255, 60, 0);
      }

      .ver-code:hover {
        background: rgb(223, 222, 222);
      }

      .ver-code {
        // outline: none;
        border: 1px solid rgb(158, 157, 157);
        width: 86px;
        height: 36px;
        // margin-left: 2px;
        vertical-align: bottom;
        background: rgb(228, 225, 225);
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 355px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 25px;
    

      .regbutton {
        // outline: none;
        width: 270px;
        height: 40px;
        background: rgb(54, 66, 230);
        color: #fff ;
        display: inline-block;
        border: 1px solid rgb(255, 255, 255);
        font-size: 12px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>