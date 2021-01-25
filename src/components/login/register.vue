<template>
  <div class="p20">
    <p class="logo">
      <img class="logoImg"
           :src="logoimg"
           alt />
    </p>
    <input type="password"
           style="display: none;">
    <div class="memberset">
      <!-- <p>{{$t('m.registerpage.register1')}}</p> -->
      <p class="membersetTitle">
        <span>{{$t('m.registerpage.register1')}}</span>
        <button @click="changeOut">{{$t('m.loginpage.login12')}}</button>
      </p>
      <p class="incode">
        <i class="el-icon-s-custom"></i>
        <input type="text"
               v-model="zcdata.incode"
               :placeholder="$t('m.registerpage.register2')" />
      </p>
      <p class="nickname">
        <i class="el-icon-user-solid"></i>
        <input type="text"
               v-model="zcdata.nickname"
               :placeholder="$t('m.registerpage.register3')" />
      </p>
      <p class="mobile">
        <span><i class="el-icon-phone"></i>66</span>
        <input type="text"
               v-model="zcdata.mobile"
               maxlength="18"
               :placeholder="$t('m.registerpage.register4')" />
      </p>
      <p class="f-flex code"
         v-if="setupres == '1'">
        <i class="el-icon-orange"></i>
        <input type="text"
               v-model="zcdata.code"
               :placeholder="$t('m.registerpage.register5')" />
        <el-button type="primary"
                   @click="sendCode"
                   :disabled="iscode">{{countDown}}</el-button>
      </p>
      <p class="password">
        <i class="el-icon-lock"></i>
        <input type="text"
               onfocus="this.type='password'"
               autocomplete="off"
               v-model="zcdata.password"
               :placeholder="$t('m.registerpage.register8')" />
      </p>
      <p class="password1">
        <i class="el-icon-lock"></i>
        <input type="text"
               onfocus="this.type='password'"
               autocomplete="off"
               v-model="zcdata.password1"
               :placeholder="$t('m.registerpage.register9')" />
      </p>
      <p class="none"
         v-if="setupshuzires == '1'">
        <Verify @success="alert('success')"
                width="100%"
                height="50px"
                @error="alert('error')"
                ref="check"
                :type="1"></Verify>

      </p>
      <!-- <p>
      </p> -->
      <!-- button -->
      <p class="sumbitBtn">
        <el-button type="primary"
                   @click="reister">{{$t('m.registerpage.register10')}}</el-button>
      </p>
      <div class="golog"><span @click="gologin">{{$t('m.registerpage.register11')}}</span></div>
      <div class="golog">
      </div>
      <p>
        <a href="https://www.h8888h.xyz/share.apk">{{$t('m.registerpage.register12')}}</a>
      </p>
    </div>
    <!--  -->
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
    <!--  -->
    <div class="outBox_mask"
         v-if="openSendCode">
      <div class="outbox1">
        <div class="SendCodeBox">
          <Verify @success="isCheckSendCode('success')"
                  width="100%"
                  height="50px"
                  @error="isCheckSendCode('error')"
                  ref="check1"
                  :type="2"></Verify>
          <van-button type="info"
                      @click="isSendCode"
                      style="width:250px;height:40px"
                      plain
                      hairline>{{$t('m.registerpage.register27')}}</van-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Verify from 'vue2-verify'
