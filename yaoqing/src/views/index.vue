<template>
<div class="container">
  <img alt="home_banner" class="home_banner" src="../assets/yqxj_bg@3x.png">
  <img alt="hdgz_button" class="hdgz_button" src="../assets/hdgz_button@3x.png" @click="ruleShow">
  <div class="content">
    <div class="banner">
      <div class="result">
        <div class="yaoqing inline">
          <div class="num">{{groupInfo.inviteNum}}<span>人</span></div>
          <div>邀请人数</div>
        </div>
        <div class="jiangli inline">
          <div class="num">{{groupInfo.inviteReturnNum}}<span>人</span></div>
          <div>奖励人数</div>
        </div>
        <div class="leiji inline">
          <div class="num">{{groupInfo.inviteReturnTotalPrice}}<span>元</span></div>
          <div>累计收入</div>
        </div>
      </div>
      <div class="desc">
          让下级填写你的邀请码，然后下级购买任一商品<br>你就会得到2元的现金奖励，按人头算钱上不封顶
        </div>
    </div>
    <div class="lists">
      <div class="none" v-if="groups.length === 0">
        <img src="../assets/none.png">
        <div class="center">
          暂无好友<br>快来邀请吧
          </div>
      </div>
      <div class="list" v-for="item in groups" :key="item">
        <div class="left">
          <div class="name">{{item.nickName}}</div>
          <div class="check">{{item.parentInviteReturn ? '奖励已到账' : '奖励未到账'}}</div>
        </div>
        <div class="right">
          <div class="money">{{item.parentInviteReturn ? `+${item.pricePerReturn}元` : '0元'}}</div>
          <div class="time">{{item.createTime ? item.createTime.split(' ')[0] : ''}}</div>
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
  <div class="btn" :class="{'btn_iphonex': isIphonex}" @click="invite">立即邀请</div>
  <div class="rule" :class="{'hidden': ruleHidden}" @touchmove.stop.prevent="cancelTouch" @click.self="ruleHide">
    <div class="ruleContent">
      <div class="close" @click="ruleHide"></div>
      <div class="title">活动规则</div>
      <div @click="ruleShow">
        <p>1、让下级填写你的邀请码，然后下级购买任一商品，你就会得到2元的现金奖励，按人头算钱上不封顶。</p>
        <p>2、下级通过新人0元购买来商品，2元奖励同样到账。</p>
        <p>3、在余额到账中，进行现金奖励的提现。</p>
        <p>4、该2元直接奖励，每个下级只会奖励一次。但是下级以后购买商品，每件商品都会给你返利提成。</p>
        <p>5、本活动从2019年5月7日开始，在此前邀请的下级，没有2元奖励，但是购买的每件商品，你依然可以获得返利提成。</p>
        <p>6、其它疑问，请前往购划算的帮助中心查看，购划算拥有本活动的最终解释权。</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { getInviteUserGroupInfo, getInviteUserReturnList, cnzzPush } from '../common/api/api';
import { toast } from '@wnl/ui';
import { isIphoneX } from '../../../songrili/src/common/utils/tool';

