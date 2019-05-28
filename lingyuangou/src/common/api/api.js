import axios from 'axios';
axios.defaults.crossDomain=true
// product
let hostName = '//tbkapi.51wnl-cq.com'
// test
// let hostName = '//192.168.1.179:9092'
export function GetZeroBuyGoodsActivityStatus(info) {
  return axios.request(hostName + '/api/zeroBuyGoodsActivity/GetZeroBuyGoodsActivityStatus', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'get',
    params: {
      key: 'tbkzerobuygoods'
    }
  })
}
export function GeTbkZeroBuyActivityUatmItems(info, requestIndex) {
  return axios.request(hostName + '/api/tbkDg/GeTbkZeroBuyActivityUatmItems', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: JSON.stringify({
      "pageNo": requestIndex,
      "adzonId": 0,
      "favoritesId": 0
    })
  })
}
export function cnzzPush(addr) {
  //区分万年历和微信打开
    try{
      _czc.push(['_trackEvent', addr, 'click', 'android']);
    } catch (e) {
        console.log('_czc is not define');
    }
}