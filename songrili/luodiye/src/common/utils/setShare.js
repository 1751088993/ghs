import {
  wnlShare,
  wxShare,
  toast
} from '@wnl/ui';
import device from './device';

const shareInfo = {
  title: '期待这么久的另一半，原来就是TA!',
  text: '点击收获脱单秘籍！',
  image: 'https://qiniu.image.cq-wnl.com/content/2018121936814dce1f0340dc8c08b124aafc4193.png',
  url: window.location.href.replace('#/result?', '#/?').replace('#/share?', '#/?').replace('#/', '')
}

export default function setShare(params = shareInfo) {
  const share = {
    title: params.title,
    text: params.text,
    image: params.image,
    url: params.url
  };
  const wxshare = {
    title: params.title,
    text: params.text,
    imgUrl: params.image,
    url: params.url,
    callback() {
      let toast1 = new toast();
      toast1.show('分享成功');
    }
  };
  if (device.wnl) {
    wnlShare.setShareData(share);
  }
  if (device.weixin) {
    new wxShare(wxshare)
  }
};
