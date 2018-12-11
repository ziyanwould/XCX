
var common = require('../../../utils/common.js');
const app = getApp();
var page = 0;
var pageSize = 10;




Page({

  /**
   * 页面的初始数据
   */

  data: {
    list: [

    ],
    pageshow: true,
    otherNumber: false,
    activeIndex: 0,
    used_list: [
      // { title: "分类01", name: "全部" },

      { title: "分类03", name: "兼职" },
      { title: "分类02", name: "全职" },
    ]




  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;
    this.deleteResume()
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
  active: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      list: []
    })
    page = 1
    this.deleteResume()
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    // wx.showNavigationBarLoading();
    var that = this;
    page = 1;
    this.setData({
      list: []
    })
    wx.showLoading({
      title: '刷新数据中',
    })
    this.deleteResume()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.deleteResume()
  },
  //20180529 投递记录
  deleteResume: function () {
    var that = this;
    console.log('全职兼职序号吧', that.data.activeIndex)
    var setdata = {

      "type_id": that.data.activeIndex,
      "pageIndex": page,
      "pageSize": pageSize
    }
    // common.request('api/resume/deliver_log', {
    common.request('api/resume/deliver_log', {
      params: setdata,
      success: function (res) {
        console.log("收藏记录", res)

        common.deleteEmptyProperty(res);
        console.log(typeof res)
        // var res = JSON.stringify(res);
        let panduan = 'data' in res.data;
        console.log("es6判断是否存在东西", panduan);
        console.log(res);

        if (!panduan) {
          wx.hideLoading();
          // register.loadFinish(that, true);
          wx.showToast({
            title: '没有更多数据',
            icon: 'loading',
            duration: 3000
          });
          if (that.data.list.length == 0) {
            that.setData({
              pageshow: false
            })
          }
          setTimeout(function () {

            wx.hideLoading();
            wx.stopPullDownRefresh();
            return false;
          }, 3000)
        } else {
          //console.info(that.data.list);  
          var list = that.data.list;
          for (var i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].Deliver_Time = common.timeFat(res.data.data.list[i].Deliver_Time);
            if ((res.data.data.list[i].Position_Title).length > (app.globalData.deleTitle - 1)) {
              res.data.data.list[i].Position_Title = (res.data.data.list[i].Position_Title).substring(0, app.globalData.deleTitle ) + '...';
            }
            list.push(res.data.data.list[i]);
          }
          //看是否有数据
          if (res.data.data.list.length > 0) {
            that.setData({
              pageshow: true
            })
          } else {
            if (that.data.list.length > 0) {
              that.setData({
                otherNumber: true
              })

            }
            that.setData({
              pageshow: false
            })
          }
          that.setData({
            list: list
          });
          page++;
          setTimeout(function () {
            wx.hideLoading();

          }, 500)
          setTimeout(function () {
            wx.stopPullDownRefresh();
          }, 800)
        }

      }
    }, app.globalData.login)
  }
  , tapCompass: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.counts.ID;
    var typesd = e.currentTarget.dataset.counts.Type_Id;



    //获取详情页信息   使用Promise进行异步流程处理
    if (typesd == 0) {
      var urls = app.globalData.url+'api/position/get_part_detail';
    } else {
      var urls = app.globalData.url+'api/position/get_full_detail';
    }
    let requestPromisified = common.wxPromisify(wx.request);
    console.log('loginId', app.globalData.login)
    requestPromisified({
      data: { "position_id": id },
      url: urls,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
        'login_token': app.globalData.login
      },
    }).then(res => {
      console.log('获取点击的详情的内容', res)
      if (res.data.data.detail.job_sec_type) {
        var jobx = "全职"
      } else {
        var jobx = "兼职"
      }

      for (let i in res.data.data.detail.recommend) {
        res.data.data.detail.recommend[i].Utime = common.timeFat(res.data.data.detail.recommend[i].Utime);
        if ((res.data.data.detail.recommend[i].Position_Title).length > (app.globalData.deleTitle - 1))
          res.data.data.detail.recommend[i].Position_Title = (res.data.data.detail.recommend[i].Position_Title).substring(0, app.globalData.deleTitle) + '...';

      }
      wx.setStorageSync('jobx', jobx);
      wx.setStorageSync('childs', res.data.data.detail)

    }).then(res => {
      console.log('列表的关键字:', that.data.seachKey);

      wx.navigateTo({
        url: '/pages/child/part-timeJob/part-timeJob'//实际路径要写全
      })
    })




  }
})