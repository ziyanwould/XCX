// pages/child/selectProject/selectProject.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Jobl: app.globalData.Jobl,
      CRL: app.globalData.CRL,
      changeJob:"兼职"
    })
    // console.log(app.globalData.CRL)
    if(options.id==0){
      this.setData({
        changeJob: "全职"
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
  actives: function (e) {
    console.log(e.currentTarget.dataset.value)
    console.log("序号来着", e)
    this.setData({
      xuhao: e.currentTarget.id,
      choose: e.currentTarget.dataset.value,
      parent_id: e.currentTarget.dataset.parent_id,
    })
  },
  selectClick:function(){
    var that =this;
    if (this.data.choose!=''){
       const worktype = {
         'id': that.data.xuhao,
         'value': that.data.choose,
         'parent_id': that.data.parent_id,
       }
       wx.setStorageSync('worktype', worktype)
       wx.showToast({
         title: '选中成功',
         icon: 'loading',
         duration: 500
       });
       setTimeout(function(){
         wx.navigateBack({
           delta: 1
         })
       },500)

    }else{
      wx.showToast({
        title: '请选着选项',
        icon: 'loading',
        duration: 1000
      });
    }
  }
})