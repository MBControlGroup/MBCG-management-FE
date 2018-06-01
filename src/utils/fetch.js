import { notification } from 'antd';
import { isProduction, mockingServer, productionServer } from '../app-config/network';

import { emitter } from './';

function myFetch(url, data) {
  const header = {
    'Content-Type': 'application/json',
  };
  const bodyData = {
    data,
  };
  // const realUrl = isProduction ? (productionServer + url) : (mockingServer + url);
  const realUrl = url;
  return fetch(realUrl, {
    credentials: 'same-origin',
    method: 'POST',
    headers: header,
    body: JSON.stringify(bodyData),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return { res };
    })
    .catch((err) => {
      return { err };
    });
}

function postErrorHandler(err) {
  const { message } = err;
  switch (message) {
    case 'NETWORK_ERROR':
      notification.error({
        message: '网络请求错误',
        duration: 2,
      });
      break;
    default:
      break;
  }
}

/**
 *
 * @param {string} url  进行匹配的url
 * @param {any} data  需要传输的数据
 */
async function post(url, data) {
  let { res, err } = await myFetch(url, data);
  if (err) {
    postErrorHandler(err);
    res = null;
  } else if (res.Code === 200 && res.Enmsg === 'ok') {
    err = null;
  } else if (res.Code === 300) {
    err = new Error(res.Cnmsg);
    res = null;
  } else if (res.Code === 302) {
    // 用户状态失效
    emitter.emit('USER_STATUS_FAILURE');
  } else if (res.Code === 402) {
    //
  } else {
    notification.error({
      message: res.Cnmsg,
      duration: 2,
    });
    err = new Error(res.Cnmsg);
    res = null;
  }
  return new Promise((resolve, reject) => {
    if (res) {
      return resolve(res);
    }
    return reject(err);
  });
}


export default post;
