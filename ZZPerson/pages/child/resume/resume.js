// pages/child/resume/resume.js

const app = getApp();
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    bfsrc:'',
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
    this.getResume(this.data.resumeId);
    const that =  this
    common.setStronguser({
      success: function (res) {
        // console.log("成功判断本地存储", res.data)
        common.deleteEmptyProperty(res);
        that.setData({
          userInfo: res.data,
        })

        if (!that.data.nessrc) {
          that.setData({
            src: res.data.avatarUrl
          })
        }
      }

    })
    //20180531修改隐去
    // this.setData({
    //   resume: app.globalData.ResumeFull
    // })
    // console.log("resume",that.data.resume)
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
   onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  }
  , jumpToMyPage: function (event) {

    wx.navigateTo({
      url: '../customPlate/customPlate'
    })
  },
  addnew: function (event) {
    
    
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
   
  },
  
 // 这是是调用上传头像uploadFile方法
// 上传头像
  upload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0];
        wx.redirectTo({
          url: `/avatarUpload/upload/upload?src=${src}`
        })
      }
    })
  },
   onLoad (option) {
     console.log("页面传递的值", option)
    if(option.resume_id){
      this.setData({
        resumeId:option.resume_id
      })
    }
    // console.log('onLoad')
     var that = this
     //  console.log("列表", option)
       let { avatar } = option
       if (avatar) {
        // console.log("内容", avatar)
         this.setData({
           src: avatar,
           nessrc:true
         })
       
       }else{
         common.setStronguser({
           success: function (res) {
            // console.log("成功判断本地存储", res.data)
             that.setData({
               userInfo: res.data,
               src: res.data.avatarUrl
             })
           }

         })
       }
  },
   //20180529 获取全职详情页
   getResume: function (ids) {
     var that = this;
     var setdata = {
       "resume_id": ids
     }
     common.request('api/resume/full_detail', {
       params: setdata,
       success: function (res) {
         common.deleteEmptyProperty(res);
         console.log("获取全职详情页", res)
         that.setData({
           resume: res.data.data.ResumeFull
         })
         app.globalData.ResumeFull = res.data.data.ResumeFull
         typeof cb == "function" && cb(that.globalData.ResumeFull)
       }
     }, app.globalData.login)
   }
})