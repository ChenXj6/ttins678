<template>
  <div class="p20"
       style="position: relative;">
    <p class="logo">
      <img class="logoImg"
           :src="logoimg"
           alt />
    </p>
    <div class="memberlogin mt4">
      <p class="memberlogin_t">
        <span>{{$t('m.loginpage.login1')}}</span>
        <button @click="changeOut">{{$t('m.loginpage.login12')}}</button>
      </p>
      <p class="mobile">
        <i class="el-icon-user"></i>66
        <input type="text"
               v-model="mobile"
               maxlength="18"
               :placeholder="$t('m.loginpage.login2')" />
      </p>
      <p class="f-flex password">
        <i class="el-icon-lock"></i>
        <input type="password"
               v-model="password"
               :placeholder="$t('m.loginpage.login3')" />

      </p>
      <p class="code"
         v-if="setupshuzires == '1'">
        <Verify @success="alert('success')"
                width="100%"
                height="50px"
                @error="alert('error')"
                ref="check"
                :type="1"></Verify>
      </p>
      <p class="submit">
        <el-button type="primary"
                   @click="login">{{$t('m.loginpage.login5')}}</el-button>
      </p>
      <p class="goset">
        <!-- <span @click="forget">{{$t('m.loginpage.login4')}}</span> -->
        <br><span @click="goset">{{$t('m.loginpage.login6')}}</span>
        <br>
        <!-- <span><a :href="loginUrl"
             style="color:#5d70bd">{{$t('m.loginpage.login11')}}</a></span> -->
      </p>
      <p class="xiazai">
        <a href="https://www.h8888h.xyz/share.apk">{{$t('m.loginpage.login7')}}</a>
        <!-- <button>{{$t('m.loginpage.login12')}}</button> -->
      </p>
    </div>
    <div class="outBox_mask"
         v-if="changeLanBox">
      <div class="outbox">
        <p class="out_Tips">{{$t('m.Personal.Center27')}}</p>
        <div class="out_btn_box">
          <p class="cancel"
             @click="hideChange">{{$t('m.Personal.Center24')}}</p>
          <p class="determine"
             @click="changeLangEvent">{{$t('m.Personal.Center23')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from 'vue2-verify'

export default {
  components: {
    Verify
  },
  data () {
    return {
      mobile: localStorage.getItem('mobile') || '',
      password: '',
      logoimg: '',
      lang: 'yn',
      loginUrl: '',
      changeLanBox: false,
      checkCode: false,
      setupshuzires:'',
    }
  },
  updated () {
    // window.localStorage.setItem("language", "yn");
    var language_val = localStorage.getItem("language");
    this.lang = language_val;
  },
  mounted () {
    let islogin = this.getCookie3("openid") || false;
    if (islogin != false) {
      this.$router.push({ name: 'index' })
    }
    this.logo()
  },
  methods: {
    alert (val) {
      if (val == 'error') {
        this.$toast(this.$t('m.registerpage.register22'))
        return;
      } else {
        this.checkCode = true;
      }
    },
    //点击显示切换语言框
    changeOut () {
      this.changeLanBox = true;
    },
    // 点击隐藏语言切换确认框
    hideChange () {
      this.changeLanBox = false;
    },
    logo () {
      this.$api.Post('logo').then(res => {
        this.logoimg = res.result.logo
        this.loginUrl = res.result.loginurl
        this.setupshuzires = res.result.setupshuzires
        // this.setupshuzires = '1'

      })
    },
    login () {
      let that = this;
      that.checkCode = false;
      if (that.setupshuzires == '1') {
        this.$refs['check'].checkCode()
        if (that.checkCode == false) {
          that.$toast(that.$t('m.registerpage.register21'))
          return;
        }
      }

      if (that.mobile == '') {
        that.$toast(that.$t('m.loginpage.login8'))
        return;
      }
      if (that.password == '') {
        that.$toast(that.$t('m.loginpage.login9'))
        return
      }
      that.$api.Post('login', {
        mobile: that.mobile,
        password: that.password
      }).then(res => {
        if (res.status == 1) {
          that.$toast(that.$t('m.loginpage.login10'))
          that.setCookie('openid', res.result.openid)
          that.$router.push({ name: 'index' })
        } else {
          that.$toast(res.result.message)
          this.$refs['check'].refresh()

        }
      })

    },
    //注册
    goset () {
      this.$router.push({ name: 'register' })
    },
    //忘记密码
    forget () {
      this.$router.push({ name: 'forget' })
    },

    getCookie3 (name) {
      //可以搜索RegExp和match进行学习
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },

    // 语言切换
    changeLangEvent () {
      if (this.lang == 'en' || this.lang == 'en-US') {
        this.lang = 'th';
        this.$i18n.locale = this.lang;//关键语句
        window.localStorage.setItem("language", this.lang);
      } else {
        this.lang = 'en';
        this.$i18n.locale = this.lang;//关键语句
        window.localStorage.setItem("language", this.lang);
      }
      this.changeLanBox = false
    },

    setCookie (c_name, value, expire) {
      var date = new Date()
      date.setSeconds(date.getSeconds() + expire)
      document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
    }

  }
};
</script>

<style lang="less" scope>
.logo {
  position: relative;
  text-align: center;
  margin: 20px auto;
}
.logoImg {
  display: inline-block;
  width: 270px !important;
}
.select_box {
  position: absolute;
  right: 40px;
  top: 20px;
  height: 25px;
}
.select_box select {
  height: 100%;
}
.memberlogin {
  color: #ff8f74;
  > .memberlogin_t {
    display: flex;
    justify-content: space-between;
    > span:nth-child(1) {
      font-weight: 600;
      font-size: 20px;
    }
  }
  > .mobile {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 30px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
    span {
      display: inline-block;
      max-width: 20%;
      height: 100%;
      line-height: inherit;
    }
  }
  > .password {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
    span {
      padding: 14px 10px;
    }
  }
  > .code {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > .submit {
    margin: 70px auto 0;
    button {
      width: 100%;
      border-radius: 4px;
      padding: 15px;
    }
  }
  > .goset {
    margin-top: 10px;
    text-align: center;
    color: #333333;
    line-height: 1.8;
  }
  > .xiazai {
    margin-top: 30px;
    text-align: center;
    color: #ff8f74;
    font-size: 16px;
    i {
      padding: 0;
    }
    a {
      color: #ff8f74;
      padding: 8px 20px;
      border: 1px #ff8f74 solid;
      border-radius: 4px;
    }
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
</style>
