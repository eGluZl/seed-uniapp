import G from '@/G'
import XWebSocket from "@/utils/socket/XWebSocket";

const config = {
  url: G._ns_config.web_socket_url,
  heartTime: 30 * 1000, // 心跳时间间隔
  isHeartData: true,        // 是否发送心跳
  isReconnect: true,         // 是否断线重连
  reConnectTime: 3000,      // 断线重连检测时间间隔
  debug: false,  // debug
  onSocketOpen: header => {
    console.log('onSocketOpen')
  },
  onSocketError: res => {
    console.log('onSocketError')
  },
  onSocketClose: res => {
    console.log('onSocketClose')
  },
  onSocketMessageAfter: (data, pool) => {
    if (data.error === 0) {
      pool.resolve(data);
    } else {
      pool.reject(data);
    }
  },
  onSendMessageAfter(res) {
    console.log(res)
  },
}

export default new XWebSocket(config)

