import request from '@/utils/request'

//数据流
export function queryCarDataFlow(params) {
  return request({
    url: 'cardataflow/queryCarDataFlow',
    method: 'post',
    params
  })
}
//OBD信息
export function queryObdData(params) {
  return request({
    url: 'obddata/queryObdData',
    method: 'post',
    params
  })
}
//登录日志
export function queryCarloginrec(params) {
  return request({
    url: 'carloginrec/queryCarloginrec',
    method: 'post',
    params
  })
}

//账号列表查询
export function queryAccount(params) {
  return request({
    url: '/account/queryAccount',
    method: 'get',
    params
  })
}
