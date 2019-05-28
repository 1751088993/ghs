<template>
  <div class="next">
    <div class="info_section">
      <div class="info_line whiteBack">
        <span class="leftSpan">商品金额</span><span class="rightSpan">¥168.00</span>
      </div>
      <div class="info_line whiteBack">
        <span class="leftSpan">到手金额</span><span class="rightSpan">¥0.00</span>
      </div>
      <div class="info_line whiteBack">
        <span class="leftSpan">邮费</span><span class="rightSpan">¥8.00</span>
      </div>
      <div class="form-item clearfix whiteBack">
        <label
          for="your_name"
          class="form-item-label"
          id="nameLabel"
        >收货人姓名</label>
        <input
          class="input-inner input-name-a"
          placeholder="请输入姓名"
          type="text"
          name="name"
          id="your_name"
          v-model.trim="userInfo.name"
        >
      </div>
      <div class="form-item clearfix whiteBack">
        <label
          for="your_name"
          class="form-item-label"
          id="nameLabel"
        >收货人手机号</label>
        <input
          class="input-inner input-name"
          placeholder="请输入手机号"
          type="text"
          name="name"
          id="your_name"
          v-model.trim="userInfo.phone"
        >
      </div>
      <div class="form-item form-item-noBord clearfix whiteBack" @click="selectcity">
        <label for="expressArea" class="form-item-label">所在地区</label>
        <div class="form-item-input form-item-input-place">
          <textarea
            class="input-inner wnl_cityPicker"
            type="text"
            :class="{selected: userInfo.city !== ''}"
            name="data"
            id="your_birth_place"
            readonly
            disabled
            placeholder="请选择"
            :value="userInfo.city"
          ></textarea>
        </div>
      </div>
      <div class="form-item clearfix whiteBack">
        <label
          for="your_name"
          class="form-item-label"
          id="nameLabel"
        >详细地址</label>
        <input
          class="input-inner input-name-b"
          placeholder="如街道、小区、楼栋等"
          type="text"
          name="name"
          id="your_name"
          v-model.trim="userInfo.loc"
        >
      </div>
      <div class="form-item clearfix whiteBack">
        <label
          for="your_name"
          class="form-item-label"
          id="nameLabel"
        >备注信息</label>
        <input
          class="input-inner input-name-b"
          placeholder="选填"
          type="text"
          name="name"
          id="your_name"
          v-model.trim="userInfo.description"
        >
      </div>
      <div class="info_line">
        <p>
          注意:
        </p>
        <p>
          1. 请再次确认收货信息是否正确
        </p>
        <p>
          2.商品发货默认是韵达快递；若需获取物流订单号，请联系客服
        </p>
        <p>
          3.本活动最终解释权归购划算所有
        </p>
        <p>
          &nbsp;
        </p>
      </div>
    </div>
    <div class="pay">
      <div class="money">
        合计金额:<span style="color:#FF5000">￥8.00</span>
      </div>
      <div class="go" @click="go">
        下一步
      </div>
    </div>
    <div class="confirm" :class="{hidden: !userInfo.showConfirm}">
      <div class="confirmInfo">
        <div class="title">
          提醒
        </div>
        <div class="desc">
          请再次确认<br>收货信息是否正确
        </div>
        <div class="btns">
          <div class="ok" @click="order">已确认</div>
          <div class="cancel" @click="hideConfirm">上一步</div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
// @ is an alias to /src

import config from '../common/utils/config';
import orderInfo from '../common/utils/orderInfo';
import setShare from '../common/utils/setShare';

import { formatNumber, fixIphoneX } from '../common/utils/tool';
import device from '../common/utils/device';
import { createActivityUserContactInfo, getActivityUserContactInfo, cnzzPush } from '../common/api/api';
import { picker, datePicker, cityPicker, toast, pageloading } from '@wnl/ui';

import Base64 from 'js-base64';

