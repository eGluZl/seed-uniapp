import G from '@/G'
import { SET_LOCATION_INFO } from '@/store/mutation-types'

//#ifdef MP-WEIXIN
import QQMapWX from './qqmap-wx-jssdk.min'

const qqMap = new QQMapWX({
  key: G._ns_config.qq_map_key
})

//#endif

export function reverseGeoCoder (lat, lng) {
  return new Promise((resolve, reject) => {
    //#ifdef MP-WEIXIN
    qqMap.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
    //#endif
  })
}

export function calculateDistance (start, end, mode) {
  return new Promise((resolve, reject) => {
    if (!end) {
      reject('end not found')
      return
    }
    //#ifdef MP-WEIXIN
    qqMap.calculateDistance({
      from: start || '',
      to: end,
      mode: mode || 'walking',
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      },
    })
    //#endif
  })
}

export function pickLocation () {
  //#ifdef MP-WEIXIN
  uni.navigateTo({
    url: `plugin://chooseLocation/index?key=${G._ns_config.qq_map_key}&referer=${G._ns_config.app_name}`
  })
  //#endif
}

export function getLocation () {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02', geocode: true,
      success (res) {
        const lat = res.latitude
        const lng = res.longitude
        //#ifdef MP-WEIXIN
        reverseGeoCoder(lat, lng).then(geoRes => {
          const reqId = geoRes.request_id
          const result = geoRes.result
          G.$store.commit(SET_LOCATION_INFO, {
            request_id: reqId,
            result: result,
            request_time: new Date()
          })
          resolve(geoRes)
        }).catch(err => {
          reject(err)
        })
        //#endif
      },
      fail (err) {
        reject(err)
      }
    })
  })

}

export function direction (mode, to) {
  return new Promise((resolve, reject) => {
    //#ifdef MP-WEIXIN
    qqMap.direction({
      mode: mode || 'walking',
      to,
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
    //#endif
  })
}
