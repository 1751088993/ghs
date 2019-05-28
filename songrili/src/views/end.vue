<template>
  <div class="end">
    <div class="header">
      <img src="../assets/tjcg.png">
      <div class="lqcg">领取成功</div>
      <div class="lxkf">联系客服获取物流订单号</div>
    </div>
    <div class="line">
      <div class="icon">1</div>
      <div class="info">
        <div class="title">添加客服微信(昵称:小购酱)</div>
        <div>微信号：<span>xgj680</span></div>
      </div>
      <button class="copy copyWX" data-clipboard-text="xgj680">复制</button>
    </div>
    <div class="line">
      <div class="icon">2</div>
      <div class="info">
        <div class="title">发送提现信息</div>
        <div>收货人姓名：<span>{{userInfo.name}}</span></div>
        <div>收货人手机号：<span>{{userInfo.phone}}</span></div>
      </div>
      <button class="copy copyInfo" :data-clipboard-text="copyInfo">复制</button>
    </div>
    <div class="other">购划算不提供该商品物流信息，若需获取物流订单，请联系客服</div>
    <div class="wc" @click="exit">完成</div>
  </div>
</template>
<script>
import { createActivityUserContactInfo, getActivityUserContactInfo, cnzzPush } from '../common/api/api';
import ClipboardJS from 'clipboard';
export default {
  name: 'share',
  data() {
    return {
      userInfo: {
        name: '',
        phone: '',
        copyInfo: ''
      }
    };
  },
  props: {},
  created() {
    cnzzPush('SRL.领取成功.IM');
    window.document.title = '领取成功';
    // if (window.location.href.indexOf('end&') !== -1 || window.location.href.indexOf('end?') !== -1) {
    //   window.location.replace(window.location.href.replace('end?', 'end&').split('end&')[0] + 'end');
    // }
    if (window.localStorage.getItem('userInfo')){
      Object.assign(this.userInfo, JSON.parse(window.localStorage.getItem('userInfo')));
    } else if(window.location.search.split('token=')[1].split('#')[0] !== '') {
      this.userInfo.token = window.location.search.split('token=')[1].split('#')[0];
    }
    getActivityUserContactInfo(this.userInfo).then((result) => {
      let res = result.data;
      if (res && res.data.id) {
        this.userInfo.name = res.data.name;
        this.userInfo.phone = res.data.mobile;
        this.copyInfo = '收货人姓名：' + res.data.name + '\n收货人手机号：' + res.data.mobile;
      }
    });
  },
  mounted() {
    const clipboardA = new ClipboardJS('.copyWX');
    clipboardA.on('success',() => {
      cnzzPush('SRL.领取成功.复制微信.CK');
      window.location.href = 'weixin://';
    });
    clipboardA.on('error',() => {
      cnzzPush('SRL.领取成功.复制微信.CK');
      window.alert("一键复制失败，请手动复制或直接填写");
      // if (browser.isIOS() && browser.isWnl()) {
      //   setTimeout(() => {
      //     window.location.href = 'protocol://copytext#xgj680';
      //   },0);
      // }else if (browser.isAndroid() && browser.isWnl()) {
      //   setTimeout(() => {
      //     window.location.href ='protocol://copytext:xgj680';
      //   },0);
      // }else {
      //   window.alert("一键复制失败，请手动复制或直接填写");
      // }
    });
    const clipboardB = new ClipboardJS('.copyInfo');
    clipboardB.on('success',() => {
      cnzzPush('SRL.领取成功.复制订单.CK');
      window.location.href = 'weixin://';
    });
    clipboardB.on('error',() => {
      cnzzPush('SRL.领取成功.复制订单.CK');
      window.alert("一键复制失败，请手动复制或直接填写");
      // if (browser.isIOS() && browser.isWnl()) {
      //   setTimeout(() => {
      //     window.location.href = 'protocol://copytext#xgj680';
      //   },0);
      // }else if (browser.isAndroid() && browser.isWnl()) {
      //   setTimeout(() => {
      //     window.location.href ='protocol://copytext:xgj680';
      //   },0);
      // }else {
      //   window.alert("一键复制失败，请手动复制或直接填写");
      // }
    });
  },
  methods: {
    exit() {
      cnzzPush('SRL.领取成功.完成.CK');
      setTimeout(() => {
        window.location.href = 'protocol://exit'
      }, 150);
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
  .header{
    margin-bottom: 63px;
  }
  .line {
    position: relative;
    clear: both;
    display: block;
    padding-left: 15px;
    height: 100px;
  }
  .line .info {
    font-size:15px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:27px;
  }
  .line .info .title{
    font-size:17px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:23px;
    margin-bottom: 5px;
  }
  .icon{
    float: left;
    width:23px;
    height:23px;
    background:rgba(255,220,191,1);
    border-radius: 11.5px;
    text-align: center;
    line-height: 23px;
    margin-right: 10px;
    font-size:15px;
    font-weight:500;
    color:rgba(197,118,50,1);
  }
  .lineAfter::after{
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    height: 100px;
    width: 1px;
    left: 26.5px;
    background: #000;
  }
  .info {
    float: left;
  }
  .copy {
    margin-right: 15px;
    float: right;
    font-size: 15px;
    line-height: 23px;
    font-weight:400;
    color:rgba(255,80,0,1);
    background: #FFF;
  }
  img{
    position: relative;
    left: 50%;
    margin:25px 0 14px -24px;
    width: 48px;
    height: 48px;
  }
  .lqcg{
    width: 100%;
    text-align: center;
    font-size:20px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(55,196,69,1);
    line-height:20px;
    margin-bottom: 10px;
  }
  .lxkf{
    width: 100%;
    text-align: center;
    font-size:15px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:15px;
  }
  .other{
    margin:30px 15px 15px 38px;
    font-size:14px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:20px;
  }
  .wc{
    margin: 0 31px;
    height:44px;
    background:linear-gradient(90deg,rgba(255,135,82,1) 0%,rgba(255,97,31,1) 100%);
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    color: #FFF;
  }
</style>