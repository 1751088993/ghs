<template>
<div>
  <img alt="home_banner" class="home_banner" src="../assets/bj.png">
  <img alt="hdgz_button" class="hdgz_button" src="../assets/hdgz_button@3x.png" @click="ruleShow">
  <div class="yijiesuan" v-if="activityStatus === 3 && tkStatus !== 12">
    <div class="state2">你已购买商品</div>
    <div class="center">每人只能参与一次新人0元购</div>
  </div>
  <div class="yigoumai" v-if="activityStatus === 3 && tkStatus === 12">
    <div class="state2">你已购买商品</div>
    <div class="center">当前商品还未确定收货<br>确定收货后即可在余额中查看到返现</div>
  </div>
  <div class="goods" v-if="activityStatus !== 3">
    <div class="state">活动商品</div>
    <div class="lists">
      <div class="list" v-for="item in goods" :key="item.numIid" @click="jump(item.couponClickUrl ? item.couponClickUrl : item.clickUrl)">
        <div class="icon">
          <img :src="item.smallImages ? item.smallImages[0] : item.pictUrl">
        </div>
        <div class="desc">
          <div class="title">{{item.title}}
          </div>
          <div class="quan"><div class="quanLeft">券</div><div class="quanRight">￥{{formatNum(item.couponAmount)}}</div></div>
          <div class="fan">全额返￥{{formatNum(parseInt((item.zkFinalPrice - item.couponAmount)*100)/100)}}</div>
          <div class="payedNum">{{catNum(item.volume)}}人付款</div>
          <div class="price">￥{{formatNum(parseInt(item.zkFinalPrice * 100)/100)}}</div>
          <div class="btn"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="end" :class="{'hidden': endHidden}" v-if="activityStatus !== 3">已经到底了</div>
  <div class="rule" :class="{'hidden': ruleHidden}" @touchmove.stop.prevent="cancleTouch" @click="ruleHide">
    <div class="ruleContent" @click.stop.prevent="cancleTouch">
      <div class="close" @click="ruleHide"></div>
      <div class="title">活动规则</div>
      <div @click="ruleShow">
        <p>1、购买商品—全额返现—随时提现。</p>
        <p>2、该页面内的所有商品，均可挑选购买。点击商品，前往淘宝APP下单购买。确定收货后，会以现金的形式全额返现到您的购划算账户余额内，满足条件即可提现。</p>
        <p>3、在淘宝APP内领取优惠券之后，付款时必须使用领取的优惠券，而且不能够使用其它的 “优惠券” 或 “红包” 。 </p>
        <p>4、实际购买时若选择了其它套餐，此处只返还商品所示的全额返金额。</p>
        <p>5、其它疑问，请前往购划算的帮助中心查看。购划算拥有本活动的最终解释权。</p>
      </div>
    </div>
  </div>
  <div class="maskContainer" v-if="maskShow">
    <div class="maskInfo">
      <div class="title">
        提示
      </div>
      <div class="desc">
        {{alertInfo.desc1}}
      </div>
      <div>
        {{alertInfo.desc2}}
      </div>
      <div class="btns">
        <div class="leftBtn btn_inline" @click="hideMask">取消</div>
        <div class="rightBtn btn_inline" @click="login">{{alertInfo.desc3}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { GetZeroBuyGoodsActivityStatus, GeTbkZeroBuyActivityUatmItems, cnzzPush } from '../common/api/api';
import { toast } from '@wnl/ui';

const Toast = new toast();
export default {
  name: 'index',
  data() {
    return {
      ruleHidden: true,
      userInfo: {
        token: '',
        specialid: ''
      },
      activityStatus: null,
      tkStatus: 0,
      goods: [],
      endHidden: true,
      reqLock: false,
      reqIndex: 1,
      link: '',
      maskShow: false,
      alertInfo: {
        desc1: '当前账户未登录',
        desc2: '请登录后参加0元购活动',
        desc3: '去登录'
      }
    };
  },
  created() {
    var deviceWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : parseInt(window.ylwindow.getWidth());if(window.devicePixelRatio>3 && document.documentElement.clientWidth > 375){deviceWidth = 400;}if(deviceWidth > 1024) deviceWidth = 1024;document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
  },
  mounted() {
    this.userInfo.token = window.location.search.split('token=')[1].split('#')[0];
    window.location.href = 'protocol://user_allinfo#check';
    window.check = (res) => {
      this.userInfo.token = res.split('token=')[1].split('&')[0];
      this.userInfo.specialid = res.split('specialid=')[1].split('&')[0];
    }
    window.gettoken = (res) => {
      this.userInfo.token = res;
      setTimeout(() => {
        // window.location.href = 'protocol://getWidth#getwidthcallback';
        window.location.href = 'protocol://user_allinfo#getuserinfo';
      }, 150);
    }
    window.getspecialid = (res) => {
      this.userInfo.specialid = res;
      window.location.href = 'protocol://user_allinfo#getuserinfo';
    }
    window.getuserinfo = (res) => {
      this.userInfo.token = res.split('token=')[1].split('&')[0];
      this.userInfo.specialid = res.split('specialid=')[1].split('&')[0];
      if (this.userInfo.token === '[TOKEN]' || this.userInfo.token === '') {
        // window.location.href = this.link;
        return;
      } else {
        GetZeroBuyGoodsActivityStatus(this.userInfo).then((result) => {
          let res = result.data
          // console.log(res.data.status);
          this.activityStatus = res.data.status;
          this.tkStatus = res.data.tkStatus;
        }).catch(()=> {
          console.log('服务器故障,请稍后重试');
        });
      }
    }
    GeTbkZeroBuyActivityUatmItems(this.userInfo, 1).then((result) => {
      let res = result.data.data.results;
      this.goods = this.goods.concat(res);
      console.log(this.goods);
    }).catch(() => {
      console.log('服务器故障，请稍后重试');
    });
    window.addEventListener('scroll', () => {
      let el = window.document.documentElement;
      if(el.scrollHeight - el.scrollTop - el.clientHeight < 300 && !this.reqLock) {
        this.reqLock = true;
        this.reqIndex += 1;
        GeTbkZeroBuyActivityUatmItems(this.userInfo, this.reqIndex).then((result) => {
          let res = result.data.data.results;
          this.goods = this.goods.concat(res);
          if (res.length === 10) {
            this.reqLock = false;
          } else {
            this.endHidden = false;
          }
        }).catch(() => {
          console.log('服务器故障，请稍后重试');
        });
      } else if(!this.reqLock && this.endHidden) {
        this.reqLock = true;
        setTimeout(() => {
          this.reqIndex += 1;
          GeTbkZeroBuyActivityUatmItems(this.userInfo, this.reqIndex).then((result) => {
            let res = result.data.data.results;
            this.goods = this.goods.concat(res);
            if (res.length === 10) {
              this.reqLock = false;
            } else {
              this.endHidden = false;
            }
          }).catch(() => {
            console.log('服务器故障，请稍后重试');
          });
        }, 2000);
      }
    });
    if (this.userInfo.token === '[TOKEN]' || this.userInfo.token === '') {
      setTimeout(() => {
        window.location.href = 'protocol://user_allinfo#getuserinfo';
      }, 1000);
    } else {
      GetZeroBuyGoodsActivityStatus(this.userInfo).then((result) => {
        let res = result.data
        // console.log(res.data.status);
        this.activityStatus = res.data.status;
        this.tkStatus = res.data.tkStatus;
      }).catch(()=> {
        console.log('服务器故障,请稍后重试');
      });
    }
  },
  computed: {},
  methods: {
    jump(link) {
      this.link =  link;
      if (this.userInfo.token === '[TOKEN]' || this.userInfo.token === '') {
        this.maskShow = true;
        this.alertInfo = {
          desc1: '当前账户未登录',
          desc2: '请登录后参加0元购活动',
          desc3: '去登录'
        }
      } else if (this.userInfo.specialid === '' || this.userInfo.specialid === '0'){
        this.maskShow = true;
        this.alertInfo = {
          desc1: '当前账户未获得淘宝授权',
          desc2: '请授权后参加0元购活动',
          desc3: '去授权'
        };
      } else {
        window.location.href = link;
      }
    },
    user_token() {
      window.location.href = 'protocol://user_token#gettoken';
    },
    user_specialid() {
      window.location.href = 'protocol://user_specialid#getspecialid';
    },
    ruleShow() {
      this.ruleHidden = false;
    },
    ruleHide() {
      this.ruleHidden = true;
    },
    hideMask() {
      this.maskShow = false;
    },
    cancleTouch() {
      console.log('不让动');
      this.maskShow = false;
    },
    login() {
      this.maskShow = false;
      if (this.userInfo.token === 'TOKEN' || this.userInfo.token === '') {
        this.user_token();
      } else {
        this.user_specialid();
      }
    },
    formatNum(num) {
      return num.toString().indexOf('.00') !== -1 ? num.toString().split('.00')[0] : (num.toString().slice(-1) === '0' && num.toString().indexOf('.') !== -1 ? num.toString().slice(0, -1) : num);
     },
    catNum(num) {
      if (num > 10000) {
        return parseInt(num /10000) + '.' + parseInt(num % 10000 /1000) + '万';
      } else {
        return num;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '../common/scss/index.scss';
</style>