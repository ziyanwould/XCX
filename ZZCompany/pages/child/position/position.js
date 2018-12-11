// pages/child/position/position.js
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [

    ],
    list2: [
      { address1: "广州市海珠区", address2: "中山大学科技园B座1818", lat: "23.092900", lon: "113.291230" },
      { address1: "佛山市禅城区", address2: "佛山市信息科技创业园", lat: "23.004224", lon: "113.124161" },
    ],
    tag: [
      { id: 0, count: "设计师" },
      { id: 1, count: "水利工程师" },
      { id: 2, count: "五年以上" },
      { id: 3, count: "大专以上" },

    ],
    tags: [
      { id: 0, count: "简历处理快如闪电" },
      { id: 1, count: "很少回聊天信息" },
      { id: 2, count: "早上活跃" }
    ],
    name: "庞丽亚",
    Ntype: "猎聘专员",
    hour: 9,
    zzCount: '1、在项目经理的领导下，制定落实项目安全防范措施；\n' +
      '2、做好项目部新进职工的登记注册工作，发放安全教育卡片、安全帽和其他劳保用品；\n' +
      '3、每项工程必须按公司规定组织安全教育、安全技术交底及安全措施的培训等；\n' +
      '4、认真做好安全台账，组织安全生产检查；\n' +
      '5、对工程重点部位要制定书面安全措施；\n' +
      '6、发现重大安全隐患，应立即采取有效补救措施并及时汇报，将隐患消灭在萌芽状态；\n' +
      '7、严格履行职责，杜绝事故发生。',
    company: "中住71",
    label: "50-150人/移动互联网/建筑/设计/教育",
    attestation: "http://www.liujiarong.top/WX/certified.png",
    types: "http://www.liujiarong.top/WX/popCompass.png",
    companyPerson: "http://www.liujiarong.top/WX/companyFx.jpg",
    history: "85664",
    counturl: "http://www.liujiarong.top/WX/Comup.png",
    title: "室内设计",
    salary: "8K-12K",
    socialSecurity: "广州不可停",
    index: 0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('option', options)
    let that = this;
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })
  
    that.getinfo(options.ID, options.type)
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
  //获取职位信息
  getinfo(id,types){
   let that = this;
   let url = '';
   let datas={
     "position_id": id
   };
   if(types=='兼职'){
     url ='api/position/get_part_detail_by_company'
   }else{
     url = 'api/position/get_full_detail_by_comapny'
   }
    console.log(types,datas)
    utils.post(url, datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      let data = [
        {
          address1: `${res.detail.company.province} ${res.detail.company.city} ${res.detail.company.county}`,
          address2: res.detail.company.address, 
          lat: res.detail.company.lat,
          lon: res.detail.company.lng
          }
        ]
      that.setData({
    
        message: res.detail,
        list2: data
      })
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

     
    });
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