import $storage from '@/utils/uni_storage/uni_storage.js'
import $router, { route } from '@/utils/uni_router/uni_router.js'
import { _API_STATUS_OK } from '@/apis'

let debounceTimeout = null
export default G => ({
  $router,
  $storage,
  $route: route,
  $clone (object) {
    if (!(typeof object === 'object')) return
    return JSON.parse(JSON.stringify(object))
  },
  $request (api, callback = () => {
  }, conf = {}) { // 快速网络请求
    const { uloading, endStillLoading } = conf
    return new Promise((resolve, reject) => {
      !uloading && G.$loading()
      if (api.length) {
        Promise.all(api).then(res => { // 一般用于多个 get 请求
          callback(res.map(e => e.data))
        }).finally(() => !endStillLoading && G.$loaded())
      } else {
        api.then(res => {
          if (res.code !== _API_STATUS_OK) {
            reject(res)
            G.$loaded()
          } else {
            resolve(res)
            callback(res.data)
          }
        }).finally(() => !endStillLoading && G.$loaded())
      }
    })
  },
  $fetchURIParams (uri, name) {
    if (uri == null || name == null || uri.length === 0 || name.length === 0) {
      return ''
    }
    const paramStr = uri.split('?')[1]
    if (paramStr == null) {
      return ''
    }
    let params = paramStr.split('&')
    if (params.length === 0) {
      return ''
    }
    const rs = params.map(p => {
      const t = p.toString().split('=')
      return t && t.length > 0 ? {
        k: t[0],
        v: t[1]
      } : null
    })
    const index = rs.findIndex(e => e.k === name.toString())
    if (index === -1) {
      return ''
    }
    return rs[index]
  },
  $debounce (fn, wait) {
    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout)
    }
    debounceTimeout = setTimeout(fn, wait)
  },
  $isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n
  },
  $maskStr (cc, num = 4, mask = '*') {
    return `${cc}`.slice(-num).padStart(`${cc}`.length, mask)
  },
  $imgUrl (url) {
    if (url != null && url.length > 0) {
      const subStr = url.substr(0, 4)
      return subStr === 'http' ? url : G._ns_config.img_base_url + url
    } else {
      return ''
    }
  },
  $moneyUnit (number, decimalDigit) {
    const addWan = (integer, number, multiple, decimalDigit) => {
      const digit = getDigit(integer)
      if (digit > 3) {
        let remainder = digit % 8
        if (remainder >= 5) {   // ‘十万’、‘百万’、‘千万’显示为‘万’
          remainder = 4
        }
        return Math.round(number / Math.pow(10, remainder + multiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万'
      } else {
        return Math.round(number / Math.pow(10, multiple - decimalDigit)) / Math.pow(10, decimalDigit)
      }
    }

    const getDigit = (integer) => {
      let digit = -1
      while (integer >= 1) {
        digit++
        integer = integer / 10
      }
      return digit
    }

    decimalDigit = decimalDigit == null ? 2 : decimalDigit
    let integer = Math.floor(number)
    let digit = getDigit(integer)
    // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
    let unit = []
    if (digit > 3) {
      let multiple = Math.floor(digit / 8)
      if (multiple >= 1) {
        let tmp = Math.round(integer / Math.pow(10, 8 * multiple))
        unit.push(addWan(tmp, number, 8 * multiple, decimalDigit))
        for (let i = 0; i < multiple; i++) {
          unit.push('亿')
        }
        return unit.join('')
      } else {
        return addWan(integer, number, 0, decimalDigit)
      }
    } else {
      return number
    }

  },
  $checkPhone (phoneNumber) {
    if (phoneNumber) {
      return /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/.test(phoneNumber)
    } else {
      return false
    }
  },
  $checkIdNumber (idNumber) {
    if (idNumber && idNumber.length > 15) {
      return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(idNumber)
    } else {
      return false
    }
  },
  $checkNickName (name) {
    return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)
  },
  $isEmptyStr (str) {
    if (str) {
      let rs
      try {
        rs = /^[ ]+$/.test(str)
        return rs
      } catch (e) {
        console.error(e)
        return true
      }
    } else {
      return true
    }
  },
  $openSetting () {
    return new Promise((resolve, reject) => {
      // 打开小程序的设置
      // #ifdef MP-WEIXIN
      uni.openSetting({
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
      // #endif

      // App跳转系统的设置界面
      // #ifdef APP-PLUS
      uni.getSystemInfo({
        async success (res) {
          if (res.platform === 'ios') { //IOS
            await plus.runtime.openURL('app-settings://')
            resolve()
          } else if (res.platform === 'android') { //安卓
            let main = plus.android.runtimeMainActivity()
            let Intent = plus.android.importClass('android.content.Intent')
            let mIntent = new Intent('android.settings.ACTION_SETTINGS')
            await main.startActivity(mIntent)
            resolve()
          }
        }
      })
      // #endif
    })
  },
  $joinSpace (sn) {
    if (sn == null) {
      return
    }
    let ans = ''
    let count = 0
    for (let i = 0; i < sn.length; i++) {
      const char = sn[i]
      ans += char
      count++
      if (count === 4) {
        ans += ' '
        count = 0
      }
    }
    return ans
  },
  $update () {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调

    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success (res) {
          if (res.confirm) {
            G.$storage[G._ns_storage.update_check_time] = new Date()
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
})
