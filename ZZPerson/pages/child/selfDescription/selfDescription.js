// pages/child/selfDescription/selfDescription.js
var common = require('../../../utils/common.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   input:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const types = options.type;
    //兼职全职导入不同表
    if (!options.parTime) {
      this.setData({
        info: app.globalData.ResumeFull,
        key: types
      })
    } else {
      this.setData({
        info: app.globalData.resumePart,
        key: types,
        parTime: true,
      })
    }

    this.setData({
      resumeId: this.data.info.resume_id
    })
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
  watchPassWord: function (event) {
  
    const inputs = event.currentTarget.dataset.self;
    this.setData({
      [inputs]: event.detail.value
    })
   
  }
  , save: function (event) {
    this.getResume()
    //取消全局更新 
    // if (this.data.parTime) {
    //   //更新全局变量方式 20180519
    //   app.globalData.resumePart = this.data.info
    //   typeof cb == "function" && cb(app.globalData.resumePart)
    //   //更新全局变量结束 20180519
    // } else {
    //   //更新全局变量方式 20180519
    //   app.globalData.ResumeFull = this.data.info
    //   typeof cb == "function" && cb(app.globalData.ResumeFull)
    //   //更新全局变量结束 20180519
    // }
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 800
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  }

  ,  //20180529 保存期望工作
  getResume: function () {
    var that = this;
    var setdata = {
      "resume_id": that.data.resumeId,
      "intro": that.data.info.selfDescription.content
    }
    common.request('api/resume/save_intro', {
      params: setdata,
      success: function (res) {
        console.log("保存自定义", res)

      }
    }, app.globalData.login)
  }
})