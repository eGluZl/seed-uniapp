import $store from '@/store'
import uni_request from '@/utils/uni_request/uni_request.js'
import G from '@/G'

let baseURL = process.env.VUE_APP_BASE_URL || 'https://www.baidu.com/'

const request = uni_request({
  baseURL
})

request.interceptors.request.use(async (config, ...args) => { // 请求拦截器
  const url = args[1]
  let isNeedToken = true
  if (G._ns_config.no_auth_routers.length > 0) {
    isNeedToken = !G._ns_config.no_auth_routers.includes(url.toString())
  }
  const isLogin = $store.state.app.isLogin
  if ($store.state.app.token == null && isNeedToken === true && isLogin === false) { // 如果没得 token
    await new Promise(resolve => {
      G.$login().then(() => {
        resolve()
      })
    })
  }
  if (isNeedToken === true) {
    config.header.Authorization = 'Bearer ' + $store.state.app.token // 把 token 放在请求头
  }
  config.header['content-type'] = 'application/x-www-form-urlencoded'

  return config
})

request.interceptors.response.use(async (response, ...args) => { // 响应拦截器
  // ...
  return response
})

request.onerror = (...args) => console.log(args) // 错误监听

export default request
