<template>
<div>
  <div class="index" :class="{hidden: !activityOnline}">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_01.jpg">
    <img :class="{hidden: nextShow}" alt="home_banner" class="home_banner" src="../assets/button1.jpg" @click="donotJump">
    <img :class="{hidden: !nextShow}" alt="home_banner" class="home_banner" src="../assets/button2.jpg" @click="jumpNext">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_03.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_04.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_05.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_06.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_07.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_08.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_09.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_10.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_11.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_12.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_13.jpg">
  </div>
  <div class="index" :class="{hidden: !!activityOnline}" style="background:#fff;">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_001.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_002.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_003.jpg">
    <img alt="home_banner" class="home_banner" src="../assets/jpg_004.jpg">
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { getActivityStatus, cnzzPush } from '../common/api/api';
import { toast } from '@wnl/ui';

const Toast = new toast();
export default {
  name: 'index',
  data() {
    return {
      userInfo: {
        status: 1,
        token: ''
      },
      activityOnline: true,
      nextShow: false
    };
  },
  created() {
    // console.log(this.$route.query);
    cnzzPush('SRL.吉时日历.IM');
    this.userInfo.token = window.location.search.split('token=')[1].split('#')[0];
    let that = this;
    this.activityOnline = this.userInfo.status !== 0;
    getActivityStatus(this.userInfo).then((result) => {
      let res = result.data
      // window.alert(res.data.status);
      if (res.data.status === 3) {
        this.$router.replace({
          name: 'end',
          path: '/end'
        });
      }
      that.userInfo.activityId = res.data.activityId
      that.userInfo.status = res.data.status
      this.userInfo = this.userInfo
      this.activityOnline = this.userInfo.status !== 0;
      this.nextShow = this.userInfo.status === 2;
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    }).catch(()=> {
      window.alert('服务器故障,请稍后重试');
    })
  },
  mounted() {
    console.log('mounted')
  },
  computed: {},
  methods: {
    donotJump() {
      cnzzPush('SRL.吉时日历.灰立即领取CK');
      Toast.show('请先完成以上步骤');
    },
    jumpNext() {
      cnzzPush('SRL.吉时日历.亮立即领取CK');
      this.$router.push({
        name: 'next',
        path: '/next'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '../common/scss/index.scss';
</style>