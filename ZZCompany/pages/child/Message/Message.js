// pages/child/Message/Message.js
var app = getApp()
var common = require('../../../utils/util.js');
var page = 0;
var pageSize = 10;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemz: {
      active: "active"
    },
    inputShowed: false,
    inputVal: "",
    list: [

    ],
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })
    page = 0;
    that.getMessage()
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
    let that = this;
    page = 0;
    that.getMessage()
    that.setData({
      list:[]
    })
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
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    var page = 1;
    this.getMessage()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    ++page;
    wx.showLoading({
      title: '玩命加载中',
    })
    this.getMessage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //20180529 投递记录
  getMessage: function () {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    common.post('api/message/get_list', {
      "pageIndex": page,
      "pageSize": pageSize
    }, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      console.log("信息记录", res)

      //common.deleteEmptyProperty(res);
      // var res = JSON.stringify(res);
      console.log('格式化消息', res);
      if (res.list!=0) {
        var list = that.data.list;
        for (var i = 0; i < res.list.length; i++) {
          list.push(res.list[i]);
          that.setData({
            list: list
          });

        }

      } else {
        wx.showToast({
          title: '没有更多消息',
          icon: 'loading',
          duration: 3000
        });
      }





      wx.hideLoading();
      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
      //存储结束
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
      //reject()
    });
    // common.request('api/resume/deliver_log', {

  }
  ,
  Ondetail: function (e) {
    // console.log(e.currentTarget.dataset.value)
    try {
      wx.setStorageSync('message', e.currentTarget.dataset.value)
    } catch (e) {
    }
    wx.navigateTo({
      url: '/pages/child/Mesdetail/Mesdetail'//实际路径要写全
    })
  }
})