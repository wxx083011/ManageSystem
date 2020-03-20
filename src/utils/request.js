import axios from 'axios'
export const address = ''

// import store from '@/store'
// 创建axios实例
const service = axios.create({
  baseURL: address,
  timeout: 15000 // 请求超时时间
})

// http request 请求拦截器，有token值则配置上token值
service.interceptors.request.use(
  config => {
    // 是否需要token
    if (!config.token) {
      let token = sessionStorage.getItem('ms_token')
      if (token) {
        config.headers.Authorization = token
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

service.interceptors.response.use(
  function(response) {
    // 请求正常则返回
    try {
      // console.log(response);
      return Promise.resolve(response)
    } catch (error) {
      console.log(error)
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default service