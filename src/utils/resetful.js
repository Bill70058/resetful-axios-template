import service from './request'
import ASSERT from './assert'
class Resetful {
  constructor() {
    this.config = {
      url: '',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {},
      dataType: 'json',
      success: '', // function
      fail: () => {
        // TOAST.warning({ title: '网络或服务器异常', duration: 1500})
      }, // function
      complete: () => {}, // function
    }
  }

  mixin(userConfig, defaultConfig) {
    if (userConfig && userConfig.toString() === '[object Object]') {
      defaultConfig = Object.assign({}, defaultConfig, userConfig)
    }
    defaultConfig.header = Object.assign({}, this.config.header, defaultConfig.header || {})
    return Object.assign({}, this.config, defaultConfig)
  }

  open(config) {
    return new Promise((resolve, reject) => {
      service({
        ...config,
        url: config.url,
        data: config.data,
        method: config.method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: config.header // 设置请求的 header
      }).then(response => {
        if (config.success && ASSERT(config.success, 'function')) {
          config.success(response) // 默认操作
        } else {
          resolve(response)
        }
      }).catch(err => {
        if (config.fail && ASSERT(config.fail, 'function')) {
          config.fail()
        } else {
          reject(err)
        }
      }).finally(() => {
        config.complete()
      })
    })
  }

  post(url, config) {
    let postConfig = {
      url: url,
      method: 'POST'
    }
    return this.open(this.mixin(config, postConfig))
  }
  
  put(url, config) {
    let putConfig = {
      url,
      method: 'PUT'
    }
    return this.open(this.mixin(config, putConfig))
  }

  get(url, config) {
    let getConfig = {
      url: url,
      method: 'GET'
    }
    return this.open(this.mixin(config, getConfig))
  }
  delete(url, config) {
    let deleteConfig = {
      url: url,
      method: 'DELETE'
    }
    return this.open(this.mixin(config, deleteConfig))
  }
}

const instance = new Resetful()
export default instance

/**
 * import instance from 'xxx'
 * instance.post('/xxx', {data: {xxx}}).then()
 */