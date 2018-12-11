// pages/child/Message/Message.js
var app = getApp()
var common = require('../../../utils/common.js');
var page = 1;
var pageSize = 10;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemz: {
    active:"active"
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
    page=0;
    this.getMessage()
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
      list: []
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
    
    var setdata = {
      "pageIndex": page,
      "pageSize": pageSize
    }
    // common.request('api/resume/deliver_log', {
    common.request('api/message/get_list', {
      params: setdata,
      success: function (res) {
        console.log("信息记录", res)

        //common.deleteEmptyProperty(res);
        // var res = JSON.stringify(res);
        console.log('格式化消息',res);
        if (that.data.list.length<1){
          var list = that.data.list;
          for (var i = 0; i < res.data.data.list.length; i++) {
            list.push(res.data.data.list[i]);
            that.setData({
              list: list
            });
           
          }
        
        }else {
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
      }
    }, app.globalData.login)
  }
  ,
  Ondetail:function(e){
    try {
      wx.setStorageSync('message', e.currentTarget.dataset.value)
    } catch (e) {
    }
    wx.navigateTo({
      url: '/pages/child/Mesdetail/Mesdetail'//实际路径要写全
    })
  }
})