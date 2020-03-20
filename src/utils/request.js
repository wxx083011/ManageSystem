import axios from 'axios'
// export const address = 'http://192.168.3.135:8206/' // 测试环境
export const address = 'http://192.168.3.119:8206/' // 赖工测试
// export const address = 'http://14.21.40.133:8008/adminapi/' // 外网测试

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