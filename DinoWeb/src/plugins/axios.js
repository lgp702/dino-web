'use strict'

import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'
import qs from 'qs'

// add loading for api call
let loading
let needLoadingRequestCount = 0

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '',
    background: 'rgba(255, 255, 255, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

function catchError(error) {
  if (error.response) {
    let messageInfo = error.response.data.message
    if (messageInfo === null || messageInfo === '' || messageInfo === undefined) {
      messageInfo = error.response.data
    }
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: messageInfo || '请求参数异常',
          type: 'error'
        })
        break
      case 401:
        // localStorage.removeItem('user')
        Vue.prototype.$message({
          message: messageInfo || '密码错误或账号不存在！',
          type: 'warning'
        })
        break
      case 403:
        Vue.prototype.$message({
          message: messageInfo || '无访问权限，请联系企业管理员',
          type: 'warning'
        })
        break
      case 404:
        Vue.prototype.$message({
          message: messageInfo || '404错误，访问路径没找到，请联系技术支持',
          type: 'error'
        })
        break
      case 500:
        Vue.prototype.$message({
          message: messageInfo || '500服务器内部错误，请联系技术支持',
          type: 'error'
        })
        break
      default:
        Vue.prototype.$message({
          message: messageInfo || '服务端异常，请联系技术支持',
          type: 'error'
        })
    }
  } else {
    Vue.prototype.$message({
      message: 'Network connection failed',
      type: 'error'
    })
  }
  return Promise.reject(error)
}

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS';
// axios.defaults.withCredentials = true

let config = {
  // crossDomain: true,
  // headers: {  
  //   'content-type': 'application/x-www-form-urlencoded'
  //   // 'Access-Control-Allow-Origin': '*',  
  //   // "Content-Type": "application/json;charset=utf-8"
  //   // "Access-Control-Allow-Origin": "*",
  //   // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  //   // "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
  // },  
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 300 * 1000, // Timeout
  // withCredentials: true // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    if (config.method === 'post') {
			config.data = qs.stringify(config.data)
    }
    
    // add loading
    if (!config.disableLoading) {
      showFullScreenLoading()
    }
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    try {
      console.log('request : ' + response.request.responseURL)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      console.log(response)
    }
    // remove loading
    tryHideFullScreenLoading()

    // Do something with response data
    return response
  },
  function(error) {
    // remove loading
    tryHideFullScreenLoading()
    // Do something with response error
    return catchError(error)
  }
)

Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
