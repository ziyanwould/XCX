// pages/child/ExpectWork/ExpectWork.js
var app =getApp()
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    selectList: {
        name1: "期望城市",
        count1: "请选择",
        name2: "期望职位",
        count2: "请输入",
        name3: "职位类型",
        count3: "全职",
        name4: "职位月薪",
        count4: "请输入",
       

   }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  const types = options.type;
  let that = this;
    console.log("types", types)
  

  //兼职全职导入不同表
  if (!options.parTime){
    this.setData({
      info: app.globalData.ResumeFull,
      key: types,
    
    })
  }else{
    this.setData({
      info: app.globalData.resumePart,
      key: types,
      parTime:true,
      active:11
    
     
    })
  }
    let info = this.data.info.expectWork.job_type_id;
    that.setData({
      resumeId: this.data.info.resume_id,
    
    })
    if(info){
      active: this.data.info.expectWork.job_type_id
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
     var that = this;

     if (app.globalData.city){
       that.setData({

         'selectList.count1': app.globalData.city,
         'info.expectWork.city': app.globalData.city,

       })
    }
    /**跳转筛选 */
     var value = wx.getStorageSync('worktype')     
     //console.log("携带回来的信息", value)   
     if (value){
       this.setData({
         'selectList.count2': value.value,
         'info.expectWork.work': value.value,
          active: value.id
       })
     }
     wx.removeStorageSync('worktype')
     /** */
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
  
  }
  ,
  onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
  jumpToMyPage: function (event) {

    wx.navigateTo({
      // url: event.currentTarget.dataset.url
      url: '../../child/citySelect/citySelect'
    })
  },
  watchPassWord: function (event) {
    //console.log(event.currentTarget.dataset.self)
    //console.log(event.detail.value);
    const inputs = event.currentTarget.dataset.self;
    this.setData({
      [inputs]: event.detail.value
    })
    //console.log("替换后的值",this.data.info)
  }
  ,save:function(event){
    var that = this;
    console.log('data',that.data)

    var setdata = {
      "resume_id": that.data.resumeId,
      "job_type_id": that.data.active,
      "expect_wages": that.data.info.expectWork.monthlyPay,
      //"arrival_time": "string",
      "remark": that.data.info.expectWork.moreInfo
    }
    console.log("setdata", setdata)
    let result = common.IsEmpty(setdata);
    if (!result) {
      return false;
    }
    common.request('api/resume/save_expectwork', {
      params: setdata,
      success: function (res) {
        //console.log("保存期望工作", res)

      }
    }, app.globalData.login)
  
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 800
    });
    setTimeout(function(){
      wx.navigateBack({
        delta:1
      })
    },1000)
  }
  //对全局职位的筛选
  ,selectWork:function(){
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject?id=0'//实际路径要写全
    })
  }

})