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
        <form class="form-horizontal js-ajax-form margin-top-20">
          <!-- bigpay -->
          <div>
            <p>{{$t('m.Recharge.Recharge33')}}</p><br/>
            <div class=" van-hairline--top-bottom paychoose"
                 style="margin-bottom:20px"
                 v-if="pay_type == 'bigpay'">
              <el-button :type="paychoose == 1?'success':'info'"

                         @click="payChoose('bank')">{{$t('m.Recharge.Recharge31')}}</el-button>
              <el-button :type="paychoose == 2?'success':'info'"
                         @click="payChoose('code')">{{$t('m.Recharge.Recharge32')}}</el-button>
            </div>
          </div>

          <input type="text"
                 class="form-control form-money"
                 name="amount"
                 :disabled="!haveSign"
                 :placeholder="$t('m.Recharge.Recharge7')"
                 v-model="money">
          <div class="van-dropdown-menu van-hairline--top-bottom chargeInput"
               v-if="this.shoudongset == 1">
            <div role="button"
                 tabindex="0"
                 class="van-dropdown-menu__item"
                 @click="openShoudongPay">
              <span class="van-dropdown-menu__title">
                <div class="van-ellipsis">{{pType}}</div>
              </span>
            </div>
          </div>
          <!-- <div class="van-dropdown-menu van-hairline--top-bottom chargeInput" v-if="isHaveShoudong">
            <div role="button"
                 tabindex="0"
                 class="van-dropdown-menu__item"
                 @click="openChangePaytype"
                 >
              <span class="van-dropdown-menu__title">
                <div class="van-ellipsis">{{paytypeValue}}</div>
              </span>
            </div>
          </div> -->

          <input type="text"
                 v-if="this.pay_type == 'fakgt'"
                 class="form-control form-money"
                 name="amount"
                 :placeholder="$t('m.Balance.withdrawal15')"
                 v-model="accno">
          <input type="text"
                 v-if="this.pay_type == 'fakgt'"
                 class="form-control form-money"
                 name="amount"
                 @click="openChangeBankcode"
                 :placeholder="$t('m.Recharge.Recharge18')"
                 v-model="bankCode">
          <input type="text"
                 class="form-control form-hidden"
                 name="appid"
                 :value="appid">
          <input type="text"
                 class="form-control form-hidden"
                 name="out_trade_no"
                 :value="out_trade_no">
          <input type="text"
                 class="form-control form-hidden"
                 name="version"
                 :value="version">
          <input type="text"
                 class="form-control form-hidden"
                 name="pay_type"
                 :value="pay_type">
          <input type="text"
                 class="form-control form-hidden"
                 name="callback_url"
                 :value="callback_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="success_url"
                 :value="success_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="error_url"
                 :value="error_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="sign"
                 :value="sign">
          {{sign}}
          <div class="van-dropdown-menu van-hairline--top-bottom"
               style="margin-bottom:20px"
               v-if="pay_type == 'fakqtpay'">
            <div role="button"
                 tabindex="0"
                 class="van-dropdown-menu__item"><span class="van-dropdown-menu__title">
                <div class="van-ellipsis"
                     @click="tobsea()">{{defaultOp}}</div>
              </span>
            </div>
            <div>
              <div class="van-dropdown-item van-dropdown-item--down"
                   style="z-index: 10; top: 0px; display: none;"></div>
            </div>
          </div>

          <p>

            <el-button type="primary"
                       @click="openDialong"
                       class="btn"
                       v-if="haveSign">{{$t('m.Recharge.Recharge6')}}</el-button>
          </p>

        </form>
        <van-popup v-model="showPicker1"
                   position="bottom">
          <van-picker show-toolbar
                      :columns="option1"
                      @cancel="showPicker1 = false"
                      @confirm="onConfirm1"
                      :confirm-button-text="$t('m.Personal.Center23')"
                      :cancel-button-text="$t('m.Personal.Center24')" />
        </van-popup>
        <!-- pay_type -->
        <!-- <van-popup v-model="changePaytype"
                   position="bottom">
          <van-picker show-toolbar
                      :columns="paytypes"
                      @cancel="changePaytype = false"
                      @confirm="onChangePaytype"
                      :confirm-button-text="$t('m.Personal.Center23')"
                      :cancel-button-text="$t('m.Personal.Center24')" />
        </van-popup> -->
        <!-- bank code -->
        <van-popup v-model="changeBankcode"
                   position="bottom">
          <van-picker show-toolbar
                      :columns="bankCodes"
                      @cancel="changeBankcode = false"
                      @confirm="onChangeBankcode"
                      :confirm-button-text="$t('m.Personal.Center23')"
                      :cancel-button-text="$t('m.Personal.Center24')" />
        </van-popup>
        <!-- 手动 -->
        <van-popup v-model="shoudong"
                   position="bottom">
          <van-picker show-toolbar
                      :columns="pTypes"
                      @cancel="shoudong = false"
                      @confirm="onChangeShoudong"
                      :confirm-button-text="$t('m.Personal.Center23')"
                      :cancel-button-text="$t('m.Personal.Center24')" />
        </van-popup>
      </div>

    </div>
    <van-popup v-model="showPicker"
               position="bottom">
      <van-picker show-toolbar
                  :columns="columns"
                  @confirm="onConfirm"
                  @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
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
      defaultOp: this.$t('m.Recharge.Recharge8'),
      option1: [
        { text: this.$t('m.Recharge.Recharge8'), value: "MoMoPay" },
        { text: this.$t('m.Recharge.Recharge9'), value: 'ZaloPay' },
      ],
      paytypes: [
        { text: this.$t('m.Recharge.Recharge14'), value: 0 },
        { text: this.$t('m.Recharge.Recharge15'), value: 1 },
        { text: this.$t('m.Recharge.Recharge16'), value: 2 },
      ],
      bankCodes: [
        { text: 'KBANK', value: 'KBANK' },
        { text: 'BBL', value: 'BBL' },
        { text: 'BAAC', value: 'BAAC' },
        { text: 'BOA', value: 'BOA' },
        { text: 'BAY', value: 'BAY' },
        { text: 'BOC', value: 'BOC' },
        { text: 'BNPP', value: 'BNPP' },
        { text: 'CIMB', value: 'CIMB' },
        { text: 'CITI', value: 'CITI' },
        { text: 'DB', value: 'DB' },
        { text: 'GHB', value: 'GHB' },
        { text: 'ICBC', value: 'ICBC' },
        { text: 'TIBT', value: 'TIBT' },
        { text: 'CHAS', value: 'CHAS' },
        { text: 'KKB', value: 'KKB' },
        { text: 'KTB', value: 'KTB' },
        { text: 'LHBA', value: 'LHBA' },
        { text: 'MEGA', value: 'MEGA' },
        { text: 'MHCB', value: 'MHCB' },
        { text: 'SCBT', value: 'SCBT' },
        { text: 'SMTB', value: 'SMTB' },
        { text: 'TBNK', value: 'TBNK' },
        { text: 'GSB', value: 'GSB' },
        { text: 'HSBC', value: 'HSBC' },
        { text: 'SCB', value: 'SCB' },
        { text: 'SMBC', value: 'SMBC' },
        { text: 'TCRB', value: 'TCRB' },
        { text: 'TISCO', value: 'TISCO' },
        { text: 'TMB', value: 'TMB' },
        { text: 'UOB', value: 'UOB' },
      ],
      showPicker1: false,
      busi_code: 'MoMoPay',
      maxmoney: '',
      minmoney: '',
      pemail: '',
      phone: '',
      bankCode: '',
      accno: '',
      changePaytype: false,
      paytype: 2,
      paytypeValue: this.$t('m.Recharge.Recharge14'),
      changeBankcode: false,

      isHaveShoudong: false, // 控制fakgt下拉框是否显示与隐藏
      shoudongset: 0,
      pType: this.$t('m.Recharge.Recharge24'),// 手动与其他支付默认显示
      shoudong: false, // 控制手动下拉框显示
      pTypes: [], // 是否有手动输入框 
      flag: false, // 第一次进来加载手动与其他支付的数组

      pay_types: '',
      paychoose: 1,
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {
    this.logo()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
  },
  methods: {
    // bigpay
    payChoose (type) {
      if (type == 'bank') {
        this.paychoose = 1
      } else {
        this.paychoose = 2
      }
    },
    tobsea () {
      this.showPicker1 = true;
    },
    openDialong () {
      if (this.money == '') {
        this.$toast(this.$t('m.Recharge.Recharge10'))
        return
      }
      if (this.money < this.minmoney) {
        this.$toast(this.$t('m.Recharge.Recharge12') + this.minmoney)
        return
      } else if (this.money > this.maxmoney) {
        this.$toast(this.$t('m.Recharge.Recharge13') + this.maxmoney)
        return
      }

      if (this.pay_type == 'fakqtpay') {
        if (this.busi_code == '') {
          this.$toast(this.$t('m.Recharge.Recharge11'))
          return
        }
      }
      else if (this.pay_type == 'fakgt') {
        if (this.paytype == 2) {
          if (this.bankCode == '') {
            this.$toast(this.$t('m.Recharge.Recharge18'))
            return
          }
          if (this.accno == '') {
            this.$toast(this.$t('m.Balance.withdrawal15'))
            return
          }
        }
        // else if (this.paytype == 0) {
        //   this.$toast(this.$t('m.Recharge.Recharge17'))
        //   setTimeout(() => { this.changePaytype = true }, 500)
        //   return
        // } else if (this.paytype == 1){
        //   this.busi_code = '100202'
        // }
      }
      else if (this.pay_type == 'shoudong') {
        this.paytype = this.pay_type;
      }
      this.$router.push({ name: 'rchange', query: { paytype: this.paytype, amount: this.money, busi_code: this.busi_code, accno: this.accno, bank_code: this.bankCode, paychoose: this.paychoose } })

    },
    onClickLeft () {
      this.$router.go(-1)
    },
    logo () {
      this.$api.Post('logo').then(res => {
        if (res.status == 1) {
          this.maxmoney = Number(res.result.maxmoney)
          this.minmoney = Number(res.result.minmoney)
          this.shoudongset = res.result.shoudongset
          if (this.shoudongset === '1') {
            this.isHaveShoudong = false
            this.pay_types = res.result.pay_type;
          } else if (this.shoudongset === '0') {
            this.pay_type = res.result.pay_type;
          }
        }
      })
    },
    onConfirm (value, index) {
      this.value = index;
      this.showPicker = false;
      this.recharges(this.op[this.value].val);
    },
    onConfirm1 (e) {
      this.busi_code = e.value
      this.defaultOp = e.text
      this.showPicker1 = false;
    },
    // openChangePaytype(){
    //   this.changePaytype = true
    // },
    // openShoudongPay(){ // 打开下拉框
    //   this.shoudong = true;
    //   if(!this.flag){
    //     let arr = [];
    //     this.pTypes = [];
    //     let obj1 = {text:'Manual',value:'shoudong'},obj2 = {text:'',value:''};
    //     obj2.text = this.pay_types;obj2.value = this.pay_types;
    //     arr.push(obj1);arr.push(obj2)
    //     this.pTypes = arr;
    //     this.flag = true
    //   }
    // },
    onChangeShoudong (e) {
      if (e.value == 'shoudong') {
        this.pay_type = 'shoudong'
      } else if (e.value == 'fakgt') {
        this.pay_type = 'fakgt'
      } else {
        this.pay_type = e.value
      }
      this.pType = e.text;
      this.shoudong = false;
    },
    // 选择支付方式
    // onChangePaytype (e) {
    //   if (e.value == 0) {
    //     this.$toast(this.$t('m.Recharge.Recharge17'))
    //     return
    //   }
    //   this.paytype = e.value;
    //   this.paytypeValue = e.text;
    //   this.changePaytype = false;
    // },
    // 打开选择
    openChangeBankcode () {
      this.changeBankcode = true;
    },
    // 选择银行编码
    onChangeBankcode (e) {
      this.bankCode = e.value;
      this.changeBankcode = false
    },
    recharges (e) {
      if (this.money == '') {
        this.$toast(this.$t('m.Recharge.Recharge4'))
        return;
      }
      this.$api.Post('recharge', {
        money: this.money,
        PayType: e
      }).then(res => {
        if (res.status == 0) {
          this.$toast(res.result.message)
          return;
        }
        if (res.status == 1) {
          location.href = res.result.val;
        }
      })
    },
  },
  watch: {
    pay_type (val) {
      if (val == 'fakgt' || '') {
        this.isHaveShoudong = true
      } else {
        this.isHaveShoudong = false
      }
    }
  }
}
</script>
<style lang="less">
.ras {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.recharges {
  width: 80%;
  > p:nth-child(2) {
    margin-top: 30px;
    button {
      width: 100%;
    }
  }
  > p:nth-child(3) {
    margin-top: 15px;
    button {
      width: 100%;
    }
  }
}
.form-hidden {
  display: none;
}
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
.form-money {
  width: 100%;
  background-color: azure;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #999;
  text-align: left;
  text-indent: 10px;
}
.chargeInput {
  margin: 10px 0;
}
.paychoose {
  display: flex;
  align-content: center;
  justify-content: center;
  >button{
    width: 50%;
  }
}
</style>