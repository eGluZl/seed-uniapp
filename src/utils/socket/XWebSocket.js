import MD5 from 'blueimp-md5/js/md5.min'

let Queue = [] //消息队列
let Pool = {}              // Promise池
let IsOpen = false     // 是否打开,socket只会open一次哦
let IsClose = false    // 是否是主动关闭
let heartTimer = null      // 心跳句柄
let reConnectTimer = null   // 重连句柄
let IsLogin = false    // 是否登录connect成功,区别IsOpen
let IsNetWork = true   // 是否有网络

class XWebSocket {
  constructor(config) {

    this.config = {
      ...{
        debug: process.env.NODE_ENV === 'development',
        isReconnect: true,
        isHeartData: true,
        heartTime: 3000,
        reConnectTime: 3000
      }, ...config
    }

    this.initSocket = (success, fail) => {
      const that = this
      if (IsLogin) {
        that.config.debug && console.log('%c [XWebSocket] %c 已经登录了', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
        typeof success === 'function' && success(that)
        return
      }

      uni.getNetworkType({
        success(res) {
          if (res.networkType === 'none') {
            IsNetWork = false
            IsLogin = false
            uni.showModal({
              title: '网络错误',
              content: '请打开网络服务',
              showCancel: false
            })
            typeof fail === 'function' && fail(res, that)
          } else {
            IsNetWork = true
            that.config.debug && console.log('%c [XWebSocket] %c 网络正常,开始建立连接...', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
            uni.connectSocket({
              url: that.config.url,
              method: that.config.method,
              header: that.config.header,
              protocols: that.config.protocols,
              success: () => {
                IsLogin = true
                that.config.debug && console.log('%c [XWebSocket] %c 连接成功', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
                typeof success === 'function' && success(that)
              },
              fail: (err) => {
                that.config.debug && console.log('%c [XWebSocket] %c 连接失败', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
                typeof fail === 'function' && fail(err, that)
              }
            })
          }
        },
        fail(err) {
        },
      })
    }

    /**
     * 发送socket消息
     * @param event
     * @param data
     */
    this.send = (event, data) => {
      const that = this
      const nData = (!data || JSON.stringify(data) === '{}') ? '' : data;
      const message = Object.assign({}, {event: event, data: nData});
      const uuid = MD5(event + (that._isJson(nData) ? JSON.stringify(nData) : nData))
      return new Promise((resolve, reject) => {
        // 一摸一样的请求只响应第一次
        // 过滤了socket队列,否则队列重发送消息无法收到
        if (!Pool[uuid]) {
          Pool[uuid] = {message: message, resolve: resolve, reject: reject};
        }
        if (IsOpen && IsLogin && IsNetWork) {
          that.config.debug && console.log('%c [XWebSocket] %c 发送消息:', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', message)
          // @ts-ignore
          that._sendSocketMessage(message)
          typeof that.config.onSendMessageAfter === 'function' && this.config.onSendMessageAfter(message)
        } else {
          // 加入队列
          Queue.push({uuid, message})
          that.config.debug && console.log('%c [XWebSocket] %c 加入消息队列', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', message)
        }

      })
    }

    /**
     * 主动关闭
     * @param option
     */
    this.close = (option) => {
      IsLogin = false
      IsClose = true
      if (this.config.isHeartData) {
        this.config.debug && console.log('%c [XWebSocket] %c 关闭心跳', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
        this._clearHeart()
      }

      uni.closeSocket(option)
      this.config.debug && console.log('%c [XWebSocket] %c 主动退出', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')

    }

    /**
     * 监听socket是否打开成功
     * @Param option
     * */
    uni.onSocketOpen((header) => {
      this.config.debug && console.log('%c [XWebSocket] %c socket打开成功', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
      this._auth()
      typeof this.config.onSocketOpen === 'function' && this.config.onSocketOpen(header)
      IsOpen = true
      IsLogin = true
      // 判断是否需要发送心跳包
      if (this.config.isHeartData) {
        this.config.debug && console.log('%c [XWebSocket] %c 开始心跳', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
        this._clearHeart()
        this._startHeart()
      }

      // 发送消息队列消息
      Queue.forEach((queue) => {
        this.config.debug && console.log('%c [XWebSocket] %c 发送队列消息:', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', Queue[i].message)
        const uuid = queue.uuid
        let message = queue.message
        const event = message.event
        const data = message.data
        delete message.event
        delete message.data
        this.send(event, data, message).then((response) => {
          Pool[uuid].resolve(response)
        })
      })
      Queue = []
    })

    /**
     * 监听网络状态
     * @Param callback
     * */
    uni.onNetworkStatusChange((res) => {
      if (res.isConnected) {
        IsNetWork = true
        if (!IsLogin && this.config.isReconnect) {
          this.config.debug && console.log('%c [XWebSocket] %c 监听到有网络服务,重新连接socket', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
          this._reConnectSocket() // 连接成功IsLogin=true
        }
      } else {
        this.config.debug && console.error('%c [XWebSocket] %c 监听到没有网络状态', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
        IsLogin = false
        IsNetWork = false
        this.config.isHeartData && this._clearHeart()
        if (typeof this.config.onNetworkStatusNone === 'function') {
          this.config.onNetworkStatusNone()
        } else {
          // @ts-ignore
          uni.showModal({
            title: '网络错误',
            content: '请打开网络服务',
            showCancel: false
          })
        }
      }
    })

    /**
     * 监听WebSocket接受到服务器的消息事件
     * @Param callback
     * */
    uni.onSocketMessage(e => {
      if (typeof this.config.onSocketMessageBefore === 'function' && !this.config.onSocketMessageBefore(e)) {
        // 如果onSocketMessageBefore返回false 那么终止下面的逻辑
        // 如果onSocketMessageBefore返回true 那么继续下面的逻辑
        return
      }
      const json = this._isJson(e.data)
      const uuid = json['event']
      if (!json || !uuid || !Pool[uuid]) {
        return
      }
      this.config.debug && console.log('%c [XWebSocket] %c 收到消息:', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', json['data'])
      let data = json['data'] || null
      if (typeof this.config.onSocketMessageAfter === 'function') {
        this.config.onSocketMessageAfter(data, Pool[uuid])
      } else {
        Pool[uuid].resolve(data)
      }
      delete Pool[uuid]
    })

    /**
     * 监听socket被关闭
     * @Param callback
     * */
    uni.onSocketClose(res => {
      this.config.debug && console.error('%c [XWebSocket] %c 连接被关闭', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', res)
      typeof this.config.onSocketClose === 'function' && this.config.onSocketClose(res)
      IsLogin = false
      // 停止心跳检查
      if (this.config.isHeartData) {
        this.config.debug && console.log('%c [XWebSocket] %c 关闭心跳', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
        this._clearHeart()
      }
      if (!IsClose && this.config.isReconnect) {
        // 断线重连
        this._reConnectSocket()
      }
    })

    /**
     * 监听socket错误
     * @Param callback
     * */
    uni.onSocketError(res => {
      this.config.debug && console.error('%c [XWebSocket] %c socket出错', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', res)
      // 目前还不清楚socket出错会不会导致open关闭 暂时默认不关闭
      // IsOpen = false;
      IsLogin = false
      if (this.config.isReconnect) {
        this.initSocket()
      }
      typeof this.config.onSocketError === 'function' && this.config.onSocketError(res)
    })


  }

  _sendSocketMessage(message) {
    return new Promise((resolve, reject) => {
      uni.sendSocketMessage({
        data: JSON.stringify(message.data),
        success: (res) => resolve(res),
        fail: (fail) => reject(fail)
      })
    })
  }

  _auth() {
    const that = this
    that.config.debug && console.log('%c [XWebSocket] %c 开始认证', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
    const token = uni.getStorageSync('access_token')
    uni.sendSocketMessage({
      data: JSON.stringify({
        type: 'auth',
        client: 'wxApp',
        authorization: token
      }),
      success(res) {
        that.config.debug && console.log('%c [XWebSocket] %c 认证成功', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', res)

      },
      fail(err) {
        that.config.debug && console.error('%c [XWebSocket] %c 认证失败', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', err)
      },
    })
  }

  // 开始心跳
  _startHeart() {
    const that = this
    heartTimer = setInterval(() => {
      that.config.debug && console.log('%c [XWebSocket] %c 心跳', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
      uni.sendSocketMessage({
        data: JSON.stringify({
          type: 'ping',
        }),
        success(res) {
          that.config.debug && console.log('%c [XWebSocket] %c 心跳成功', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', res)

        },
        fail(err) {
          that.config.debug && console.error('%c [XWebSocket] %c 心跳失败', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', err)
        },
      })
    }, that.config.heartTime)
  }

  // 清理心跳
  _clearHeart() {
    clearInterval(heartTimer)
    heartTimer = null
  }

  // socket 重连
  _reConnectSocket() {
    if (!IsLogin) {
      const that = this
      reConnectTimer = setInterval(() => {
        that.config.debug && console.log('%c [XWebSocket] %c 重新连接:', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
        that.initSocket((e) => {
          if (e.config.isSendHeart) {
            e.config.debug && console.log('%c [XWebSocket] %c 开始心跳:', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;')
            e._clearHeart()
            e._startHeart()
          }
          clearInterval(reConnectTimer)
          reConnectTimer = null
        }, (err, e) => {
          e.config.debug && console.log('%c [socket] %c 重新连接失败', 'color:#fff;background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;', 'color:#000;', err)
        })
      }, that.config.reConnectTime)
    }
  }

  _isJson(str) {
    if (typeof str === 'object')
      return str;
    try {
      let obj = JSON.parse(str);
      return !!(typeof obj === 'object' && obj) ? obj : false;
    } catch (e) {
      return false;
    }
  }
}

export default XWebSocket
