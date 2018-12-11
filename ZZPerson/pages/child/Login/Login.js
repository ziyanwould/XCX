// pages/child/Login/Login.js
var common = require('../../../utils/common.js');
var interval = null;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"登录建筑猎聘",
    titleOther:"注册",
    inputT1:"请输入您的手机号码",
    inputT2: "请输入收到的验证码",
    valMess:"获取验证码",
    valMessPan:true,
    btnCot:"登录",
    dealPan:true,
    lastCot:"密码登录",
    lastPan:true,
    time:"获取验证码",
    currentTime:61,
    leibie: 1,
    note: false
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.line_type==1){
      this.setData({
        title: "注册建筑猎聘",
        titleOther: "登录",
        inputT1: "请输入您的手机号码",
        inputT2: "请输入收到的验证码",
        valMess: "获取验证码",
        valMessPan: true,
        btnCot: "注册",
        dealPan: true,
        lastCot: "密码登录",
        lastPan: false,
        leibie: 0,
        note: false
      })
    } else if (options.line_type == 2){
      this.setData({
        title: "登录建筑猎聘",
        titleOther: "注册",
        inputT1: "请输入已验证的手机号或邮箱",
        inputT2: "请输入密码",
        valMess: "获取验证码",
        valMessPan: false,
        btnCot: "登录",
        dealPan: false,
        lastCot: "手机号登录",
        lastPan: true,
        leibie: 2,
        note: true
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  tapType:function(){
    var that = this;
    var Pan = that.data.titleOther;
   
    if(Pan=="注册"){
      that.setData({
        title: "注册建筑猎聘",
        titleOther: "登录",
        inputT1: "请输入您的手机号码",
        inputT2: "请输入收到的验证码",
        valMess: "获取验证码",
        valMessPan: true,
        btnCot: "注册",
        dealPan: true,
        lastCot: "密码登录",
        lastPan: false,
        leibie: 0,
        note: false
      })

    } else if (Pan=="登录"){
      that.setData({
        title: "登录建筑猎聘",
        titleOther: "注册",
        inputT1: "请输入您的手机号码",
        inputT2: "请输入收到的验证码",
        valMess: "获取验证码",
        valMessPan: true,
        btnCot: "登录",
        dealPan: true,
        lastCot: "密码登录",
        lastPan: true,
        leibie: 1,
        note: false
      })
    }
  },
   tapOther: function () {
    var that = this;
    var PanS = that.data.lastCot;

    if (PanS=="密码登录") {
      that.setData({
        title: "登录建筑猎聘",
        titleOther: "注册",
        inputT1: "请输入已验证的手机号或邮箱",
        inputT2: "请输入密码",
        valMess: "获取验证码",
        valMessPan: false,
        btnCot: "登录",
        dealPan: false,
        lastCot: "手机号登录",
        lastPan: true,
        leibie: 2,
        note: true
      })

    } else if (PanS=="手机号登录") {
      that.setData({
        title: "登录建筑猎聘",
        titleOther: "注册",
        inputT1: "请输入您的手机号码",
        inputT2: "请输入收到的验证码",
        valMess: "获取验证码",
        valMessPan: true,
        btnCot: "登录",
        dealPan: true,
        lastCot: "密码登录",
        lastPan: true,
        leibie: 1,
        note: false
      })
    }
  },
   getCode: function (options) {
     var that = this;
     var currentTime = that.data.currentTime
     interval = setInterval(function () {
       currentTime--;
       that.setData({
         time: currentTime + '秒'
       })
       if (currentTime <= 0) {
         clearInterval(interval)
         that.setData({
           time: '重新发送',
           currentTime: 61,
           disabled: false
         })
       }
     }, 1000)
   },
   sendverifcode:function(e){
     this.setData({
       mobile: e.detail.value
     })
   },
   numbercode:function(e){
     this.setData({
       numbers: e.detail.value
     })
     
   },
  //  getVerificationCode() { 没有传值写法
   getVerificationCode:function(e){
     
    //  发送验证码
     let mobile = this.data.mobile;
     let regMobile = /^1\d{10}$/;
     if (!regMobile.test(mobile)) {
       wx.showModal({
         content: '您的手机号输入有误',
         showCancel: false,
         success: function (res) {
           if (res.confirm) {
             //console.log('用户点击确定')
           }
         }
       });
       return false;
     }
     //启动计数器
     this.getCode();
     var that = this
     that.setData({
       disabled: true
     })
     if (that.data.leibie==0){
       var tmoble = "手机注册"
     }else{
       var tmoble = "手机登录"
       
     };

     wx.request({
       url: app.globalData.url+'api/common/send_smscode',
       header: {
         'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

       },
       method: 'POST',
       data: {
         mobile: that.data.mobile,
         action_type: tmoble,
         content: "登录/注册建筑猎聘"

       },


       success: function (res) {
         console.log("接口返回", res.data)
         wx.showToast({
           title: res.data.message,
           icon: 'success',
           duration: 2000
         });

        //  存储验证码是否发送成功
         that.setData({
           note: res.data.success
         })
       }

     })
   },//登录注册确定按钮
   oginRegistration(){
    var that = this
    if (that.data.note != true && (that.data.leibie!=2)){
      console.log("note", that.data.note)
      wx.showModal({
        content: '您的' + that.data.btnCot+'有误,请重新输入',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      });
      return false;
    }else{
      console.log("note",that.data.note)
      if (that.data.leibie == 0) {
        var typenuber = {
            'phone': that.data.mobile,
            'code': that.data.numbers
          }
        var url = 'register'
      } else if (that.data.leibie == 1){
        var typenuber = {        
          "phone": that.data.mobile ,
          "action_type": "手机登录",
          "code": that.data.numbers,
         
         }
        var url = 'phone_login_code_pwd'
      }else{
        var typenuber = {
          "phone": that.data.mobile,
          "action_type": "手机登录",
          "password": that.data.numbers,
        }
        var url = 'phone_login_code_pwd'
        
      };
       

     
      wx.request({
        url: app.globalData.url+'api/common/'+url,
        header: {
          'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

        },
        method: 'POST',
        data: typenuber,


        success: function (res) {
          console.log("接口2返回", res.data)
          if(!res.data.success){
            wx.showToast({
              title: res.data.message,
              icon: 'loading',
              duration: 1500
            });

            return false;
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1500
            });
            console.log("登录凭证", res.data)
            wx.setStorage({
              key: "login",
              data: res.data.data.login_token
            })
            //更新全局变量方式 20180515
            app.globalData.login = res.data.data.login_token
            typeof cb == "function" && cb(app.globalData.login)
            //更新全局变量结束 20180515

            var cai = common.getinst(res.data.data.login_token)
            console.log("换一种写法", cai)
          
            setTimeout(function () {
              //要延时执行的代码  
              wx.navigateBack({
                delta: 1
              })
            }, 1500) //延迟时间 这里是1秒
           

          }
         


        }

      })

    }

   },
     /**授权 */
  bindGetUserInfo: function (e) {
     console.log("授权", e.detail.userInfo)
     if (e.detail.userInfo){
       wx.setStorage({
         key: "user",
         data: e.detail.userInfo
       })
      
     }
     console.log("获取消息", e.detail.userInfo)
     this.oginRegistration()

    
  
  }


})