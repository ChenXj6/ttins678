<!--  -->
<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Recharge.Recharge1')"
                   left-text
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="ras f-flex">
      <div class="recharges">
        <h4 style="margin:0 0 20px"
            v-if="pay_type == 'mppay'">{{$t('m.Recharge.Recharge5')}}</h4>
        <!-- <form class="form-horizontal js-ajax-form margin-top-20"> -->
        <div class="TipsBox"
             v-if="pay_type == 'mppay'">
          <!-- <label class="TipsLabel">IFSC</label> -->
          <input type="text"
                 class="form-control TipsTitle"
                 name="ifsc"
                 id="IFSC"
                 readonly
                 v-model="$store.state.ifsc">
          <div class="TipsBtn"
               @click="copyFn('#IFSC', 'IFSC')"><img src="../../assets/copy.png"
                 alt=""
                 style="width:25px;height:25px"></div>
        </div>
        <div class="TipsBox"
             v-if="pay_type == 'mppay'">
          <!-- <label class="TipsLabel">ReceiveVa</label> -->
          <input type="text"
                 class="form-control TipsTitle"
                 name="ifsc"
                 id="receiveVa"
                 readonly
                 v-model="$store.state.receiveVa">
          <div class="TipsBtn"
               @click="copyFn('#receiveVa', 'ReceiveVa')"><img src="../../assets/copy.png"
                 alt=""
                 style="width:25px;height:25px"></div>
        </div>

        <input type="text"
               class="form-control form-money"
               name="amount"
               readonly
               v-model="money">
        <p class="shoudong"
           v-if="pay_type == 'shoudong'">
          <label class="shoudongLabel">{{$t('m.Recharge.Recharge25')}}</label>
          <input class="shoudongInput"
                 :placeholder="$t('m.Recharge.Recharge25')"
                 v-model="payname"
                 readonly>
          <button class="copyBtn"
                  id="copyBtn1"
                  :data-clipboard-text="payname"
                  @click="copyFn('#copyBtn1', $t('m.Recharge.Recharge14'))"><img src="../../assets/copy.png"
                 alt=""
                 style="width:20px;height:20px"></button>
        </p>
        <p class="shoudong"
           v-if="pay_type == 'shoudong'">
          <span class="shoudongLabel">{{$t('m.Recharge.Recharge26')}}</span>
          <span class="shoudongInput"
                :placeholder="$t('m.Recharge.Recharge26')"
                readonly>{{bankdeposit}}</span>
          <button class="copyBtn"
                  id="copyBtn2"
                  :data-clipboard-text="bankdeposit"
                  @click="copyFn('#copyBtn2', $t('m.Recharge.Recharge15'))"><img src="../../assets/copy.png"
                 alt=""
                 style="width:20px;height:20px"></button>
        </p>
        <p class="shoudong"
           v-if="pay_type == 'shoudong'">
          <label class="shoudongLabel">{{$t('m.Recharge.Recharge27')}}</label>
          <input class="shoudongInput"
                 :placeholder="$t('m.Recharge.Recharge27')"
                 v-model="accountnumber"
                 readonly>
          <img class="copyBtn"
               id="copyBtn3"
               :data-clipboard-text="accountnumber"
               @click="copyFn('#copyBtn3', $t('m.Recharge.Recharge16'))"
               src="../../assets/copy.png"
               alt=""
               style="width:20px;height:20px">
        </p>
        <span v-if="pay_type == 'shoudong'"
              style="margin:10px 0">{{$t('m.Submit.task12')}}</span>
        <p class="shoudong submitImg"
           v-if="pay_type == 'shoudong'">
          <van-uploader :after-read="afterRead"
                        v-model="fileList"
                        accept="image/*"
                        :max-count="1">
          </van-uploader>
        </p>
        <p>
          <button v-if="pay_type == 'fakqtpay' || 'apay' || 'mixyd' || 'paytrust88' || 'fakgt' || 'shoudong'"
                  class="btn"
                  :class="sub ? 'noSub' : ''"
                  id="rzp-button1"
                  :disabled='sub'
                  @click="methods3">{{ sub ? time+'S' : $t('m.Recharge.Recharge3')}}</button>
          <button v-else-if="pay_type == 'mppay'"
                  class="btn"
                  :class="sub ? 'noSub' : ''"
                  id="rzp-button1"
                  :disabled='sub'
                  @click="methods2">{{ sub ? time+'S' : $t('m.Recharge.Recharge3')}}</button>
          <button v-else
                  class="btn"
                  :class="sub ? 'noSub' : ''"
                  id="rzp-button1"
                  :disabled='sub'
                  @click="methods1">{{ sub ? time+'S' : $t('m.Recharge.Recharge3')}}</button>
        </p>

        <!-- </form> -->
      </div>

    </div>
  </div>
</template>

<script src="../../api/import.js"></script>
<script>
import { clickPay, options } from "../../api/import";
import Clipboard from "clipboard";

