// 数字千位打点
export const toThousand = str => {
  return str.toString().replace(str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g, '$1,')
}

// 字符串打点截取
export const sliceStr = (str, len) => {
  return str ? (str.length > len ? `${str.replace(/<[\s\S]+?>/g, '').slice(0, len)}...` : str.replace(/<[\s\S]+?>/g, '')) : ''
}

export const formatRichText = (html) => { //控制小程序中图片大小
  let newContent = html.replace(/<img[^>]*>/gi, (match, capture) => {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
    return match
  })
  newContent = newContent.replace(/style="[^"]+"/gi, (match, capture) => {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;')
    return match
  })
  newContent = newContent.replace(/<br[^>]*\/>/gi, '')
  newContent = newContent.replace(/\<img/gi,
    '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"')
  return newContent
}
