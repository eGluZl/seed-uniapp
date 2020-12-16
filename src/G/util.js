import $storage from '@/utils/uni_storage/uni_storage.js'
import $router, {route} from '@/utils/uni_router/uni_router.js'
import {_API_STATUS_OK} from '@/apis'

let debounceTimeout = null
export default G => ({
  $router,
  $storage,
  $route: route,
  $clone(object) {
    if (!(typeof object === 'object')) return
    return JSON.parse(JSON.stringify(object))
  },
  $request(api, callback = () => {
  }, conf = {}) { // 快速网络请求
    const {uloading, endStillLoading} = conf
    return new Promise((resolve, reject) => {
      !uloading && G.$loading()
      if (api.length) {
        Promise.all(api).then(res => { // 一般用于多个 get 请求
          callback(res.map(e => e.data))
        }).finally(() => !endStillLoading && G.$loaded())
      } else {
        api.then(res => {
          if (res.code != _API_STATUS_OK) {
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
  $fetchURIParams(uri, name) {
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
  $debounce(fn, wait) {
    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout)
    }
    debounceTimeout = setTimeout(fn, wait)
  },
  $isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n
  },
  $maskStr(cc, num = 4, mask = '*') {
    return `${cc}`.slice(-num).padStart(`${cc}`.length, mask)
  },
  $imgUrl(url) {
    if (url != null && url.length > 0) {
      const subStr = url.substr(0, 4)
      return subStr === 'http' ? url : G._ns_config.img_base_url + url
    } else {
      return ''
    }
  },
  $moneyUnit(number, decimalDigit) {
    const addWan = (integer, number, multiple, decimalDigit) => {
      const digit = getDigit(integer);
      if (digit > 3) {
        let remainder = digit % 8;
        if (remainder >= 5) {   // ‘十万’、‘百万’、‘千万’显示为‘万’
          remainder = 4;
        }
        return Math.round(number / Math.pow(10, remainder + multiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
      } else {
        return Math.round(number / Math.pow(10, multiple - decimalDigit)) / Math.pow(10, decimalDigit);
      }
    };

    const getDigit = (integer) => {
      let digit = -1;
      while (integer >= 1) {
        digit++;
        integer = integer / 10;
      }
      return digit;
    };

    decimalDigit = decimalDigit == null ? 2 : decimalDigit;
    let integer = Math.floor(number);
    let digit = getDigit(integer);
    // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
    let unit = [];
    if (digit > 3) {
      let multiple = Math.floor(digit / 8);
      if (multiple >= 1) {
        let tmp = Math.round(integer / Math.pow(10, 8 * multiple));
        unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
        for (let i = 0; i < multiple; i++) {
          unit.push('亿');
        }
        return unit.join('');
      } else {
        return addWan(integer, number, 0, decimalDigit);
      }
    } else {
      return number;
    }

  },
  $checkPhone(phoneNumber) {
    if (phoneNumber) {
      return /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/.test(phoneNumber)
    } else {
      return false
    }
  },
  $checkIdNumber(idNumber) {
    if (idNumber && idNumber.length > 15) {
      return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(idNumber)
    } else {
      return false
    }
  },
  $checkNickName(name) {
    return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)
  },
  $isEmptyStr(str) {
    if (str) {
      let rs;
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
  $winRate() {
    const sys = uni.getSystemInfoSync();
    const winWidth = sys.windowWidth;
    return 750 / winWidth;
  },
  $winHeight() {
    const sys = uni.getSystemInfoSync();
    return sys.windowHeight * this.$winRate()
  },
  $marginHeight() {
    const systemInfo = uni.getSystemInfoSync()
    const platform = systemInfo.platform
    let height_between_status_bar_and_capsule
    switch (platform) {
      case 'ios' : {
        height_between_status_bar_and_capsule = 6
        break
      }
      case 'android' : {
        height_between_status_bar_and_capsule = 8
        break
      }
      default : {
        height_between_status_bar_and_capsule = 6
        break
      }
    }
    return height_between_status_bar_and_capsule
  },
  $capsuleHeight() {
    const heightInfo = this.$barHeight()
    const statusBar = heightInfo.statusBar
    const customBar = heightInfo.customBar
    const height_between_status_bar_and_capsule = this.$marginHeight()
    return customBar - statusBar - height_between_status_bar_and_capsule
  },
  $navBarHeight() {
    const heightInfo = this.$barHeight()
    const statusBar = heightInfo.statusBar
    const height_between_status_bar_and_capsule = this.$marginHeight()
    return this.$capsuleHeight() + height_between_status_bar_and_capsule * 2 + statusBar
  },
  $barHeight() {
    const systemInfo = uni.getSystemInfoSync()
    let statusBar
    let customBar

    // #ifdef MP-WEIXIN
    statusBar = systemInfo.statusBarHeight
    const custom = wx.getMenuButtonBoundingClientRect()
    customBar = custom.bottom + custom.top - systemInfo.statusBarHeight
    // #endif

    // #ifdef MP-ALIPAY
    const info = my.getSystemInfoSync()
    statusBar = info.statusBarHeight
    customBar = info.titleBarHeight
    // #endif


    // #ifdef APP-PLUS
    statusBar = systemInfo.statusBarHeight
    customBar = systemInfo.statusBarHeight + 45
    // #endif

    return {
      statusBar: statusBar,
      customBar: customBar
    }
  },
  $openSetting() {
    return new Promise((resolve, reject) => {
      // 打开小程序的设置
      // #ifdef MP-WEIXIN
      uni.openSetting({
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
      // #endif

      // App跳转系统的设置界面
      // #ifdef APP-PLUS
      uni.getSystemInfo({
        async success(res) {
          if (res.platform === 'ios') { //IOS
            await plus.runtime.openURL("app-settings://");
            resolve()
          } else if (res.platform === 'android') { //安卓
            let main = plus.android.runtimeMainActivity();
            let Intent = plus.android.importClass("android.content.Intent");
            let mIntent = new Intent('android.settings.ACTION_SETTINGS');
            await main.startActivity(mIntent);
            resolve()
          }
        }
      });
      // #endif
    })
  },
  $joinSpace(sn) {
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
  $deepCompare(x, y) {
    let i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
      let p;
      // remember that NaN === NaN returns false
      // and isNaN(undefined) returns true
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
      }

      // Compare primitives and functions.
      // Check if both arguments link to the same object.
      // Especially useful on the step where we compare prototypes
      if (x === y) {
        return true;
      }

      // Works in case when functions are created in constructor.
      // Comparing dates is a common scenario. Another built-ins?
      // We can even handle functions passed across iframes
      if ((typeof x === 'function' && typeof y === 'function') ||
          (x instanceof Date && y instanceof Date) ||
          (x instanceof RegExp && y instanceof RegExp) ||
          (x instanceof String && y instanceof String) ||
          (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString();
      }

      // At last checking prototypes as good as we can
      if (!(x instanceof Object && y instanceof Object)) {
        return false;
      }

      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
      }

      if (x.constructor !== y.constructor) {
        return false;
      }

      if (x.prototype !== y.prototype) {
        return false;
      }

      // Check for infinitive linking loops
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
        return false;
      }

      // Quick checking of one object being a subset of another.
      // todo: cache the structure of arguments[0] for performance
      for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }
      }

      for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }

        switch (typeof (x[p])) {
          case 'object':
          case 'function':

            leftChain.push(x);
            rightChain.push(y);

            if (!compare2Objects(x[p], y[p])) {
              return false;
            }

            leftChain.pop();
            rightChain.pop();
            break;

          default:
            if (x[p] !== y[p]) {
              return false;
            }
            break;
        }
      }

      return true;
    }

    if (arguments.length < 1) {
      return true; //Die silently? Don't know how to handle such case, please help...
      // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

      leftChain = []; //Todo: this can be cached
      rightChain = [];

      if (!compare2Objects(arguments[0], arguments[i])) {
        return false;
      }
    }

    return true;
  },
  $getDay(day) {
    if (!day) {
      return ''
    }
    let dayText = ''
    switch (day) {
      case 0:
        dayText = '周日';
        break;
      case 1:
        dayText = '周一';
        break;
      case 2:
        dayText = '周二';
        break;
      case 3:
        dayText = '周三';
        break;
      case 4:
        dayText = '周四';
        break;
      case 5:
        dayText = '周五';
        break;
      case 6:
        dayText = '周六';
        break;
      default:
        dayText = '';
        break;
    }
    return dayText
  },
  $getLocationInfo() {
    let location = G.$store.state.app.location
    let ans
    const reqTime = location != null ? location.request_time : -1
    let expire = false
    if (location != null && Object.keys(location).length > 0 && reqTime !== -1) {
      const now = new Date().getTime()
      const before = new Date(reqTime).getTime()
      const diff = now - before
      if (diff == null || diff > (10 * 60 * 1000)) {
        expire = true
      }
    }
    if (location && Object.keys(location).length > 0 && expire === false) {
      ans = location.result.location
      ans.city = location.result.ad_info.city
      ans.recommend = location.result.formatted_addresses.recommend
      return Promise.resolve(ans)
    } else {
      return G.$map.getLocation().then(res => {
        if (res != null) {
          ans = res.result.location
          ans.city = res.result.ad_info.city
          ans.recommend = res.result.formatted_addresses.recommend
        } else {
          ans = G._ns_config.default_location
        }
        return ans
      })
    }
  }
})