export default {
  data () {
    return {
      money: '',
      value: '',
      columns: [],
      op: [],
      showPicker: false,
      host: process.env.NODE_ENV == 'development' ? 'http://5016.yesswl.top' : `${location.protocol}//${location.host}`,
      postData: {
      },
      money: '',
      sign: '',
      url: '',
      appid: '',
      out_trade_no: '',
      version: '',
      pay_type: '',
      callback_url: '',
      success_url: '',
      error_url: '',
      dislong: false,
      haveSign: true,
      sub: true,
      time: 3,
      timer: null,
      busi_code: '',
      payUrl: '',
      fakgt: {
        accNo: '',
        bank_code: '',
        paytype: ''
      },
      bankdeposit: '',
      payname: '',
      accountnumber: '',
      fileList: [],
      img: '',
      imgSrc: '',
      my_order_id: '',
      paychoose:'',
    }
  },
  methods: {
    methods1: function () {
      clickPay();
    },
    methods2 () {
      setTimeout(() => { this.$router.push({ name: 'index' }) }, 1000)
    },
    methods3 () {
      if (this.pay_type == 'shoudong') {
        if (this.imgSrc == '') {
          this.$toast(this.$t('m.Recharge.Recharge30'));
          return;
        }
        this.$api.Post('shoudongSub', { img: this.imgSrc, my_order_id: this.my_order_id }).then(res => {
          if (res.status == 1) {
            this.$toast(this.$t('m.Recharge.Recharge28'));
            setTimeout(() => { this.$router.push({ name: 'index' }) }, 1000)
          } else {
            this.$toast(this.$t('m.Recharge.Recharge29'));
          }
        })
      } else {
        location.href = this.payUrl
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    getSign () {
      let amount = this.money;
      let busi_code = this.busi_code;
      let accNo = this.fakgt.accNo;
      let bankCode = this.fakgt.bank_code;
      let paytype = this.fakgt.paytype;
      let paychoose = this.paychoose;
      return new Promise((resolve) => {
        this.$api.Post('get_sign', { paytype, amount, busi_code, accNo, bankCode ,paychoose}).then(res => {
          resolve(res)
        })
      })
    },
    afterRead (file) {
      this.$api.Post('uploader', { file: file.file }).then(res => {
        this.img = this.$imgHost + res.result;
        this.imgSrc = res.result
      })
    },
    copyFn (id, title) {
      var clipboard = new Clipboard(id)
      clipboard.on('success', e => {
        this.$toast({
          message: this.$t('m.Recharge.Recharge20')
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$toast({
          message: this.$t('m.Recharge.Recharge21')
        })
        console.log(this.$t('m.Recharge.Recharge22'))
        // 释放内存
        clipboard.destroy()
      })
    },

  },
  created () {
    this.money = this.$route.query.amount;
    this.busi_code = this.$route.query.busi_code;
    this.fakgt.bank_code = this.$route.query.bank_code;
    this.fakgt.accNo = this.$route.query.accno;
    this.fakgt.paytype = this.$route.query.paytype;
    this.paychoose = this.$route.query.paychoose;
    this.getSign().then(res => {
      if (res.result != '') {
        options.key = res.result.postData.key
        options.amount = res.result.postData.amount
        options.callback_url = res.result.postData.callback_url
        options.order_id = res.result.postData.pay_order_id
        this.pay_type = res.result.postData.pay_type;
        this.$store.state.receiveVa = res.result.postData.receiveVa;
        this.$store.state.ifsc = res.result.postData.ifsc;
        this.payUrl = res.result.postData.payUrl;
        this.bankdeposit = res.result.postData.bankdeposit;
        this.payname = res.result.postData.payname;
        this.accountnumber = res.result.postData.accountnumber;
        this.my_order_id = res.result.postData.my_order_id;
      }
    })

  },
  mounted () {
    setTimeout(() => {
      this.sub = false;
    }, 3000)
    this.timer = setInterval(() => {
      this.time--;
      if (this.time < 1) {
        clearInterval(this.timer)
      }
    }, 1000)
  },
}
</script>

<style scoped>
.btn {
  width: 100%;
  height: 50px;
  background-color: #409eff;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  margin: 10px 0;
  box-sizing: border-box;
}
.noSub {
  background-color: #999999;
}
.TipsBox {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 50px;
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  background-color: #999999;
}
.TipsLabel {
  width: 30%;
  /* background-color: #999999; */
  text-align: center;
}
.TipsTitle {
  width: 85%;
  background-color: #ffffff;
  text-align: center;
  color: #409eff;
}
.TipsBtn {
  max-width: 15%;
  width: 15%;
}
.shoudong {
  background-color: #fff7f2;
  border-radius: 8px;
  color: #eee;
  /* height: 50px; */
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.shoudong > .shoudongLabel {
  display: inline-block;
  max-height: 50px;
  width: 30%;
}
.shoudong > .shoudongInput {
  display: inline-block;
  height: 100%;
  width: 70%;
}
.shoudong > .copyBtn {
  width: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>