const Toast = new toast();
export default {
  name: 'index',
  data() {
    return {
      userInfo: {
        name: '',
        phone: '',
        address: '',
        city: '',
        loc: '',
        description: '',
        showConfirm: false,
        token: '',
        activityId: 1,
        orderId: null
      }
    };
  },
  created() {
    // console.log(this.$route.query);
    cnzzPush('SRL.收货信息.IM');
    window.document.title = "收货信息";
    if(window.location.search.split('token=')[1].split('#')[0] !== '') {
      this.userInfo.token = window.location.search.split('token=')[1].split('#')[0];
    } else if (window.localStorage.getItem('userInfo')){
      Object.assign(this.userInfo, JSON.parse(window.localStorage.getItem('userInfo')));
    }
    getActivityUserContactInfo(this.userInfo).then((result) => {
      let res = result.data;
      if (res && res.data && res.data.id) {
        this.userInfo.orderId = res.data.id;
        this.userInfo.name = res.data.name ? res.data.name : this.userInfo.name;
        this.userInfo.phone = res.data.phone ? res.data.phone : this.userInfo.phone;
        this.userInfo.city = res.data.city ? res.data.city : this.userInfo.city;
        this.userInfo.loc = res.data.loc ? res.data.loc : this.userInfo.loc;
        this.userInfo.description = res.data.description ? res.data.description : this.userInfo.description;
      }
    });
  },
  mounted() {
    window._wnl_copy_callback = (result) => {
      if (result) {
        Toast.show('复制成功!');
      }
    };
  },
  computed: {},
  methods: {
    go() {
      this.verifyInfo();
    },
    selectcity() {
      let setCityValue = (result = []) => {
        this.userInfo.city = result.map((item) => item.value).join('-');
        orderInfo.birthdaycity = this.userInfo.city;
      };
      new cityPicker({
        id: 'cityPicker2', //当前picker的id，用于在一个页面中还有多个picker时缓存上一次的选择
        level: 3, //控制需要展示几级的城市，默认为3，及具体到县级城市
        cityCode: false, //城市选择包含两套数据，包含citycode的和包含有经纬度的数据（星座类应用时使用） //通过cityCode参数控制，cityCode为false的时候展示三级城市，level无效
        onChange: () => {
          //选择项改变的时候的回调
        },
        onConfirm: (result) => {
          //点击确定后的回调
          console.log(result);
          setCityValue(result);
        }
      });
    },
    verifyInfo() {
      cnzzPush('SRL.收货信息.下一步.CK');
      const isChinese = this.userInfo.name.match(/^[\u4e00-\u9fa5]+$/);
      const nameLength = this.userInfo.name.length;
      const isPhone = this.userInfo.phone.match(/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/);
      if ((isChinese && nameLength > 5) || (!isChinese && nameLength > 10)) {
        Toast.show('请正确输入名字');
        return false;
      } else if (nameLength === 0) {
        Toast.show('请填写您的姓名');
        return false;
      }
      if (this.userInfo.phone.length === 0) {
        Toast.show('请输入手机号码');
        return false;
      }
      if (!isPhone) {
        Toast.show('请输入正确的手机号');
        return false;
      }
      if (this.userInfo.city === '') {
        Toast.show('请选择您的所在地区');
        return false;
      }
      if (this.userInfo.loc === '') {
        Toast.show('请选择您的详细地址');
        return false;
      }
      this.userInfo.showConfirm = true;
      this.userInfo.address = `${this.userInfo.city} ${this.userInfo.loc}`;
      this.userInfo.detailUrl = `${window.location.href.indexOf('index')[0]}#/end`;
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    },
    order() {
      this.userInfo.showConfirm = false;
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      cnzzPush('SRL.收货信息.确定.CK');
      createActivityUserContactInfo(this.userInfo).then((result) => {
        let res = result.data;
        console.log(res)
        if (res && res.data && res.data.id) {
          window.location.href = `//order.51wnl-cq.com/pay_web/index_ghs.html?money=8.0&source=%E5%90%89%E6%97%B6%E6%97%A5%E5%8E%86%E9%82%AE%E8%B4%B9&parterid=wnl&goodsid=CF3B4F542A1A40DC921CF78733132097&parteruserid=Bearer ${this.userInfo.token}&data=${res.data.id}&mchcode=6F3B5F1D42BDB093&mhtOrderNo=${res.data.id}&posId=&openid=&couponId=&imei=&returnUrl=${encodeURIComponent(window.location.href.split('index')[0].split('#')[0] + '#/end#/')}`
        } else {
          Toast.show('服务器故障，请稍后重试');
        }
      });
    },
    hideConfirm() {
      this.userInfo.showConfirm = false;
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    }
  }
};
</script>

<style lang="scss" scoped>
// @import '../common/scss/mixin.scss';
@import '../common/scss/index.scss';

</style>