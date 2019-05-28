<template>
<div>
  <div class="index">
    <img class="bottom_btn" src="../assets/djlq_button.png" @click="tabApk">
    <img class="home_banner" src="../assets/jpg_01.jpg">
    <img class="home_banner" src="../assets/jpg_02.jpg">
    <img class="home_banner" src="../assets/jpg_03.jpg">
    <img class="home_banner" src="../assets/jpg_04.jpg">
    <img class="home_banner" src="../assets/jpg_05.jpg">
    <img class="home_banner" src="../assets/jpg_06.jpg">
    <img class="home_banner" src="../assets/jpg_07.jpg">
    <img class="home_banner" src="../assets/jpg_08.jpg">
    <img class="home_banner" src="../assets/jpg_09.jpg">
    <img class="home_banner" src="../assets/jpg_10.jpg">
    <img class="home_banner" src="../assets/jpg_11.jpg" style="margin-bottom: 70px;" @click="tabAbout">
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import {cnzzPush} from '../common/api/api';
export default {
  name: 'index',
  data() {
  },
  created() {
   cnzzPush('SRL.百万回馈.IM')
  },
  mounted() {
  },
  computed: {},
  methods: {
    tabAbout() {
      cnzzPush('SRL.百万回馈.购划算介绍.CK');
      setTimeout(() => {
        window.location.href = 'https://mobile.51wnl-cq.com/hlsys/luodiye/ghs-sem-2/gouhuasuan-refer.html'
      }, 150);
    },
    tabApk() {
      cnzzPush('SRL.百万回馈.立即领取.CK');
      setTimeout(() => {
        var iframe = document.createElement('iframe');
        var aLink = document.createElement('a');
        var body = document.body;
        // 隐藏iframe及a
        aLink.style.cssText = 'display:none;width:0px;height:0px;';
        iframe.style.cssText = 'display:none;width:0px;height:0px;';
        aLink.href = 'https://qiniu.apk.cq-wnl.com/33ac195fdcfd4a53b34573b7a7ef4d50.apk';
        body.appendChild(aLink);
        console.log(aLink);
        aLink.click();
      }, 150);
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '../common/scss/index.scss';
    .bottom_btn{
      width: 100%;
      position: fixed;
      bottom: 0;
    }
</style>