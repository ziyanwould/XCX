// pages/child/map/map.js
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')
var model = require('../../../model/model.js')
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      latitude: 23.099994,
      longitude: 113.324520,
      markers: [{
        id: 1,
        latitude: 23.099994,
        longitude: 113.324520,
        name: 'T.I.T 创意园'

      }],
      covers: [{
        latitude: 23.099994,
        longitude: 113.344520,
        iconPath: '/image/location.png'
      }, {
        latitude: 23.099994,
        longitude: 113.304520,
        iconPath: '/image/location.png'
      }]
    } , 
    item: {
      
    },
    adress:'请选择',
    mapsplac:'请输入详细镇街道等地址',
    maps:'请选择地点'
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (app.globalData.userinfo != 0) {
      console.log(app.globalData.userinfo)
      that.setData({
        adress: `${app.globalData.userinfo.province} ${app.globalData.userinfo.city} ${app.globalData.userinfo.county}`,
        input: app.globalData.userinfo.Address,
        maps: `${app.globalData.userinfo.Lat!='0'?'更改定位':'选择地点定位'}`,
        wd: app.globalData.userinfo.Lat,
        jd: app.globalData.userinfo.Lng,
        province: app.globalData.userinfo.province,
        city: app.globalData.userinfo.city,
        county: app.globalData.userinfo.county,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
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
    let that = this;
    
    let value = {
      latitude: that.data.wd,
      longitude: that.data.jd,
      province: that.data.province,
      city: that.data.city,
      county: that.data.county,
      detail: that.data.input,

    }

    try {
      wx.setStorageSync('map', value)
    } catch (e) {
    }
    if (!utils.IsEmpty(value)) {
      wx.showToast({
        title: '您有未填项',
        icon: 'loading',
        duration: 1500
      });
      return false;
    }
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
    getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  //点击选择城市按钮显示picker-view
  translate(e) {
    let that = this;
    //隐藏输入框及头部及底部
    that.setData({
      'otherms.showTextarea': true,
      'allms.showTextarea': true,
      show: true

    })

    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView(e) {
    var that = this;
    //隐藏输入框及头部及底部
    that.setData({
      'otherms.showTextarea': false,
      'allms.showTextarea': false,
      show: false
    })
    model.animationEvents(this, 200, false, 400);
    console.log(that.data.province, that.data.city,that.data.county);
    that.setData({
      adress: `${that.data.province} ${that.data.city} ${that.data.county}`
    })
  },
  //滑动事件
  bindChange(e) {
    let that = this;
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    })

  },
  onReachBottom() {
  },
  nono() { },
//对经纬度的选择
map(){
  let that= this;
  wx.chooseLocation({
    success: function (res) {
      // success
      console.log(res, "location")
      that.setData({
        hasLocation: true,
        location: {
          longitude: res.longitude,
          latitude: res.latitude
        },
        detail_info: res.address,
        wd: res.latitude,
        jd: res.longitude,
        maps:'更改定位'
      })
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
},
//监听
  watchinput(e){
    console.log("input值", e.detail.value)
    this.setData({
      input: e.detail.value
    })
  }
})