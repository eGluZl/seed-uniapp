import G from '@/G'

export default {
  data() {
    return {
      navBarHeight: 64,
      app_name: G._ns_config.app_name,
      theme_color: G._ns_config.theme_color
    }
  },
  computed: {
    upx2px() {
      return (upx) => uni.upx2px(upx)
    },
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
    uni.createSelectorQuery().select('.uni-navbar').fields({size: true}, (res) => {
      if (res == null) {
        that.navBarHeight = 64
      } else {
        that.navBarHeight = res.height
      }
    }).exec();
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
    backFun() {
      this._$router.pop(1)
    },
    toShop(shop) {
      const tpl = Number(shop.template)
      switch (tpl) {
        case G._ns_config.tpl.food: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopHome, param)
          break
        }
        case G._ns_config.tpl.hotel: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (Object.keys(shop.checkIn ? shop.checkIn : {}).length > 0) {
            param.checkIn = JSON.stringify(shop.checkIn)
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          if (shop.roomId != null) {
            param.roomId = shop.roomId
          }
          this._$router.push(this.$routers.hotelDetail, param)
          break
        }
        case G._ns_config.tpl.leisure: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopReview, param)
          break
        }
        case G._ns_config.tpl.supermarket: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopHome, param)
          break
        }
        case G._ns_config.tpl.movie: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopReview, param)
          break
        }
        case G._ns_config.tpl.fruits: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopHome, param)
          break
        }
        case G._ns_config.tpl.beauty: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopReview, param)
          break
        }
        case G._ns_config.tpl.agriculture: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopHome, param)
          break
        }
        case G._ns_config.tpl.afternoon: {
          let param = {
            shopId: shop.id,
            tpl: tpl,
          }
          if (shop.onemore != null) {
            param.onemore = shop.onemore
          }
          this._$router.push(this.$routers.shopReview, param)
          break
        }
      }
    },
    init(){},
    getIcons(){},
  }
}
