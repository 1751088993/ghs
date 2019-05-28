import axios from 'axios';
axios.defaults.crossDomain=true
// product
// let hostName = '//tbkapi.51wnl-cq.com'
// test
let hostName = '//192.168.1.179:9092'
export function getNewUserRewardFlag(info) {
  return axios.request(hostName + '/api/userActivity/getNewUserRewardFlag', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'get'
  })
}
export function getNewUserReward(info) {
  return axios.request(hostName + '/api/userActivity/getNewUserReward', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + info.token
    },
    method: 'post'
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