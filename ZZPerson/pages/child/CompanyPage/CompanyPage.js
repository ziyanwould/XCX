// pages/child/CompanyPage/CompanyPage.js
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    listd:[],
    searchList:[{}],
    list:[
      { piCurl:"http://www.liujiarong.top/WX/pending.png"},
      { piCurl: "http://www.liujiarong.top/WX/otherPeople.png" },
      { piCurl: "http://www.liujiarong.top/WX/otherPeople.png" },
      { piCurl: "http://www.liujiarong.top/WX/otherPeople.png" },
      { piCurl: "http://www.liujiarong.top/WX/otherPeople.png" },
      { piCurl: "http://www.liujiarong.top/WX/MoreCom.png" },
    ],
    list2: [
      { address1: "广州市海珠区", address2: "中山大学科技园B座1818", lat: "23.092900", lon: "113.291230" },
      { address1: "佛山市禅城区", address2: "佛山市信息科技创业园", lat: "23.004224", lon: "113.124161" },
    ],
    list3: [
     {name:"全部",nunber:10},
     { name: "全部" },
     { name: "技术"},
     { name: "建筑师"},
     { name: "工程师" },
     { name: "五大员" },
     { name: "电工" },
    ],
    company:"中住71",
    label:"50-150人/移动互联网/建筑/设计/教育",
    attestation:"http://www.liujiarong.top/WX/certified.png",
    types:"http://www.liujiarong.top/WX/popCompass.png",
    companyPerson:"http://www.liujiarong.top/WX/pending.png",
    history:"85664",
    counturl:"http://www.liujiarong.top/WX/Comup.png",
    unfold:true,
    hisText:true,
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    wx.request({
      url: url,
      data: {
        page: page,
        page_size: page_size,
        sort: sort,
        is_easy: is_easy,
        lange_id: lange_id,
        pos_id: pos_id,
        unlearn: unlearn
      },
      success: function (res) {
        //console.info(that.data.list);  
        var listd = that.data.listd;
        for (var i = 0; i < 6; i++) {
          listd.push(res.data.list[i]);
        }
        that.setData({
          listd: listd
        });
        page++;
        wx.hideLoading();

      }
    });
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
  
  }
  , change1:function(){
    this.setData({//this.setdata很重要
      "unfold": true,
    })
  },
  change2: function () {
    this.setData({//this.setdata很重要
      "unfold": false,
    })
  },
  map: function (event) {
    //   wx.getLocation({
    //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
    //     success: function (res) {
    //       var latitude = res.latitude
    //       var longitude = res.longitude
    //       wx.openLocation({
    //         latitude: latitude,
    //         longitude: longitude,
    //         name: "花园桥肯德基",
    //         scale: 28
    //       })
    //     }
    //   })  
    wx.openLocation({
      latitude: parseFloat(event.currentTarget.dataset.lat),
      longitude: parseFloat(event.currentTarget.dataset.lon),
      name: event.currentTarget.dataset.area,
      scale: 28
    })
  },

})