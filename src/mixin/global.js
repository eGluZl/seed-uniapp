import G from '@/G'
import { SET_NAV_BAR_HEIGHT } from '@/store/mutation-types'

export default {
  data() {
    return {
      navBarHeight: 64,
      app_name: G._ns_config.app_name,
      theme_color: G._ns_config.theme_color
    }
  },
  computed: {
    getImageURL() {
      return (url) => {
        if (url && url.length > 0) {
          const subStr = url.substr(0, 4)
          return subStr === 'http' ? url : G._ns_config.img_base_url + url
        }
      }
    },
    isLogged(){
      return G.$store.state.app.isLogin
    },
  },
  watch:{
    isLogged(){
      this.init()
    }
  },
  onLoad() {
    const that = this
    uni.createSelectorQuery().select('.global-navbar').fields({ size: true }, (res) => {
      if (res == null) {
        that.navBarHeight = G.$store.state.app.navBarHeight
      } else {
        if (res.height === 0) {
          that.navBarHeight = G.$store.state.app.navBarHeight
        } else {
          that.navBarHeight = res.height
          G.$store.commit(SET_NAV_BAR_HEIGHT, res.height)
        }
      }
    }).exec()
  },
  onReady() {
    this.getIcons()
  },
  onShow() {
    uni.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    if(this.isLogged){
      console.log('begin run init on show')
      this.init()
    }
  },
  methods: {
    init(){},
    getIcons(){},
  }
}
