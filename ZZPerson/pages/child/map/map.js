const app = getApp();
Page({
  data: {
    latitude: 23.014030,
    longitude:113.108200,
    markers: [{
      id: 1,
      latitude: 23.092967,
      longitude: 113.290865,
      name: 'T.I.T 创意园'
    }],
    cods:''
    // covers: [{
    //   latitude: 23.099994,
    //   longitude: 113.344520,
    //   iconPath: 'http://www.liujiarong.top/WX/location.png'
    // }, {
    //   latitude: 23.099994,
    //   longitude: 113.304520,
    //   iconPath: 'http://www.liujiarong.top/WX/location.png'
    // }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
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
  getPhoneNumber: function (e) {
    console.log("errMsg值：", e.detail.errMsg)
    console.log("iv值：", e.detail.iv)
    console.log("encryptedData值：", e.detail.encryptedData)


  } 
  ,
   gitopenID:function(e){
    var that = this
    console.log("code", app.globalData.thecode)
    wx.request({
      url: app.globalData.url+'api/common/get_wx_openid',
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

      },
      method: 'POST',
      data: {
        code: app.globalData.thecode
      },


      success: function (res) {
        console.log(res.data)
        //这样赋值现在是不能将数据传走的，必须使用setData()方法
        //that.data.items = res.data ;
        //官方文档指出必须使用setData()方法才能将数据传走
        // that.setData({
        //   items: res.data
        // })
      }

    })

    // wx.request({
    //   url: 'http://www.liujiarong.top/WX/api/give.php', //仅为示例，并非真实的接口地址
    //   data: {
    //     code: app.globalData.thecode
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })

   
   
   
  }
})
var Util = require('../../../utils/util.js')