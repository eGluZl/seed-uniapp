import Vue from 'vue'
import App from './App'
import mixin from '@/mixin/global'
import $store from '@/store/index'
import * as filters from '@/utils/filters'
import $storage from '@/utils/uni_storage/uni_storage.js'
import router, {route} from '@/utils/uni_router/uni_router.js'
import NP from '@/utils/number-precision/index'
import G from '@/G'
import routers from '@/router'
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import * as map from '@/utils/map/index'
import uView from "uview-ui";
Vue.use(uView);

dayjs.extend(duration)
dayjs.extend(isBetween)

Vue.prototype.$store = G.$store = $store
Vue.prototype.$storage = $storage
Vue.prototype.$route = route
Vue.prototype._$router = router
Vue.prototype.$np = G.$np = NP
Vue.prototype.$routers = G.$routers = routers
Vue.prototype.$dayjs = G.$dayjs = dayjs
Vue.prototype.$map = G.$map = map

Vue.mixin(mixin)
Object.keys(filters).forEach(e => Vue.filter(e, filters[e]))
Object.setPrototypeOf(Vue.prototype, G)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
