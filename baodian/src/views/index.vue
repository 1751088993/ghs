<template>
  <div class="container">
    <div class="header">
      <!-- <div class="vedio" @click="vedio"></div> -->
      <div class="card">
        <div class="link" :class="{active: activityStatus}" @click="invite">
          {{activityStatus ? '已领取' : '立即领取'}}
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="tab" @click="clickTab(0)" :class="{active: tabIndex === 0}">购物赚钱</div>
      <div class="tab" @click="clickTab(1)" :class="{active: tabIndex === 1}">分享赚钱</div>
      <div class="tab" @click="clickTab(2)" :class="{active: tabIndex === 2}">提成赚钱</div>
      <div class="tab" @click="clickTab(3)" :class="{active: tabIndex === 3}">邀请赚钱</div>
    </div>
    <div class="info">
      <div class="images" :hidden="tabIndex !== 0">
        <img src="../assets/1-1.png">
        <img src="../assets/1-2.png"/>
        <img src="../assets/1-3.png"/>
      </div>
      <div class="images" :hidden="tabIndex !== 1">
        <img src="../assets/2-1.png"/>
        <img src="../assets/2-2.png"/>
        <img src="../assets/2-3.png"/>
      </div>
      <div class="images" :hidden="tabIndex !== 2">
        <img src="../assets/3-1.png"/>
        <img src="../assets/3-2.png"/>
        <img src="../assets/3-3.png"/>
      </div>
      <div class="images" :hidden="tabIndex !== 3">
        <img src="../assets/4-1.png"/>
        <img src="../assets/4-2.png"/>
        <img src="../assets/4-3.png"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getNewUserRewardFlag, getNewUserReward, cnzzPush } from '../common/api/api';
import { toast } from '@wnl/ui';

const Toast = new toast();
export default {
  name: 'index',
  data() {
    return {
      userInfo: {
        token: '',
        specialid: ''
      },
      activityStatus: null,
      tabIndex: 0,
    };
  },
  created() {
    var deviceWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : parseInt(window.ylwindow.getWidth());if(window.devicePixelRatio>3 && document.documentElement.clientWidth > 375){deviceWidth = 400;}if(deviceWidth > 1024) deviceWidth = 1024;document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
},
  mounted() {
    window.invitedFlag = false;
    this.userInfo.token = window.location.search.split('token=')[1].split('#')[0];
    console.log(this.userInfo.token);
    if (this.userInfo.token !== '[TOKEN]' && this.userInfo.token!== '' && !!this.userInfo) {
      this.initData();
    } else {
      window.location.href = 'protocol://user_allinfo#check';
    }
    window.check = (res) => {
      this.userInfo.token = res.split('token=')[1].split('&')[0];
      this.initData();
    }
    window.gettoken = (res) => {
      this.userInfo.token = res;
      if (window.location.search.split('token=')[1].split('&')[0] === '' || window.location.search.split('token=')[1].split('&')[0] === '[TOKEN]') {
        window.location.replace(window.location.href.replace('#/', this.userInfo.token));
      } else {
        this.initData();
      }
    }
    window.invited = () => {
      if (invitedFlag) {
        return;
      }
      invitedFlag = true;
      setTimeout(() => {
        getNewUserReward(this.userInfo).then((result) => {
          let res = result.data
          if (res.status === 200) {
            if (window.location.search.split('token=')[1].split('&')[0] === '' || window.location.search.split('token=')[1].split('&')[0] === '[TOKEN]') {
              window.location.replace(window.location.href.replace('#/', this.userInfo.token));
            }
            this.initData();
          } else {
            console.log('服务器故障，请稍后重试');
          }
        }).catch(()=> {
          console.log('服务器故障,请稍后重试');
        });
      }, 5000);
    }
  },
  computed: {},
  methods: {
    initData() {
      getNewUserRewardFlag(this.userInfo).then((result) => {
        let res = result.data
        if (res.status === 200) {
          this.activityStatus = res.data;
        } else {
          console.log('服务器故障，请稍后重试');
        }
      }).catch(()=> {
        console.log('服务器故障,请稍后重试');
      });
    },
    clickTab(num) {
      this.tabIndex = num;
    },
    invite() {
      if (this.activityStatus) {
        console.log('budge');
        window.location.href = 'protocol://budgetdetail';
      } else if (this.userInfo.token) {
        console.log('share')
        window.location.href = "protocol://sharewithinfo#" + encodeURIComponent('https://qiniu.image.cq-wnl.com/content/201905176a16615dc85c49a1a02254ac256c0fea.png');
      } else {
        console.log('gettoken')
        this.user_gettoken();
      }
    },
    user_gettoken() {
      window.location.href = 'protocol://user_token#gettoken';
    },
    vedio() {

    }
  }
}
</script>
<style lang="scss" scoped>
    @import '../common/scss/index.scss';
</style>