// pages/child/visitor/visitor.js
var app = getApp()
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.vistor()
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
  //简历访客
  vistor:function(){
    //20180529 获取浏览者
      var that = this ;
      var setdata = {
        "resume_id": 0,
        "pageIndex": 0,
        "pageSize": 0
      }
      common.request('usercenter/get_resume_visitor', {
        params: setdata,
        success: function (res) {
          console.log("获取浏览者", res)
          that.setData({
            endMessage:res.data.message
          })
        }
      }, app.globalData.login)
    
  }
})