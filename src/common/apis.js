import axios from 'axios'

let apiRemote = null
let cancel = null
const CancelToken = axios.CancelToken

if (window.location.origin) {
    apiRemote = window.location.origin
} else {
    apiRemote = window.location.protocol + '//' + window.location.host
}

const axiosConfig = {
    baseURL: apiRemote,
    timeout: 10000
}

const sendRequest = (url, headers, method, sendData, isUpload) => {
    axiosConfig.url = url
    axiosConfig.headers = headers
    axiosConfig.method = (method || 'GET').toUpperCase()
    if (axiosConfig.method === 'POST') {
        axiosConfig.data = sendData || {}
    }
    if (isUpload) {
        axiosConfig.onUpLoadProgress = (progressEvent) => {}
        axiosConfig.onDownLoadProgress = (progressEvent) => {}
        axiosConfig.maxContentLength = 50000
    }
    axiosConfig.cancelToken = new CancelToken(function executor (c) {
        cancel = c
    })
    return new Promise ((resolve, reject) => {
        axios.request(axiosConfig).then (resp => {
            resolve(resp)
        }).catch(error => {
            reject({
                code: 'error_request',
                desc: '服务器开小差了~ 请稍后重试'
            })
        })
    })
}

export default {
    getAPIOne () {
        return sendRequest('/api/one', {
            "Content-Type": "application/json; cahrset=utf-8"
        }, 'get', {}, true)
    },
    cancel () {
        cancel && cancel()
    }
}


