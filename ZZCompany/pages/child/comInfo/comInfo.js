// pages/child/comInfo/comInfo.js
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
    cominfo: {
      // showTextarea:true,
      select: [
        {
           //comTitle: '任职要求',
          child: [
            {
              countTitle: '公司所在省市',
              countCount: '',
              fn: 'translate'
              // fn: 'chooseArea'
            },
            {
              inputTitle: '公司所在地址',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[0].child[1].input',
              fn: 'watchinput'

            },
            {
              countTitle: '公司地图定位',
              countCount: '选择地点定位',
              fn: 'map'
            }

           
          ],
        },
        {
          //comTitle: '任职要求',
          child: [
            {
              inputTitle: '联系人姓名',
              inputPlace: '请输入',
              input: '',
              watchinput:'cominfo.select[1].child[0].input',
              fn: 'watchinput'
            },
            {
              inputTitle: '联系人手机号码',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[1].input',
              fn: 'watchinput'
            },
            {
              inputTitle: '座机号码',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[2].input',
              fn: 'watchinput'
            },
            {
              inputTitle: 'QQ号码',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[3].input',
              fn: 'watchinput'
            },
            {
              inputTitle: '电子邮箱',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[4].input',
              fn: 'watchinput'

            },
            {
              inputTitle: '公司网址',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[5].input',
              fn: 'watchinput'
            },

          ],
        }
      ],
      textarea: [
        {
          textareaTitle: "企业介绍",
          fn: 'textarea',
          placeTitle: '请编辑企业介绍',
          textarea: '',
          noteMaxLen: 500, //备注最多字数 
          limitNoteLen: 0, 
        }
      ],
      publish: '提交修改',
      fn: 'publish'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let mapS ='';
    if (app.globalData.userinfo != 0) {
      console.log(app.globalData.userinfo)
      if (app.globalData.userinfo.Lat!='0'){
        mapS ='更改定位'
      }
      that.setData({
        // 原来
        // 'cominfo.select[0].child[0].countCount': app.globalData.userinfo.Address,
        // 'cominfo.select[0].child[1].input': app.globalData.userinfo.email,
        // 'cominfo.select[0].child[2].input': app.globalData.userinfo.Company_Web,
        // 'cominfo.select[1].child[0].input': app.globalData.userinfo.Link_Man,
        // 'cominfo.select[1].child[1].input': app.globalData.userinfo.Link_Tel,
        // 'cominfo.select[1].child[2].input': app.globalData.userinfo.Company_Area_Code,
        // 'cominfo.select[1].child[3].input': app.globalData.userinfo.qq,
        // 'cominfo.textarea[0]textarea': app.globalData.userinfo.Company_Intro,
        //  Company_Logo: app.globalData.userinfo.Company_Logo,
        //  province: app.globalData.userinfo.province,
        //  city: app.globalData.userinfo.city,
        //  county: app.globalData.userinfo.county,
        //  latitude: app.globalData.userinfo.Lat,
        //  longitude: app.globalData.userinfo.Lng
        
        //新的
        'cominfo.select[0].child[0].countCount': `${app.globalData.userinfo.province} ${app.globalData.userinfo.city} ${app.globalData.userinfo.county}`,
        'cominfo.select[0].child[1].input': app.globalData.userinfo.Address,
        'cominfo.select[1].child[0].input': app.globalData.userinfo.Link_Man,
        'cominfo.select[1].child[1].input': app.globalData.userinfo.Link_Tel,
        'cominfo.select[1].child[2].input': app.globalData.userinfo.Company_Tel,
        'cominfo.select[1].child[3].input': app.globalData.userinfo.qq,
        'cominfo.select[1].child[4].input': app.globalData.userinfo.email,
        'cominfo.select[1].child[5].input': app.globalData.userinfo.Company_Web,
        'cominfo.textarea[0]textarea': app.globalData.userinfo.Company_Intro,
         Company_Logo: app.globalData.userinfo.Company_Logo,
         province: app.globalData.userinfo.province,
         city: app.globalData.userinfo.city,
         county: app.globalData.userinfo.county,
         latitude: app.globalData.userinfo.Lat,
         longitude: app.globalData.userinfo.Lng,
        'cominfo.select[0].child[2].countCount':`${mapS?mapS:"选择地点定位"}`


      })
    }
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })
    
   
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
    console.log(this.data.cominfo)

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
    wx.removeStorageSync('map')
    console.log("data",this.data)
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
   textarea(e){
     let value = e.detail.value, len = parseInt(value.length);

     if (len > this.data.noteMaxLen) return;

     this.setData({
       'cominfo.textarea[0]textarea': value,
       'cominfo.textarea[0]currentNoteLen': len, //当前字数  
       'cominfo.textarea[0]limitNoteLen': this.data.noteMaxLen - len //剩余字数  
     });
  }
  ,
  //跳转地址中间页面
  chooseArea(){
    wx.navigateTo({
      url: `/pages/child/map/map`//实际路径要写全
    })
  },
  //
  //此乃发布
  publish(e){
    let that = this;
    console.log("发布消息", "QQ", that.data.cominfo.select[1].child[3].input,
      "email", that.data.cominfo.select[1].child[4].input,
      "province", that.data.province,
      "city", that.data.city,
      "county", that.data.county,
      "Address", that.data. cominfo.select[0].child[1].input,
      "Company_Logo", that.data.Company_Logo,
      "Company_Name", that.data.cominfo.select[1].child[0].input,
      "Company_Web", that.data.cominfo.select[1].child[5].input,
      "Company_Intro", that.data.cominfo.textarea[0].textarea,
      "Company_Area_Code", that.data.cominfo.select[1].child[2].input,
      "Company_Tel", that.data.cominfo.select[1].child[2].input,
      "Link_Man", that.data.cominfo.select[1].child[0].input,
      "Link_Tel", that.data.cominfo.select[1].child[1].input,
      "Lat", that.data.latitude,
      "Lng", that.data.longitude)
    let datas ={
      "QQ": that.data.cominfo.select[1].child[3].input,
        "email": that.data.cominfo.select[1].child[4].input,
          "province": that.data.province,
            "city": that.data.city,
              "county": that.data.county,
                "Address": that.data.cominfo.select[0].child[1].input,
                  "Company_Logo": that.data.Company_Logo,
                    "Company_Name": that.data.cominfo.select[1].child[0].input,
                     "Company_Web": that.data.cominfo.select[1].child[5].input,
                        "Company_Intro": that.data.cominfo.textarea[0].textarea,
                          "Company_Area_Code": that.data.cominfo.select[1].child[2].input,
                            "Company_Tel": that.data.cominfo.select[1].child[2].input,
                              "Link_Man": that.data.cominfo.select[1].child[0].input,
                                "Link_Tel": that.data.cominfo.select[1].child[1].input,
                                  "Lat": that.data.latitude,
                                    "Lng": that.data.longitude

    }
    if (!utils.IsEmpty(datas)) {
      wx.showModal({
        title: '温馨提示',
        content: '建议您完善所有信息，更能吸引人才',
        confirmText: "继续提交",
        cancelText: "继续修改",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            chajian()
          } else {
            return false;
          }
        }
      });
  
    }else{
      chajian()
    }
    function chajian(){
      utils.post('usercenter/update_cominfo', datas, that.data.token).then((res) => {
        console.log(res);//正确返回结果
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 3000
        });
        that.getNewINfo()

        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })
        }, 1500)

        //resolve()
      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息

        //  reject()
      });
    }

  },
  //更改数据
  watchinput(e){
    let farent = e.currentTarget.dataset.value;
    this.setData({
      [farent]: e.detail.value
    })
    console.log("更改信息", e,e.detail.value)
  },
  //上传图片
  exchangPhotos(){
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths[0])
        // const uploadFile = utils.wxPromisify(wx.uploadFile({
        //   url: app.globalData.url+'usercenter/upload_img', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   header: {
        //     'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
        //     'login_token': that.data.token
        //   }
        // }));
        // uploadFile().then(res => {
        // console.log("成功",res)
         
        // }).catch(res => {
        //   console.log("失败",res)
        // })


        wx.uploadFile({
          url: app.globalData.url+'usercenter/upload_img', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
            'login_token': that.data.token
          },
          success: function (res) {
            //图片格式不对字符串切换
            var obj = JSON.parse(res.data)
          
            console.log("obj", obj.imgs[0])
            that.setData({
              Company_Logo: obj.imgs[0]
            })
          }


        })
      }
    })
  },
  getNewINfo() {
    let that = this;
    utils.post('usercenter/get_cominfo', false, that.data.token).then((res) => {
      console.log("用户信息", res);//正确返回结果
      console.log('res', res)
      //更新全局变量方式 20180515
      app.globalData.userinfo = res.userinfo
      typeof cb == "function" && cb(that.globalData.userinfo)
      //更新全局变量结束 20180515
      // wx.hideLoading();
      // resolve()

    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      //wx.hideLoading();
      // reject()
    });
  },
  map() {
    let that = this;
    console.log("进入了编辑页面")
    let pd = wx.getStorageSync('mapState')
    if (!pd){
      wx.showModal({
        content: '您未授权小程序获取定位权限，请您返回上一页，在最下面点击授权',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
    //追踪获取到位置
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
          latitude: res.latitude,
          longitude: res.longitude,
          'cominfo.select[0].child[2].countCount': '更改定位'
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
  //点击选择城市按钮显示picker-view
  translate(e) {
    let that = this;
  
    //隐藏输入框及头部及底部
    that.setData({
      'otherms.showTextarea': true,
      'allms.showTextarea': true,
      show: true,
      beifen: that.data.cominfo.select[1],
      benfen2: that.data.cominfo.textarea,
      'cominfo.select[1]':[],
      'cominfo.textarea': [],

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
      show: false,
      'cominfo.select[1]': that.data.beifen,
      'cominfo.textarea': that.data.benfen2,
    })
    model.animationEvents(this, 200, false, 400);
    console.log(that.data.province, that.data.city, that.data.county);
    that.setData({
      'cominfo.select[0].child[0].countCount': `${that.data.province} ${that.data.city} ${that.data.county}`
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
})