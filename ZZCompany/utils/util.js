const Promise = require('bluebird.min.js');
const URL = 'https://api.17liepin.com/';
  const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const sjc = () => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  let n = timestamp * 1000;
  let date = new Date(n);
  //年  
  let Y = date.getFullYear();
  //月  
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  let h = date.getHours();
  //分  
  let m = date.getMinutes();
  //秒  
  let s = date.getSeconds();

  //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  

  return [Y - 50 + "-" + M, Y + "-" + M, Y];
}

//获取页面高度
const windows = () =>  {
  var height = 0;
  console.log('onLoad')
  var that = this
  wx.getSystemInfo({
    success: function (res) {
      height = res.windowHeight
    }
  })
  return height;
}


//封装请求
const requestHandler = {
  params: {},
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  },
};

const request=(url, requestHandler, token)=> {
  //注意：可以对params加密等处理  
  const params = requestHandler.params;
  //获取登录钥匙
  wx.request({
    url: URL + url,
    data: params,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header 
    header: {
      'content-type': 'application/json',
      'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
      "edition": "company",
      'login_token': token
    },
    success: res=> {
      //注意：可以对参数解密等处理  
      requestHandler.success(res)
    },
    fail: res=> {
      requestHandler.fail(res)
      wx.showToast({
        title: '网络故障',
        icon: 'loading',
        duration: 3000
      });
    },
    complete: function () {
      // complete  
    }
  })
}

// 新的的请求方式
function post(url, data, token) {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    if(data){
      wx.request({
        url: URL + url,
        data: postData,
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
          "edition": "company",
          'login_token': token
        },
        success: res => {//服务器返回数据
          console.log(res)
          if (res.data.code == 0) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件 
            resolve(res.data.data);
          } else {//返回错误提示信息
            reject(res.data.message);
          }
        },
        error: e => {
          reject('网络出错');
          wx.showToast({
            title: '网络故障',
            icon: 'loading',
            duration: 3000
          });
        }
      })
    }else{
      wx.request({
        url: URL + url,
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
          "edition": "company",
          'login_token': token
        },
        success: res => {//服务器返回数据
          console.log(res)
          if (res.data.code == 0) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件 
            resolve(res.data.data);
          } else {//返回错误提示信息
            reject(res.data.message);
          }
        },
        error: e => {
          reject('网络出错');
          wx.showToast({
            title: '网络故障',
            icon: 'loading',
            duration: 3000
          });
        }
      })
    }
  
  });
  return promise;
}

function post1(url, data, token) {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    if (data) {
      wx.request({
        url: URL + url,
        data: postData,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
          "edition": "company",
          'login_token': token
        },
        success: res => {//服务器返回数据
          console.log(res)
          if (res.data) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件 
            resolve(res.data);
          } else {//返回错误提示信息
            reject(res);
          }
        },
        error: e => {
          reject('网络出错');
          wx.showToast({
            title: '网络故障',
            icon: 'loading',
            duration: 3000
          });
        }
      })
    } else {
      wx.request({
        url: URL + url,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
          "edition": "company",
          'login_token': token
        },
        success: res => {//服务器返回数据
          console.log(res,)
          if (res.data) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件 
            resolve(res.data);
          } else {//返回错误提示信息
            reject(res);
          }
        },
        error: e => {
          reject('网络出错');
          wx.showToast({
            title: '网络故障',
            icon: 'loading',
            duration: 3000
          });
        }
      })
    }

  });
  return promise;
}

function requid(url, data, token) {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    if (data) {
      wx.request({
        url: URL + url,
        data: postData,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
          "edition": "company",
          'login_token': token
        },
        success: res => {//服务器返回数据
          console.log(res)
          if (res) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件 
            resolve(res);
          } else {//返回错误提示信息
            //reject(res);
          }
        },
        error: e => {
          reject('网络出错');
          wx.showToast({
            title: '网络故障',
            icon: 'loading',
            duration: 3000
          });
        }
      })
    } else {
      wx.request({
        url: URL + url,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
          "edition": "company",
          'login_token': token
        },
        success: res => {//服务器返回数据
          console.log(res)
          if (res) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件 
            resolve(res);
          } else {//返回错误提示信息
            //reject(res);
          }
        },
        error: e => {
          reject('网络出错');
          wx.showToast({
            title: '网络故障',
            icon: 'loading',
            duration: 3000
          });
        }
      })
    }

  });
  return promise;
}

//异步处理方案 
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}

//异步处理方案 2

const Promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
    });
  }
}



//格栅化字符串无效值
const deleteEmptyProperty = (object) => {
  for (var i in object) {
    var value = object[i];
    // sodino.com
    // console.log('typeof object[' + i + ']', (typeof value));
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i];
          //console.log('delete Array', i);
          continue;
        }
      }
      deleteEmptyProperty(value);
      if (isEmpty(value)) {
        //console.log('isEmpty true', i, value);
        delete object[i];
        //console.log('delete a empty object');
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        // if (value === null) {20180625暂时取消
        delete object[i];
       // console.log('delete ', i);
      } else {
        //console.log('check ', i, value);
      }
    }
  }
}
const isEmpty = (object) => {
  for (var name in object) {
    return false;
  }
  return true;
}

/**时间格栅化 */
const timeFat = (time) => {

  let month = time.substring(5, 7);
  let day = time.substring(8, 10);
  let comTime = time.substring(11, 16);
  let endTime = month + '月' + day + '日 ' + comTime;
  return endTime;
}

const noLogon = (beiyong)=>{
  wx.showModal({
    title: '温馨提示',
    content: '您尚未登录，请您登录后进行操作',
    confirmText: "登录",
    cancelText: "取消",
    success: function (res) {
      console.log(res);
      if (res.confirm) {
        console.log('用户点击主操作')
        wx.navigateTo({
          url: `/pages/child/logon/logon?type=company`//实际路径要写全
        })
      } else {
        console.log('用户点击辅助操作')
      }
    }
  });
}
const IsEmpty = (obj) =>
{
    
   let pdf = false;
  for (let i in obj) { // 如果不为空，则会执行到这一步，返回true
    console.log("数据", obj[i])
    if (obj[i] == undefined || obj[i] == '' || obj[i] == null || obj[i] == '请选择'){
     
       pdf = false;
       break;
    }else{
     pdf = true
    }
   
  }
  return pdf // 如果为空,返回false
//   if (Object.keys(obj).length === 0 || Object.keys(obj) == undefined || Object.keys(obj)==null) {
//     return false // 如果为空,返回false
//   }
//   console.log(Object.keys(obj))
//   return true // 如果不为空，则会执行到这一步，返回true
 }

module.exports = {
  formatTime: formatTime,
  sjc: sjc,
  windows: windows,
  request: request,
  wxPromisify: wxPromisify,
  deleteEmptyProperty: deleteEmptyProperty,
  timeFat: timeFat,
  Promisify: Promisify,
  post: post,
  post1: post1,
  IsEmpty: IsEmpty,
  noLogon: noLogon,
  requid: requid
}