export default {
  components: { Verify },
  data () {
    return {
      imageSrc: '',
      zcdata: {
        mobile: '',
        password: '',
        password1: '',
        nickname: '',
        code: '',
        incode: this.GetUrlParam('incode'),
      },
      iscode: false,
      logoimg: '',
      loginUrl: '',
      changeLanBox: false,
      // 
      code: '',
      setupres: '0', // 控制短信
      setupshuzires: '',  // 控制注册时的验证
      timer: null,
      outTime: 60,
      countDown: this.$t('m.registerpage.register7'),
      lang: 'th',
      checkCode: false, // 点击注册时验证码
      openSendCode: false, // 点击发送验证码时 确认是否打开发送手机验证码弹框
      checkSendCode: false, // 点击发送验证码后 是否可以发送手机验证码
    }
  },
  mounted () {
    this.logo()
    this.lang = localStorage.getItem('language')
  },
  methods: {
    // Verify 返回事件
    alert (val) {
      if (val == 'error') {
        this.$toast(this.$t('m.registerpage.register22'))
        return;
      } else {
        this.checkCode = true;
      }
    },
    // 同上
    isCheckSendCode (val) {
      if (val == 'error') {
        this.$toast(this.$t('m.registerpage.register28'))
        return;
      } else {
        this.openSendCode = false;
        this.getcode();
      }
    },
    // 用来确认是否可以发送手机验证码
    isSendCode () {
      let that = this;
      that.checkCode = false;
      this.$refs['check1'].checkCode()
    },
    //点击显示切换语言框
    changeOut () {
      this.changeLanBox = true;
    },
    // 点击隐藏语言切换确认框
    hideChange () {
      this.changeLanBox = false;
    },
    // 语言切换
    changeLangEvent () {
      if (this.lang == 'en') {
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
    logo () {
      this.$api.Post('logo').then(res => {
        this.logoimg = res.result.logo;
        this.loginUrl = res.result.loginurl;
        this.setupres = res.result.setupres
        this.setupshuzires = res.result.setupshuzires
        // this.setupshuzires = '1'
        // this.setupres = '0'
      })
    },
    gologin () {
      this.$router.push({ name: 'login' })
    },
    reister () {
      let that = this;
      that.checkCode = false;
      if (that.zcdata.incode == '') {
        that.$toast(this.$t('m.registerpage.register24'))
        return;
      }
      if (that.zcdata.nickname == '') {
        that.$toast(this.$t('m.registerpage.register13'))
        return;
      }
      if (that.zcdata.mobile == '') {
        that.$toast(that.$t('m.registerpage.register14'))
        return;
      }
      if (this.setupres == '1') {
        if (that.zcdata.code == '') {
          that.$toast(that.$t('m.registerpage.register16'))
          return;
        }
      }
      if (that.zcdata.password == '') {
        this.$toast(that.$t('m.registerpage.register17'))
        return;
      }
      if (that.zcdata.password != that.zcdata.password1) {
        that.$toast(that.$t('m.registerpage.register18'))
        return;
      }
      if (that.setupshuzires == '1') {
        this.$refs['check'].checkCode()
        if (that.checkCode == false) {
          that.$toast(that.$t('m.registerpage.register21'))
          return;
        }
      }
      that.$api.Post('register', that.zcdata).then(res => {
        setTimeout(() => { that.$toast(res.result.message) }, 1000)
        if (res.status == 1) {
          localStorage.setItem('mobile', this.zcdata.mobile)
          this.$router.push('/')
        } else {
          this.$refs['check'].refresh()
        }
      })
    },
    // 点击获取手机验证码 开启弹窗
    sendCode () {
      if (this.zcdata.mobile == '') {
        this.$toast(this.$t('m.registerpage.register19'))
        return;
      }
      this.openSendCode = true;
    },
    // 获取验证码
    getcode () {

      this.lang = localStorage.getItem('language')
      this.$api.Post('sendcode', { mobile: this.zcdata.mobile }).then(res => {
        this.$toast(res.result.message)
        if (res.status == 1) {
          this.iscode = true;
          if (!this.timer) {
            this.timer = setInterval(() => {
              if (this.lang == 'en-US' || this.lang == 'en') {
                this.countDown = this.$t('m.registerpage.register26') + ' ' + this.outTime + 's';
              } else {
                this.countDown = this.outTime + 's' + this.$t('m.registerpage.register26');
              }
              this.outTime -= 1;
              if (this.outTime < 0) {
                clearInterval(this.timer);
                this.countDown = this.$t('m.registerpage.register7');
                this.outTime = 60;
                this.timer = null;
                this.iscode = false;
              }
            }, 1000)
          }
        }
      })
    },
    openCode () {
      this.isVerify = true;
    },
    //paraName 等找参数的名称
    GetUrlParam (paraName) {
      var url = document.location.toString();
      var arrObj = url.split("?");

      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");

          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      }
      else {
        return "";
      }
    }
  },
  watch: {
    lang () {
      this.countDown = this.$t('m.registerpage.register7')
    }
  }
}
</script>

<style lang="less">
// .checkCodeBox{
//   width: 90%;
//   height: auto;
//   background: #0f1427;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%,-50%);
// }
.logo {
  text-align: center;
  margin: 1rem auto;
}
.logo img {
  width: 100px;
}
.logo {
  position: relative;
  text-align: center;
  margin: 20px auto;
}
.logoImg {
  display: inline-block;
  width: 270px !important;
}
.memberset {
  color: #ff8f74;
  > .membersetTitle {
    display: flex;
    justify-content: space-between;
    > span:nth-child(1) {
      font-weight: 600;
      font-size: 20px;
    }
  }
  > .incode {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 30px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > .nickname {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 60%;
      height: 100%;
    }
    span {
      padding: 14px 10px;
    }
  }
  > .mobile {
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
      display: inline-block;
      max-width: 20%;
      height: 100%;
      line-height: inherit;
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
  }
  > .password1 {
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
  > .none {
    margin: 10px 0 30px;
  }

  > .sumbitBtn {
    margin-top: 10px;
    button {
      width: 100%;
      border-radius: 4px;
      padding: 15px;
    }
  }
  > p:last-child {
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    color: #ff8f74;
    padding: 8px 20px;
    border: 1px #ff8f74 solid;
    border-radius: 4px;
    > a {
      color: #ff8f74;
    }
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
.golog {
  text-align: center;
  padding: 10px 0;
  color: #333333;
}
.outbox1 {
  height: 25% !important;
  background: #0f1427 !important;
  padding: 10px 0 20px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 8rem;
  height: 2.96rem;
  background-color: #fff;
  border-radius: 0.266667rem;
  overflow: hidden;
  white-space: nowrap;
}
.SendCodeBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
}
</style>
