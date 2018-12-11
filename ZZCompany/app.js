var common = require('utils/util.js');
//app.js
App({
  onLaunch: function () {
    /*是否登录  更新状态*/
    var _this = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    try {
      var value = wx.getStorageSync('Jobl')
      if (value) {
        //更新全局变量方式 20180515
        _this.globalData.Jobl = value
        typeof cb == "function" && cb(that.globalData.Jobl)
        //更新全局变量结束 20180515
      } else {
        common.request('sort/get_job_type', {
          params: {},
          success:res=> {
             console.log('获取列表1', res.data.data.list,res);
            wx.setStorageSync('Jobl', res.data.data.list)

            //更新全局变量方式 20180515
            _this.globalData.Jobl = res.data.data.list
            typeof cb == "function" && cb(that.globalData.Jobl)
            //更新全局变量结束 20180515
          }
        })
      }

    } catch (e) {
      //错误执行
    }

    try {
      var value = wx.getStorageSync('CRL')
      if (value) {
        //更新全局变量方式 20180515
        _this.globalData.CRL = value
        typeof cb == "function" && cb(that.globalData.CRL)
        //更新全局变量结束 20180515
      } else {
        common.request('sort/get_ger_type', {
          params: {},
          success: res=> {
             console.log('获取列表2', res.data.data.list,res);
            wx.setStorageSync('CRL', res.data.data.list)

            //更新全局变量方式 20180515
            _this.globalData.CRL = res.data.data.list
            typeof cb == "function" && cb(that.globalData.CRL)
            //更新全局变量结束 20180515
          }
        })
      }

    } catch (e) {
      //错误执行
    }
    
    //检查登录是否失效并提示，且删除本地token值
    try {
      var value = wx.getStorageSync('token')

      common.post('usercenter/update_last_time', false, value.login_token).then((res) => {
        console.log("更新登录时间", res);//正确返回结果

      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息
    
      });
      if (value) {
        console.log("token", value)
        // common.request('api/common/check_islogin', {
        //   'login_token': value.login_token
        // })
        common.request('api/common/check_islogin', {
          params: {
            'login_token': value.login_token
          },
          success: function (res) {
            // success  
            console.log("mssage",res);

            if (res.data.message!='成功'){
              wx.showToast({
                title: '身份过期',
                icon: 'loading',
                duration: 3000
              });
              wx.removeStorageSync('token')
            }else{
           
              common.post('usercenter/get_cominfo', false, value.login_token).then((res) => {
                console.log("用户信息",res);//正确返回结果
                 console.log('res',res)
                //更新全局变量方式 20180515
                _this.globalData.userinfo = res.userinfo
                typeof cb == "function" && cb(that.globalData.userinfo)
            //更新全局变量结束 20180515
               // wx.hideLoading();
                // resolve()
              }).catch((errMsg) => {
                console.log(errMsg);//错误提示信息
                //wx.hideLoading();
                // reject()
              });
            }
          },
          fail: function () {
            // fail  
            wx.showToast({
              title: '网络故障',
              icon: 'loading',
              duration: 3000
            });
          },
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  onShow: function () {
    let that = this;
    wx.getSystemInfo({
      success: res => {
         console.log('手机信息res'+res.model)  
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }

      }
    })
  },  
  globalData: {
    isIphoneX: false,  
    Jobl: [],//职位列表
    CRL: [],//证书列表
    register:false,//登录状态
    userinfo: [], //用户信息
    url:'https://api.17liepin.com/'
  }
})