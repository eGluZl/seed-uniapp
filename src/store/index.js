import Vue from 'vue' //引入 Vue
import Vuex from 'vuex' //引入 Vuex
import createLogger from 'vuex/dist/logger'
import G from '@/G'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules,
  plugins: G._ns_config.debug ? [createLogger()] : []
})
