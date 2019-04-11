import axios from 'axios'
import NProgress from 'nprogress'
import {message} from 'antd';

// axios 超时
axios.defaults.timeout = 8000;

// 异常处理
const error = (dat = {}) => {
  switch (parseInt(dat.code)) {
    case 0:
      message.error(dat.message);
      break;
    case 1:
      message.error(dat.message);
      break;
    case 200:
      message.error(dat.message);
      break;
    case 400:
      message.error(dat.message);
      break;
    case 401:
      window.location.href = '#/login';
      message.error(dat.message);
      break;
    case 403:
      message.error(dat.message);
      break;
    case 404:
      message.error(dat.message);
      break;
    case 500:
      message.error(dat.message);
      break;
    case 503:
      message.error(dat.message);
      break;
    default:
      message.error(dat.message || '网络异常');
      break;
  }
};

// 请求拦截器
axios.interceptors.request.use(function (req) {
  NProgress.start();
  NProgress.set(0.5);
  NProgress.inc();
  return req;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (res) {
  NProgress.done();
  if (res.data.code === 200) {
    return res;
  } else {
    error(res.data);
    return {};
  }
}, function (e) {
  NProgress.done();
  error(e.response ? e.response.data : '');
  return Promise.reject(e);
});

// 封装请求
export default (url, options) => {
  let opt = options || {};
  opt.token = sessionStorage.getItem("token") || '';
  let headers = opt.headers || {'Content-Type': 'application/json'};
  return new Promise((resolve, reject) => {
    axios({
      method: opt.type || 'GET',
      url: url,
      baseURL: opt.baseURL || URL[opt.otherURL] || URL.baseURL,
      params: opt.params || {},
      // 判断是否有自定义头部，以对参数进行序列化。不定义头部，默认对参数序列化为查询字符串。
      data: opt.data || {},
      responseType: opt.dataType || 'json',
      withCredentials: opt.withCredentials || false,
      // 设置默认请求头
      headers: {...headers, 'Authorization': opt.token},
      ...opt.config
    }).then(res => {
      resolve(res.data || {})
    }).catch(error => {
      reject(error)
    })
  })
}