const Toast = new toast();
export default {
  name: 'index',
  data() {
    return {
      ruleHidden: true,
      userInfo: {
        token: ''
      },
      groupInfo: {
        inviteNum: 0,
        inviteReturnNum: 0,
        inviteReturnTotalPrice: 0,
        invitePerReturnPrice: 2
      },
      groups: [],
      reqLock: false,
      reqIndex: 0,
      alertInfo: {
        desc1: '当前账户未登录',
        desc2: '请登录后参加活动',
        desc3: '去登录'
      },
      maskShow: false,
      isIphonex: false
    };
  },
  created() {
    // console.log(this.$route.query);
    var deviceWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : parseInt(window.ylwindow.getWidth());if(window.devicePixelRatio>3 && document.documentElement.clientWidth > 375){deviceWidth = 400;}if(deviceWidth > 1024) deviceWidth = 1024;document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
  },
  mounted() {
    cnzzPush('SRL.xrlyg.IM');
    if(isIphoneX()) {
      this.isIphonex = true;
    }
    this.userInfo.token = window.location.search.split('token=')[1].split('#')[0];
    if (this.userInfo.token === '[TOKEN]' || this.userInfo.token === '' || this.userInfo.token === '0') {
      setTimeout(() => {
        window.location.href = 'protocol://user_allinfo#getuserinfo';
      }, 3000);
      return;
    } else {
      this.initialData();
    }
    window.getuserinfo = (res) => {
      this.userInfo.token = res.split('token=')[1].split('&')[0];
      if (this.userInfo.token === '[TOKEN]' || this.userInfo.token === '' || this.userInfo.token === '0') {
        this.maskShow = true;
        return;
      } else {
        this.initialData();
      }
    }
    window.gettoken = () => {
      window.location.href = 'protocol://user_allinfo#getuserinfo';
    }
  },
  computed: {},
  methods: {
    jump(link) {
      window.location.href = link;
    },
    ruleShow() {
      this.ruleHidden = false;
    },
    ruleHide() {
      this.ruleHidden = true;
    },
    invite() {
      console.log('pageInvitation');
      window.location.href = "protocol://pageInvitation"
    },
    login() {
      window.location.href = "protocol://user_token#gettoken";
      setTimeout(() => {
        this.maskShow = false;
      }, 300);
    },
    cancelTouch() {
      console.log('cancelTouch');
      this.maskShow = false;
    },
    hideMask() {
      this.maskShow = false;
    },
    initialData() {
      this.reqIndex += 1;
      getInviteUserGroupInfo(this.userInfo).then((result) => {
      let res = result.data
      this.groupInfo = Object.assign(this.groupInfo, res.data);
      window.console.log(JSON.stringify(res));
      // window.console.log(res.data.status);
      // this.activityStatus = res.data.status;
      // if (res.data.status === 3 && res.data.tkStatus === 3) {

      // } else if (res.data.status=== 3 && res.data.tkStatus !== 3) {

      // } else {
        
      // }
      // that.userInfo.activityId = res.data.activityId
      // that.userInfo.status = res.data.status
      // this.userInfo = this.userInfo
      // this.activityOnline = this.userInfo.status !== 0;
      // this.nextShow = this.userInfo.status === 2;
      // window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    }).catch(()=> {
      window.console.log('服务器故障,请稍后重试');
    });
    getInviteUserReturnList(this.userInfo, this.reqIndex).then((result) => {
      let res = result.data.data ? result.data.data : [];
      this.groups = this.groups.concat(res);
      console.log(this.groups.length)
    }).catch(() => {
      window.console.log('服务器故障，请稍后重试');
    });
    window.addEventListener('scroll', () => {
      let el = window.document.documentElement;
      if(el.scrollHeight - el.scrollTop - el.clientHeight < 350 && !this.reqLock) {
        this.reqLock = true;
        this.reqIndex += 1;
        getInviteUserReturnList(this.userInfo, this.reqIndex).then((result) => {
          let res = result.data.data;
          this.groups = this.groups.concat(res);
          console.log(this.groups)
          if (res.length === 10) {
            this.reqLock = false;
          } else {
            this.endHidden = false;
          }
        }).catch(() => {
          window.console.log('服务器故障，请稍后重试');
        });
      }
    });
    window.gettoken = (res) => {
      this.userInfo.token = res;
      getInviteUserGroupInfo(this.userInfo).then((result) => {
        let res = result.data
        this.groupInfo = Object.assign(this.groupInfo, res.data);
        window.console.log(JSON.stringify(res));
        // window.console.log(res.data.status);
        // this.activityStatus = res.data.status;
        // if (res.data.status === 3 && res.data.tkStatus === 3) {

        // } else if (res.data.status=== 3 && res.data.tkStatus !== 3) {

        // } else {
          
        // }
        // that.userInfo.activityId = res.data.activityId
        // that.userInfo.status = res.data.status
        // this.userInfo = this.userInfo
        // this.activityOnline = this.userInfo.status !== 0;
        // this.nextShow = this.userInfo.status === 2;
        // window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      }).catch(()=> {
        window.console.log('服务器故障,请稍后重试');
      });
      getInviteUserReturnList(this.userInfo, this.reqIndex).then((result) => {
        let res = result.data.data;
        this.groups = this.groups.concat(res);
        console.log(this.groups.length)
      }).catch(() => {
        window.console.log('服务器故障，请稍后重试');
      });
      window.addEventListener('scroll', () => {
        let el = window.document.documentElement;
        if(el.scrollHeight - el.scrollTop - el.clientHeight < 150 && !this.reqLock) {
          this.reqLock = true;
          this.reqIndex += 1;
          getInviteUserReturnList(this.userInfo, this.reqIndex).then((result) => {
            let res = result.data.data;
            this.groups = this.groups.concat(res);
            console.log(this.groups)
            if (res.length === 10) {
              this.reqLock = false;
            } else {
              this.endHidden = false;
            }
          }).catch(() => {
            window.console.log('服务器故障，请稍后重试');
          });
        }
      });
    }
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '../common/scss/index.scss';
</style>