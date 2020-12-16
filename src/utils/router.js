import $store from '@/store/index.js'
import router from '@/utils/uni_router/uni_router.js'
router.beforeEach = (to, next) => { // 全局导航守卫
  console.log('全局导航守卫', to, next)
  if ($store.state.app.token) { // 防止 token 获取失败进入其他页面出现意外错误。如果有 token，就正常路由
    next()
  } else { // 如果没有 token
    // await ...
    next()
  }
}
