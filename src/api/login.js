import request from '@/utils/request'

//登录
export function login(username, password) {
  return request({
    url: '/user/login' + '?userName=' + username +'&password=' + password,
    method: 'post'
  })
}

