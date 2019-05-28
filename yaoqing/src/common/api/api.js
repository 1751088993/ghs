import axios from 'axios';
axios.defaults.crossDomain=true
// product
let hostName = '//tbkapi.51wnl-cq.com'
// test
// let hostName = '//192.168.1.179:9092'
export function getInviteUserGroupInfo(info) {
  return axios.request(hostName + '/api/useraccount/getInviteUserGroupInfo', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'get',
    params: {
      key: 'tbkzerobuygoods'
    }
  })
}
export function getInviteUserReturnList(info, requestIndex) {
  return axios.request(hostName + '/api/useraccount/getInviteUserReturnList?page=' + requestIndex, {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'get'
  })
}
export function cnzzPush(addr) {
  //区分万年历和微信打开
  try {
    window._czc.push(['_trackEvent', addr, 'click', 'android']);
  } catch (e) {
    console.log('_czc is not define');
  }
}