<template>

  <div class="perback">
    <!-- <div>
       <van-nav-bar title="个人中心" /> 
      <div class="btonses_op">
        {{$t('m.Personal.Center1')}}
      </div>
    </div> -->
    <div class="van-nav-bar van-hairline--bottom"
         style="z-index: 1;">
      <div class="van-nav-bar__left"></div>
      <div class="van-nav-bar__title van-ellipsis btonses_op">{{$t('m.Personal.Center1')}}</div>
      <!-- <div class="van-nav-bar__right"
           @click="changeOut">{{$t('m.loginpage.login12')}}<i></i></div> -->
    </div>
    <!-- 用户信息 -->
    <div class="personaltitle">
      <div class="f-jc-sb box-shadow">
        <div class="f-flex user">
          <div>
            <div style="overflow: hidden;width:40px;height:40px;border-radius: 50%;box-sizing:border-box">
              <img class="avatar"
                   v-if="user.avatar == ''"
                   src="../../assets/user.jpg"
                   alt />
              <img class="avatar"
                   :src="user.avatar"
                   alt />

            </div>

          </div>
          <div>
            <p>{{ user.mobile }}</p>
            <!-- <p>{{ user.nickname }}</p> -->
          </div>
        </div>
        <div class="f-flex">
          <!-- <i @click="edit" class="el-icon-edit-outline"></i>
          <i class="el-icon-setting"></i> -->
          <p class="userGender">{{user.give}}</p>
        </div>
      </div>
      <div>
        <div>
          <p>
            {{$t('m.Personal.Center2')}}
            <span>{{ user.credit2 }}{{$numberUnit}}</span>
          </p>
          <p>
            <el-button type="primary"
                       @click="recharge">{{$t('m.Personal.Center3')}}</el-button>
            <el-button type="primary"
                       @click="withdraw">{{$t('m.Personal.Center4')}}</el-button>
            <el-button v-if="user.treasure_enabled == 1"
                       type="primary"
                       @click="treasure">{{$t('m.Personal.Center25')}}</el-button>
          </p>

        </div>
        <div>
          <ul class="moneyBox">
            <li @click="selections(3)">
              <p>{{user.task || 0}}{{$numberUnit}}</p>
              <p>{{$t('m.Personal.Center5')}}</p>
            </li>
            <li @click="selections(2)">
              <p>{{Number(user.task_comm + user.meal) || 0}}{{$numberUnit}}</p>
              <p>{{$t('m.Personal.Center6')}}</p>
            </li>
            <li @click="selections('')">
              <p>{{user.all_money || 0}}{{$numberUnit}}</p>
              <p>{{$t('m.Personal.Center8')}}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="persoaltask f-flex"
             style="flex-wrap: wrap;">
          <div>
            <p>Lv.0 VIP</p>
            <p>0 / 3 </p>
            <p>Hôm nay đã làm/Nhiệm vụ có thể làm</p>
          </div>
          <div>
            <p>Lv.1 VIP</p>
            <p>0 / 0 </p>
            <p>Hôm nay đã làm/Nhiệm vụ có thể làm</p>
          </div>
          <div>
            <p>Lv.2 VIP</p>
            <p>0 / 0 </p>
            <p>Hôm nay đã làm/Nhiệm vụ có thể làm</p>
          </div>
          <div>
            <p>Lv.3 VIP</p>
            <p>0 / 0 </p>
            <p>Hôm nay đã làm/Nhiệm vụ có thể làm</p>
          </div>
          <div>
            <p>Lv.4 VIP</p>
            <p>0 / 0 </p>
            <p>Hôm nay đã làm/Nhiệm vụ có thể làm</p>
          </div>
          <div>
            <p>Lv.5 VIP</p>
            <p>0 / 0 </p>
            <p>Hôm nay đã làm/Nhiệm vụ có thể làm</p>
          </div>
        </div> -->
        <!-- v-if="gradestatus == 1" -->
        <div class="persoaltask f-flex"
             style="flex-wrap: wrap;">
          <div v-for="(item,index) in user.task_grade_count"
               v-if="item.status == 1"
               :key="index">
            <p>{{item.task_grade_name}}</p>
            <p>{{item.task_count_perform}} / {{item.task_count}} </p>

            <!-- <p>{{$t('m.Personal.Center9')}}</p> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <!-- <div class="p20"> -->
    <!-- <div class="iconbar">
			<div class="icom_barlist" v-for="(item,index) in  link_base" :key="index" @click="go_order(item.type)">
				<div class="bar_imgsq">
					<img :src="item.i_url"/>
				</div>
				<span>{{item.name}}</span>
			</div>
		</div> -->
    <!-- 任务 -->

    <!-- 待付款 -->
    <!-- <div class="personalorder">
        <ul class="f-flex">
          <li>
            <p>
              <van-icon name="paid" />
            </p>
            <p>待付款</p>
          </li>
          <li>
            <p>
              <van-icon name="send-gift-o" />
            </p>
            <p>待发货</p>
          </li>
          <li>
            <p>
              <van-icon name="tosend" />
            </p>
            <p>待收货</p>
          </li>
          <li>
            <p>
              <van-icon name="sign" />
            </p>
            <p>已完成</p>
          </li>
          <li>
            <p>
              <van-icon name="orders-o" />
            </p>
            <p>我的订单</p>
          </li>
        </ul>
      </div> -->
    <!-- </div> -->
    <!-- 更多功能 -->
    <div class="more">
      <!-- <div class="f-jc-sb" @click="selection(1)">
        <p>
          <van-icon name="point-gift" />
         </p>
         <p>
        <span>我的店铺</span>
        </p>
      </div> -->
      <!-- <div class="f-jc-sb " @click="selection(2)">
        <p>
          <van-icon name="add-square" />
         </p>
         <p>
          <span>{{$t('m.Personal.Center10')}}</span>
        </p>
      </div> -->
      <!-- <div class="f-jc-sb" @click="selection(3)">
        <p>
          <van-icon name="column" />
         </p>
         <p>
          <span>{{$t('m.Personal.Center11')}}</span>
        </p>
      </div> -->
      <!-- <div class="f-jc-sb" @click="selection(11)">
	    <p>
	      <van-icon name="column" />
         </p>
         <p>
	      <span>我的购物车</span>
	    </p>
	  </div> -->
      <div class="f-jc-sb"
           @click="selection(4)">
        <p>
          <van-icon name="balance-list" />
        </p>
        <p>
          <span>{{$t('m.Personal.Center12')}}</span>
        </p>
      </div>
      <div class="f-jc-sb"
           @click="selection(5)">
        <p>
          <van-icon name="gold-coin" />
        </p>
        <p>
          <span>{{$t('m.Personal.Center13')}}</span>
        </p>
      </div>

      <div class="f-jc-sb"
           @click="selection(6)">
        <p>
          <van-icon name="invition" />
        </p>
        <p>
          <span>{{$t('m.Personal.Center14')}}</span>
        </p>
      </div>
      <div class="f-jc-sb"
           @click="selection(7)">
        <p>
          <van-icon name="friends" />
        </p>
        <p>
          <span>{{$t('m.Personal.Center15')}}</span>
        </p>
      </div>
      <!-- <div class="f-jc-sb" @click="selection(8)">
        <p>
         <van-icon name="medal" />
         </p>
         <p>
          <span>中奖记录</span>
        </p>
      </div>
        <div class="f-jc-sb" @click="selection(9)">
        <p>
          <van-icon name="cart-circle" />
         </p>
         <p>
          <span>团购记录</span>
        </p>
      </div> -->
      <div class="f-jc-sb"
           @click="selection(14)">
        <p>
          <van-icon name="cart-circle" />
        </p>
        <p>
          <span>{{$t('m.Personal.Center16')}}</span>
        </p>
      </div>
      <!-- <div class="f-jc-sb" @click="selection(13)">
	    <p>
	      <van-icon name="cart-circle" />
         </p>
         <p>
	      <span>收货地址</span>
	    </p>
	  </div> -->

      <div v-if="user.treasure_enabled == 1"
           class="f-jc-sb"
           @click="selection(12)">
        <p>
          <van-icon name="cart-circle" />
          <span>{{$t('m.Personal.Center26')}}</span>
        </p>
      </div>
      <div class="f-jc-sb"
           @click="changePwd">
        <p>
          <van-icon name="friends" />
          <span>{{$t('m.Personal.Center28')}}</span>
        </p>
      </div>
      <!-- <div class="f-jc-sb" @click="selection(10)">
        <p>
         <van-icon name="photograph" />
          <span>我的晒单</span>
        </p>
      </div>  -->
    </div>
    <div class="clearfix"></div>

    <div class="exit">
      <el-button type="primary"
                 @click="displayout">{{$t('m.Personal.Center17')}}</el-button>
    </div>

    <!-- 退出提示框 -->
    <div class="outBox_mask"
         v-if="outbox">
      <div class="outbox">
        <p class="out_Tips">{{$t('m.Personal.Center22')}}</p>
        <div class="out_btn_box">
          <p class="cancel"
             @click="hideout">{{$t('m.Personal.Center24')}}</p>
          <p class="determine"
             @click="exit">{{$t('m.Personal.Center23')}}</p>
        </div>
      </div>
    </div>
    <div class="outBox_mask"
         v-if="changeLanBox">
      <div class="outbox">
        <p class="out_Tips">{{$t('m.Personal.Center27')}}</p>
        <div class="out_btn_box">
          <p class="cancel"
             @click="hideChange">{{$t('m.Personal.Center24')}}</p>
          <p class="determine"
             @click="changeLocale">{{$t('m.Personal.Center23')}}</p>
        </div>
      </div>
    </div>
    <div style="width:100%;height:98px"></div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/index/footer'

