import axios from 'axios';
axios.defaults.crossDomain=true

export function getActivityStatus(info) {
  return axios.request('//192.168.2.79:9095/api/freeCalenderActivity/getActivityStatus', {
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
  return axios.request('//192.168.2.79:9095/api/freeCalenderActivity/createActivityUserContactInfo', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'post',
    data: {
      name: info.name,
      mobile: info.phone,
      address: info.address,
      activityId: info.activityId,
      id: info.changeAddressFlag,
      description: info.description
    }
  })
}
export function getActivityUserContactInfo(info) {
  return axios.request('//192.168.2.79:9095/api/freeCalenderActivity/getActivityUserContactInfo', {
    headers: {
      'Authorization': 'Bearer ' + info.token
    },
    method: 'get',
    params: {
      key: info.key 
    }
  })
}

export function cnzzPush(addr) {
    try{
      _czc.push(['_trackEvent', addr, 'click', 'android']);
    } catch (e) {
        console.log('_czc is not define');
    }
}