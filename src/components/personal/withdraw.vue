<template>
  <div class="bje">
    <div>
      <van-nav-bar :title="$t('m.Balance.withdrawal1')"
                   left-text
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="f-flex f-jc-sb with-m">
      <span>{{$t('m.Balance.withdrawal2')}}：{{currency}} {{money}}{{numberUnit}}</span>
      <a href="#"
         @click="alltx">{{$t('m.Balance.withdrawal3')}}</a>
    </div>
    <div class="with-num p20">
      <p style="color: #999999">{{$t('m.Balance.withdrawal4')}}</p>
      <p class="f-flex">
        <span style="color:#666666">{{currency}}</span>
        <input type="number"
               style="color:#666666"
               v-model="amount.withdraw_money" />
      </p>
    </div>
    <p class="division"></p>
    <div class="with-type">
      <p>{{$t('m.Balance.withdrawal5')}}</p>
      <!-- <p class="f-flex f-jc-sb">
            <span><img src="../../assets/zfb.png" alt="">提现到支付宝</span>
             <el-radio v-model="radio" label="1"></el-radio>
        </p> -->
      <p class="f-flex f-jc-sb">
        <span v-if="amount.type == 4"><img src="../../assets/bank.png"
               alt="" />{{$t('m.Balance.withdrawal6')}}</span>
        <span v-else><img src="../../assets/bank.png"
               alt="" />{{$t('m.Balance.withdrawal25')}}</span>
        <el-radio v-model="radio"
                  label="2"></el-radio>
      </p>
      <p>
        <van-field v-model="amount.username"
                   :placeholder="amount.type == 4 ? $t('m.Balance.withdrawal7') : $t('m.Balance.withdrawal26')"
                   :label="$t('m.Balance.withdrawal8')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'fakqtpay' && pay_type != 'paytrust88' && pay_type != 'fakgt' && pay_type != 'bigpay'">
        <van-field maxlength="11"
                   v-model="amount.tel"
                   :placeholder="$t('m.Balance.withdrawal9')"
                   :label="$t('m.Balance.withdrawal10')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'fakqtpay' && pay_type != 'paytrust88' && pay_type != 'fakgt' && pay_type != 'bigpay'">
        <van-field v-model="amount.bank_name"
                   :placeholder="$t('m.Balance.withdrawal11')"
                   :label="$t('m.Balance.withdrawal12')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'paytrust88' && pay_type != 'fakgt' && pay_type != 'bigpay'">
        <van-field v-model="amount.bank_card"
                   :placeholder="$t('m.Balance.withdrawal13')"
                   :label="$t('m.Balance.withdrawal14')" />
      </p>
      <p v-if="pay_type != 'fakqtpay' && pay_type != 'paytrust88' && pay_type != 'fakgt' && pay_type != 'bigpay'">
        <van-field maxlength="11"
                   v-model="amount.ifsc"
                   :placeholder="$t('m.Balance.withdrawal28')"
                   :label="$t('m.Balance.withdrawal27')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'fakqtpay' && pay_type != 'paytrust88' ">
        <van-field v-model="amount.accno"
                   :placeholder="$t('m.Balance.withdrawal15')"
                   :label="$t('m.Balance.withdrawal16')" />
      </p>
      <p v-if="pay_type == 'fakqtpay' || pay_type == 'fakgt' || pay_type == 'bigpay'">
        <van-field v-model="amount.bank_code"
                   @click="openChangeBankcode"
                   :placeholder="$t('m.Balance.withdrawal30')"
                   :label="$t('m.Balance.withdrawal29')" />
      </p>
      <!-- pay88 -->
      <p v-if="pay_type == 'paytrust88'">
        <van-field v-model="amount.iban"
                   :placeholder="$t('m.Balance.withdrawal31')"
                   :label="$t('m.Balance.withdrawal32')" />
      </p>
    </div>
    <div class="with-btn">
      <el-button type="primary"
                 @click="withdrae(amount.type)">{{$t('m.Balance.withdrawal17')}}</el-button>
    </div>
    <!-- <van-popup v-model="changeBankcode"
                position="bottom">
      <van-picker show-toolbar
                  :columns="bankCodes"
                  @cancel="changeBankcode = false"
                  @confirm="onChangeBankcode"
                  :confirm-button-text="$t('m.Personal.Center23')"
                  :cancel-button-text="$t('m.Personal.Center24')" />
    </van-popup> -->
    <van-popup v-model="changeBankcode"
               position="bottom">
      <div class="van-picker">
        <div class="van-hairline--top-bottom van-picker__toolbar">
          <div class="van-picker__cancel"
               @click="changeBankcode = false">{{$t('m.Personal.Center24')}}</div>
          <div class="van-picker__confirm"
               @click="onChangeBankcode">{{$t('m.Personal.Center23')}}</div>
        </div>
        <div class="van-picker__columns"
             style="height: 220px">
          <div class="van-picker-column"
               @scroll="change_picker_scroll"
               style="height: 220px;overflow-y: auto;">
            <ul class="transition: all 0ms ease 0s; transform: translate3d(0px, 88px, 0px)"
                style="line-height: 44px">
              <li :class='{"van-picker-column__item--selected":picker_active==index}'
                  class="van-ellipsis van-picker-column__item"
                  style="height: 44px;display:flex;align-items: center;justify-content: center;"
                  @click="change_picker(item,index)"
                  v-for="(item,index) in bankCodes"
                  :key="index">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'KBANK'"
                     src="../../assets/BANKLOGO/KBANK.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'BBL'"
                     src="../../assets/BANKLOGO/BBL.png">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'BAAC'"
                     src="../../assets/BANKLOGO/BAAC.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'BOA'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'BAY'"
                     src="../../assets/BANKLOGO/BAY.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'BOC'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'BNPP'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'CIMB'"
                     src="../../assets/BANKLOGO/CIMB.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'CITI'"
                     src="../../assets/BANKLOGO/CITI.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'DB'"
                     src="../../assets/BANKLOGO/DB.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'GHB'"
                     src="../../assets/BANKLOGO/GHB.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'ICBC'"
                     src="../../assets/BANKLOGO/ICBC.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'TIBT'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'CHAS'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'KKB'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'KTB'"
                     src="../../assets/BANKLOGO/KTB.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'LHBA'"
                     src="../../assets/BANKLOGO/LHBANK.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'MEGA'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'MHCB'"
                     src="../../assets/BANKLOGO/MHCB.png">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'SCBT'"
                     src="../../assets/BANKLOGO/SCBT.png">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'SMTB'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'TBNK'"
                     src="../../assets/BANKLOGO/defult.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'GSB'"
                     src="../../assets/BANKLOGO/GSB.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'HSBC'"
                     src="../../assets/BANKLOGO/HSBC.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'SCB'"
                     src="../../assets/BANKLOGO/scb.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'SMBC'"
                     src="../../assets/BANKLOGO/SMBC.png">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'TCRB'"
                     src="../../assets/BANKLOGO/TCRB.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'TISCO'"
                     src="../../assets/BANKLOGO/TSCO.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'TMB'"
                     src="../../assets/BANKLOGO/TMB.jpg">
                <img style="width:20px;height:20px;"
                     v-if="item.value == 'UOB'"
                     src="../../assets/BANKLOGO/UOB.jpg">
                &nbsp; {{item.text}}
              </li>
            </ul>

          </div>
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numberUnit: this.$numberUnit,
      currency: this.$currency,
      radio: "2",
      money: this.$route.query.money,
      amount: {
        username: "",
        bank_card: "",
        accno: "",
        bank_name: "",
        tel: "",
        withdraw_money: "",
        type: 0,
        ifsc: '',
        bank_code: '',
        iban: ''
      },
      pay_type: '',
      changeBankcode: false,
      // 自定义显示哪一个
      picker_active: 2,
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
      maxmoney: '',
      minmoney: '',
    };
  },
  created () {
    let islog = localStorage.getItem('amount') || false;
    if (islog != false) {
      this.amount = JSON.parse(islog)
    }
    this.logo()
  },
  methods: {
    /**
 * 自定义picker得点击事件
 * */
    change_picker (item, index) {
      this.picker_active = index;
      this.amount.bank_code = item.value;
      this.changeBankcode = false

    },
    //滚动条滚动事件
    change_picker_scroll (v) {
      let scrollTop = v.srcElement.scrollTop;
      this.picker_active = Math.ceil(scrollTop / 44) + 1;//向上取整，并加上第一个空格
    },
    onClickLeft () {
      this.$router.go(-1);
    },
    logo () {
      this.$api.Post('logo').then(res => {
        this.amount.type = res.result.type
        this.pay_type = res.result.pay_type
        // this.pay_type =  'bigpay'
        this.maxmoney = Number(res.result.maxmoneywithdrawal)
        this.minmoney = Number(res.result.minmoneywithdrawal)
      })
    },
    // 打开选择
    openChangeBankcode () {
      this.changeBankcode = true;
    },
    // 选择银行编码
    onChangeBankcode () {
      this.amount.bank_code = this.bankCodes[this.picker_active].value;
      this.changeBankcode = false
    },
    //提现
    withdrae (type) {
      if (this.amount.username == "") {
        this.$toast(this.$t('m.Balance.withdrawal19'));
        return;
      }
      if (this.amount.withdraw_money == "") {
        this.$toast(this.$t('m.Balance.withdrawal18'));
        return;
      }
      if (Number(this.amount.withdraw_money) < this.minmoney) {
        this.$toast(this.$t('m.Balance.withdrawal34') + this.minmoney)
        return
      }

      if (Number(this.amount.withdraw_money) > this.maxmoney) {
        this.$toast(this.$t('m.Balance.withdrawal35') + this.maxmoney)
        return
      }
      if (type == 3) {
        var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
        if (this.pay_type != 'fakqtpay' && this.pay_type != 'fakgt' && this.pay_type != 'bigpay') {
          if (this.amount.tel == "") {
            this.$toast(this.$t('m.Balance.withdrawal20'));
            return;
          }
          if (this.amount.ifsc == "") {
            this.$toast(this.$t('m.Balance.withdrawal28'));
            return;
          }
          if (this.amount.bank_name == "") {
            this.$toast(this.$t('m.Balance.withdrawal22'));
            return;
          }
          if (this.amount.bank_card == "") {
            this.$toast(this.$t('m.Balance.withdrawal23'));
            return;
          }
          if (this.amount.accno == "") {
            this.$toast(this.$t('m.Balance.withdrawal23'));
            return;
          }
        }
        else if (this.pay_type != 'paytrust88' && this.pay_type != 'fakgt' && this.pay_type != 'bigpay') {
          if (this.amount.iban == "") {
            this.$toast(this.$t('m.Balance.withdrawal31'));
            return;
          }
        }
        else if (this.pay_type == 'bigpay') {
          if (this.amount.accno == "") {
            this.$toast(this.$t('m.Balance.withdrawal13'));
            return;
          }
          if (this.amount.bank_code == "") {
            this.$toast(this.$t('m.Balance.withdrawal30'));
            return;
          }
        }
        else {
          if (this.amount.accno == "") {
            this.$toast(this.$t('m.Balance.withdrawal13'));
            return;
          }
          if (this.amount.bank_code == "") {
            this.$toast(this.$t('m.Balance.withdrawal30'));
            return;
          }
        }


        // if (!isMobile.test(this.amount.tel)) {
        //   this.$toast(this.$t('m.Balance.withdrawal21'));
        //   return;
        // }
        // if (this.amount.bank_card != this.amount.bank_card1) {
        //   this.$toast(this.$t('m.Balance.withdrawal24'));
        //   return;
        // }
      }
      // console.log(this.amount)
      this.$api.Post("submit_withdraw", this.amount).then(res => {
        if (res.status == 1) {
          this.amount.withdraw_money = '';
          this.amount.type = 0;
          localStorage.setItem('amount', JSON.stringify(this.amount))
          this.$toast(res.result.message);
          setTimeout(() => { this.$router.go(-1); }, 2000)
        } else {
          this.$toast(res.result.message);
        }
      });
    },
    //全部提现
    alltx () {
      this.amount.withdraw_money = this.money
    }
  }
};
</script>

