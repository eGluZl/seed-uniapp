export default G => ({
  _ns_emits: { // 自定义事件名称
    'Xxx': '__$EMIT_XXX'
  },
  _ns_storage: { // 存储命名空间
    'WX_INFO': '__$STORAGE_WX_INFO'
  },
  _ns_globals: { // 全局变量名称
    // 'Xxx': '__$GLOBAL_XXX'
  },
  _ns_globalData: { // 全局变量集合
    'socket': null,
  },
  _ns_config: {
    'no_auth_routers': [],
    'debug': true,
    'theme_color': '#FFA700',
    'app_name': '',
    'web_socket_url': '',
    'img_base_url':''
  }
})
