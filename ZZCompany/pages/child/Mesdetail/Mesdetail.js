// pages/child/Mesdetail/Mesdetail.js
var app = getApp()
var common = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '13:20',
    imgurl: 'http://www.liujiarong.top/WX/messageHr.jpg',
    title: '我的客服',
    count: '您好,陈紫嫣对您的职位《建筑装饰装修专包二级》很感兴趣，已投递了他的简历，快去看看他是否贵公司所需的人才吧！'
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
    try {
      let value = wx.getStorageSync('message')
      console.log("内容",value)
      if (value) {
        that.setData({
          time: `${value.Ctime != null ? value.Ctime:'00:00'}`,
          imgurl: 'http://www.liujiarong.top/WX/messageHr.jpg',
          title: '我的客服',
          count: value.Detail,
          id:value.ID
        })
      }
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '获取数据失败',
        icon: 'loading',
        duration: 1500
      });

      setTimeout(function(){
        wx.navigateBack({
          delta: 2
        })
      },1500)
    }

    that.reader()
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
  reader(){
    let that = this;
    let datas = {
      "message_id": that.data.id
    }
    console.log(datas, datas)
    common.post('api/message/set_read', datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果

    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
    
      //reject()
    });
  }
})