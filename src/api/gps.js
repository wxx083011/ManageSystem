import request from '@/utils/request'

// 获取用户的机构列表
export function geCheckorg (params) {
  return request({
    url: 'cargps/geCheckorg',
    method: 'post',
    params
  })
}
// 分页获取某机构下的离线车辆
export function queryCarInfoOffline (params) {
  return request({
    url: 'cargps/queryCarInfoOffline',
    method: 'post',
    params
  })
}
// 分页获取某机构下的在线车辆

export function queryCarInfoOnline (params) {
  return request({
    url: 'cargps/queryCarInfoOnline',
    method: 'post',
    params
  })
}
