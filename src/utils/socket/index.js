import UniSocket from './uni.socket'

// url	服务器地址
// reconnection	发送错误时是否进行重连，默认true
// buffer	是否建立缓存池，当发送消息失败时会吧消息保存到缓存池等待下次发送
// heartRate	系统自动与将程序心跳发送至服务端，默认60000ms
// heartRateType	设置心跳触发的事件，默认触发HEARTBEAT事件
// autoEmitBuffer	是否自动发送缓存池中的数据，默认false
export const config = {
  url: ``,
  heartRate: 30 * 1000, // 心跳时间间隔
  isHeartData: true,        // 是否发送心跳
  reconnection: true,         // 是否断线重连
  heartRateType: 'ping',
  buffer: true,
  heartData: {},
}

let socketObj = null

export const socket = () => {
  if (socketObj != null) {
    return socketObj
  } else {
    const uid = G.$store.state.app.wxUser.id
    const url = `${G._ns_config.web_socket_url}/${uid}`
    const token = G.$store.state.app.token
    const heartData = {
      token
    }
    socketObj = new UniSocket(Object.assign(config, { url, heartData }))
    return socketObj
  }
}