export default {
  components: {
    Foot
  },
  data () {
    return {
      user: {},
      money: {
        taskmoney: 0,
        grademoney: 0,
        mealmoney: 0,
        totalmoney: 0,
      },
      link_base: [
        {
          name: this.$t('m.Personal.Center18'),
          type: 3,
          i_url: require("../../assets/pick.png")
        },
        {
          name: this.$t('m.Personal.Center19'),
          type: 4,
          i_url: require("../../assets/send.png")
        },
        {
          name: this.$t('m.Personal.Center20'),
          type: 5,
          i_url: require("../../assets/complet.png")
        },
        {
          name: this.$t('m.Personal.Center21'),
          type: 0,
          i_url: require("../../assets/order.png")
        }],
      host: 'https://www.h8888h.xyz',
      outbox: false,
      changeLanBox: false,
    };
  },
  mounted () {
    this.getinfo();
    this.level();
  },
  methods: {
    changePwd () {
      this.$router.push({ path: '/changePwd' })
    },
    go_order (e) {
      this.$router.push({ name: "orderlist", query: { type: e } });
    },
    getinfo () {
      this.$api.Post("getinfo").then(res => {
        if (res.status == 1) {
          this.user = res.result.list;
          this.money = res.result.makemoney
        }
      });
    },
    //编辑
    edit () {
      location.href = `${this.host}/app/index.php?i=4&c=entry&do=profile&m=weliam_indiana`
    },

    level () {
      this.$api.Post('level').then(res => {

      })
    },
    mytask (e) {
      //this.$router.push({ name: "task",query:{takeid:e} });
    },
    //更多功能
    selection (e) {
      let language = window.localStorage.getItem('language');
      let lang;
      if (language == "" || language == "th") {
        lang = "th"
      } else {
        lang = "en"
      }
      if (e == 2) {
        this.$router.push({ name: "issue" });
      }
      if (e == 3) {
        this.$router.push({ name: "manage" });
      }
      if (e == 4) {
        this.$router.push({ name: "record" });
      }
      if (e == 5) {
        this.$router.push({ name: "financial" });
      }
      if (e == 6) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&method=shares&p=commission&m=sz_yi&do=plugin&lang=` + lang
      }
      if (e == 7) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&method=team&p=commission&m=sz_yi&do=plugin&lang=` + lang
      }
      if (e == 8) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=order_get&m=weliam_indiana`
      }
      if (e == 9) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=order&m=weliam_indiana`
      }
      if (e == 10) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=myshare&m=weliam_indiana`
      }
      if (e == 11) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&op=cart_detail&do=cart&m=weliam_indiana`
      }
      if (e == 12) {
        this.$router.push({ name: "payRecords" });
      }
      if (e == 13) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=address&m=weliam_indiana`
      }
      if (e == 14) {
        this.$router.push({ name: "financial", query: { type: 4 } });
      }
    },
    selections (e) {
      this.$router.push({ name: "financial", query: { type: e } });
    },

    //提现
    withdraw () {
      this.$router.push({ name: 'withdraw', query: { money: this.user.credit2 } })
    },
    //充值
    recharge () {
      this.$router.push({ name: 'recharge' })
    },
    treasure () {
      this.$router.push({ name: 'treasure' })
    },
    // 点击显示退出框
    displayout () {
      this.outbox = true;
    },
    //点击显示切换语言框
    changeOut () {
      this.changeLanBox = true;
    },
    //点击确认切换语言
    changeLocale () {
      let locale = this.$i18n.locale
      locale === 'th' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'th'
      localStorage.setItem('language', this.$i18n.locale)
      this.changeLanBox = false;
    },
    // 点击隐藏语言切换确认框
    hideChange () {
      this.changeLanBox = false;
    },
    // 点击隐藏退出框
    hideout () {
      this.outbox = false;
    },
    //退出登录
    exit () {
      this.$api.Post('logout').then(res => {
        this.delCookie('openid')
        this.$router.push({ path: '/' })
      })
    },
    delCookie (c_name) {
      this.setCookie(c_name, "", -1);
    },
    setCookie (c_name, value, expire) {
      var date = new Date()
      date.setSeconds(date.getSeconds() + expire)
      document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()

    }
  }
};
</script>

<style lang="less">
.persoaltask div:nth-child(odd) {
}
.iconbar {
  display: flex;
  padding: 5px 0px;
  justify-content: space-between;
}
.iconbar span {
  font-size: 14px;
  margin-top: 4px;
  display: inline-block;
}
.iconbar img {
  width: 30px;
  display: block;
  margin: 0 auto;
}
.btonses_op {
  // background: #37a2f0;
  line-height: 42px;
  text-align: center;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
}
.personaltitle {
  position: relative;
  padding: 0 15px 0 15px;
  overflow: hidden;
  > div:nth-child(1) {
    margin-top: 20px;
    background: #fff7f2;
    padding: 15px;
    border-radius: 8px;
    > div:nth-child(1) {
      //头像及账号
      line-height: 40px;
      img {
        width: 100%;
        display: inline-block;
        background: #90aac1;
        margin-right: 8px;
      }
    }
    > div:nth-child(2) {
      font-size: 14px;
      line-height: 40px;
      > i:nth-child(2) {
        margin-left: 25px;
      }
    }
  }
  > div:nth-child(2) {
    margin-top: 20px;
    padding: 15px 0 0;
    border-radius: 8px 8px 0 0;
    text-align: center;
    > div:nth-child(1) {
      background: #fff7f2;
      border-radius: 10px;
      > p:nth-child(1) {
        span {
          color: #f90;
          font-weight: 600;
          font-size: 0.6rem;
        }
      }
      button {
        padding: 10px 10px;
        margin: 10px;
      }
    }
    > div:nth-child(2) {
      margin-top: 10px;
      border-radius: 8px;
      overflow: hidden;
      background: #fce3cf;
      box-shadow: 0 0.08rem 0.133333rem rgba(255, 139, 134, 0.12),
        0 0.08rem 0.133333rem rgba(255, 139, 134, 0.24);
      li {
        width: 50%;
        height: 60px;
        text-align: center;
        font-size: 12px;
        padding: 20px 10px 10px;
        > p:nth-child(1) {
          font-weight: 700;
          color: #ff8f74;
          font-size: 20px;
          margin-bottom: 8px;
          white-space: nowrap;
        }
      }
    }
  }
}
.persoaltask {
  border-radius: 8px;
  line-height: 30px;
  padding: 15px 0;
  > div {
    width: 49%;
    text-align: center;
    background-color: #eef1f8;
    border-radius: 8px;
    margin: 0.5%;
    padding: 5px 0 10px;
    > p:nth-child(1) {
      font-size: 12px;
      color: #ff8f74;
    }
    > p:nth-child(2) {
      font-weight: 700;
      font-size: 22px;
      margin: 6px auto;
    }
    > p:nth-child(3) {
      font-size: 12px;
      line-height: 14px;
      color: #999;
    }
  }
  > div:nth-child(1) {
    // border-right: 1px solid #ccc;
  }
}
.personalorder {
  margin-top: 20px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
  background: #ffffff;

  li {
    width: 20%;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    i {
      font-size: 30px;
    }
  }
}
.more {
  margin: 0 20px 20px;
  text-align: center;
  > div {
    float: left;
    color: #ff8f74;
    display: inline-block;
    width: 30%;
    height: 100px;
    padding: 10px 10px;
    background: #fff7f2;
    border-radius: 10px;
    margin: 0 5px 10px;
    span {
      display: block;
      width: 100%;
      font-size: 16px;
    }
    i {
      display: block;
      font-size: 24px;
      margin-bottom: 10px;
    }
  }
}
.perback {
  background: #fff;
}
.exit {
  button {
    width: 100%;
  }
}
// 退出框
.outBox_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.outbox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 111px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;
}
.out_Tips {
  width: 100%;
  text-align: center;
  line-height: 45px;
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
  color: #000;
}
.out_btn_box {
  height: 45px;
  line-height: 45px;
}
.out_btn_box p {
  display: inline-block;
  width: 50%;
  height: 100%;
  text-align: center;
  color: #000;
}
.cancel {
  border-right: 1px solid #e5e5e5;
}
.exit {
  margin: 15px;
}
.userGender {
  color: #fff;
  height: 30px;
  margin-top: 5px;
  padding: 0 10px;
  line-height: 30px;
  vertical-align: middle;
  background: #f86d6a;
  border-radius: 10px;
}
.moneyBox {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
}
</style>