<style lang="less">
.with-m {
  background: #fff7f2;
  padding: 15px;
  font-size: 14px;
  span {
    line-height: 2.3;
  }
  a {
    font-size: 12px;
    color: #ffffff;
    display: inline-block;
    padding: 8px 12px;
    background: #5d70bd;
    border-radius: 5px;
  }
}
.with-num {
  background-color: #1e243d;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  > p:nth-child(2) {
    margin-top: 10px;
    color: #fff;
    span {
      font-weight: 700;
      font-size: 28px;
    }
    input {
      font-size: 28px;
      font-weight: 700;
      width: 80%;
    }
  }
}
.division {
  // background: #f3f3f3;
  padding: 10px;
}
.with-type {
  background-color: #fff7f2;
  border-radius: 8px 8px 0 0;
  > p {
    padding: 15px 20px;
    border-bottom: 1px solid #eeeff4;
  }
  img {
    width: 30px;
    margin-right: 10px;
  }
}
.bje .el-radio__label {
  opacity: 0;
}
.bje .el-radio__inner {
  width: 20px !important;
  height: 20px !important;
}
.bje .el-radio__inner::after {
  width: 8px !important;
  height: 8px !important;
}
.bje .van-cell {
  padding: 0 !important;
  font-size: 16px !important;
  background: none;
  font-size: 14px !important;
  line-height: 1.6;
}
.bje .van-cell .van-field__control {
}
.with-btn {
  padding: 20px;
  button {
    width: 100%;
  }
}
</style>
