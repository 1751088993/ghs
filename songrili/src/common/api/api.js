import axios from 'axios';
axios.defaults.crossDomain=true
let hostName = '//tbkapi.51wnl-cq.com'
export function getActivityStatus(info) {
  return axios.request(hostName + '/api/freeCalenderActivity/getActivityStatus', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'get',
    params: {
      key: 'tbkfreecalendar'
    }
  })
}

export function createActivityUserContactInfo(info) {
  return axios.request(hostName + '/api/freeCalenderActivity/createActivityUserContactInfo', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'post',
    data: {
      name: info.name,
      mobile: info.phone,
      address: info.city + ' ' + info.loc,
      activityId: info.activityId,
      id: info.orderId ? info.orderId : 0,
      description: info.description
    }
  })
}
export function getActivityUserContactInfo(info) {
  return axios.request(hostName + '/api/freeCalenderActivity/getActivityUserContactInfo', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'get',
    params: {
      key: 'tbkfreecalendar'
    }
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