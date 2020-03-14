import request from '@/utils/request'

/* 注册start */
export function getValidateCode (params) { // 获取图形验证码
  return request(
    {
      url: 'userinfo/sms/getValidateCode',
      method: 'post',
      params
    })
}
