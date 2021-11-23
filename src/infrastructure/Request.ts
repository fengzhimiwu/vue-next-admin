/* axios封装
 * 请求拦截、相应拦截、错误统一处理
 */

import axios from 'axios';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
import { removeToken } from '@/utils/localToken';
import router from '@/router/routes';

// 环境的切换
// if (process.env.NODE_ENV === 'development') {
//   // axios.defaults.baseURL = 'http://mda.anxhit.com/';
// } else if (process.env.NODE_ENV === 'debug') {
//   // axios.defaults.baseURL = 'http://mda.anxhit.com/';
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = '';
// }
// // 强制换
// axios.defaults.baseURL = process.env.VUE_APP_APIHOST;

const service = axios.create({
  baseURL: process.env.VUE_APP_APIHOST,
  timeout: 5000,
  withCredentials: true
})

// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin']='*';

// // 请求拦截器
// axios.interceptors.request.use(
//     config => {
//         // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//         // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//         const token = store.state.token;
//         token && (config.headers.Authorization = token);
//         return config;
//     },
//     error => {
//         return Promise.error(error);
//     })
//

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    // const newRes = {
    //   code:0,
    //   msg:"",
    //   data:response.data
    // }
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          removeToken();
          router.replace({
            path: '/user/login',
            query: { redirect: router.currentRoute.value.fullPath }
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          ElMessage.error('登录过期，请重新登录');
          // 清除token
          removeToken();
          // store.commit('loginSuccess', null);
          // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/user/login',
              query: {
                redirect: router.currentRoute.value.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          // Toast({
          //     message: '网络请求不存在',
          //     duration: 1500,
          //     forbidClick: true
          // });
          console.log('return 404');
          break;
        case 500:
          if (error.response.data) {
            ElMessage.error(error.response.data.Message);
          }
          else {
            ElMessage.error('服务器错误');
          }
          break;
        // 其他错误，直接抛出错误提示
        default:
          // Toast({
          //   message: error.response.data.message,
          //   duration: 1500,
          //   forbidClick: true
          // });
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

class RequestHelper {
  static ToUrlQuery(data: any, name: string, params: Array<string> = []): string {
    if (typeof data === 'undefined' || data == null) {
      return '';
    }
    let json = '';
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        this.ToUrlQuery(item, `${name}[${index}]`, params);
      });
    } else if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean' || typeof data === 'symbol' || typeof data === 'bigint') {
      params.push(this.ToUrlItem(String(data), name));
    } else if (data instanceof Date) {
      params.push(this.ToUrlItem(data.toLocalString("yyyy-MM-dd HH:mm:ss"), name));//处理时区问题
    } else {
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];

        if (data[key] === null) {
          continue;
        }

        this.ToUrlQuery(data[key], `${name === '' ? '' : name + '.'}${key}`, params);
      }
    }
    json = params.join('&');
    return json;
  }

  static ToUrlItem(data: string, name: string) {
    return `${name}=${data}`;
  }

  static FormatDate(data: any) {
    if (data == null || "" == data || "undefined" == data) {
      return data;
    }
    //防止时间格式字符串后,影响列表渲染.copy Object进行传输
    const formData = Object.assign({}, data);
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (value instanceof Date) {
        formData[key] = value.toLocalString("yyyy-MM-dd HH:mm:ss");
      }
    })
    return formData;
  }
}

/*
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: any = '', name = '') {
  // console.log('get ' + url);
  return new Promise((resolve, reject) => {
    service
      .get(url + '?' + RequestHelper.ToUrlQuery(params, name))
      .then((res) => {
        // console.log('get back :');
        // console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('get error : ');
        console.log(err);
        reject(err);
      });
  });
}


/*
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url: string, params: any = '', name = '') {
  // console.log('get ' + url);
  return new Promise((resolve, reject) => {
    service
      .delete(url + '?' + RequestHelper.ToUrlQuery(params, name))
      .then((res) => {
        // console.log('get back :');
        // console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('delete error : ');
        console.log(err);
        reject(err);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    // console.log(service.defaults.headers);
    service
      .post(url, JSON.stringify(RequestHelper.FormatDate(params)))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("post", err);
        reject(err.data);
      });
  });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url: string, params: any) {
  // console.log(url);
  return new Promise((resolve, reject) => {
    // console.log(service.defaults.headers);
    service
      .put(url, JSON.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        // console.log(err);
        reject(err.data);
      });
  });
}