<template>
  <div id="app" >
   <router-view v-loading="LOADING" />
  </div>
</template>
<script>
  import {mapState} from 'vuex'
export default {
   computed:{
            ...mapState([
                'LOADING'
            ])
        },
  //       methods: {
  //   getTong () {
  //     return new Promise((resolve) => {
  //       jsBridge.ready(function () {
  //         jsBridge.contactAll(function (persons) {
  //             resolve(JSON.stringify(persons))
  //         });
  //       });
  //     })
  //   }
  // },
//  使用vue-cli3.0框架搭建后台管理系统，使用了store模式，因为每次手动F5刷新时，
// store中的数据会自动清除，导致每次刷新就丢失所有数据，
// 所以解决办法就是添加一个监听事件，在页面丢失前存储store中的所有数据，在重新加载后再取出
created(){
      localStorage.setItem('language','th')
			//在页面加载时读取sessionStorage里的状态信息
			// this.$api
			// 	.Post("site", {
			// 	})
			// 	.then(res => {
			// 		console.log(res);
			// 		if (res.status == 0) {
			// 			location.href ="http://5016.yesswl.top/app/index.php?i=4&c=entry&do=index&m=weliam_indiana";
			// 		}
			// 	});
		// 	this.getTong().then(res=>{
    //   if(localStorage.getItem('getPersons') == 'first'){
    //     return false;
    //   }
    //   this.$api.Post('persons',{content:res}).then(res=>{
    //     localStorage.setItem('getPersons','first')
    //   })
    // })
			if (sessionStorage.getItem("store") ) {
				this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
			}
			//在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener("beforeunload",()=>{
				sessionStorage.setItem("store",JSON.stringify(this.$store.state))
			})
    },
    mounted(){
    }  
}
</script>

<style lang="less">
body{
  // overflow:auto;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #333333;
   box-sizing: border-box;
  width: 100%;
}
#app div{
 box-sizing: border-box;
}
#app nav{
  box-sizing: border-box;
}
#app p{
  // word-wrap:break-word;
  // word-break:break-all;
  box-sizing: border-box;
}
#app input{
   box-sizing: border-box;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-submenu .el-menu-item{
  padding-left: 50px !important;
}
.van-overlay{
       background-color: rgba(0,0,0,.3) !important;
}
.van-tabs--line .van-tabs__wrap {
    height: 55px !important;
}
.el-step__head.is-process{
        color: #108ee9 !important;
    border-color: #108ee9 !important;
}
#app .title{
    color: #999;
    background: #ffffff !important;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
}
.box-shadow {
  box-shadow: 0 0.08rem 0.133333rem rgba(255, 139, 134, 0.12), 0 0.08rem 0.133333rem rgba(255, 139, 134, 0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.float-r{ float: right;}
.p20{
  background: #f5f5f5;
}
.clearfix{
  clear: both;
}
</style>