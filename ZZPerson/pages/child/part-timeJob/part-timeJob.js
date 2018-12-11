// pages/child/part-timeJob/part-timeJob.js
const app = getApp();
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
   
    ],
    list2: [
      { address1: "广州市海珠区", address2: "中山大学科技园B座1818", lat: "23.092900", lon:"113.291230"},
      { address1: "佛山市禅城区", address2: "佛山市信息科技创业园", lat: "23.004224", lon: "113.124161" },
    ],
    tag:[
        { id:0, count: "设计师" },
        { id:1, count: "水利工程师" },
        { id:2, count: "五年以上" },
        { id:3, count: "大专以上" },
     
    ],
    tags: [
      { id: 0, count: "简历处理快如闪电" },
      { id: 1, count: "很少回聊天信息" },
      { id: 2, count: "早上活跃" }
    ],
    name:"庞丽亚",
    Ntype:"猎聘专员",
    hour:'9小时',
    zzCount: '1、在项目经理的领导下，制定落实项目安全防范措施；\n'+
    '2、做好项目部新进职工的登记注册工作，发放安全教育卡片、安全帽和其他劳保用品；\n'+
    '3、每项工程必须按公司规定组织安全教育、安全技术交底及安全措施的培训等；\n'+
    '4、认真做好安全台账，组织安全生产检查；\n'+
    '5、对工程重点部位要制定书面安全措施；\n'+
    '6、发现重大安全隐患，应立即采取有效补救措施并及时汇报，将隐患消灭在萌芽状态；\n'+
    '7、严格履行职责，杜绝事故发生。',
    company: "中住71",
    label: "50-150人/移动互联网/建筑/设计/教育",
    attestation: "http://www.liujiarong.top/WX/certified.png",
    types: "http://www.liujiarong.top/WX/popCompass.png",
    companyPerson: "http://www.liujiarong.top/WX/companyFx.jpg",
    history: "85664",
    counturl: "http://www.liujiarong.top/WX/Comup.png",
    title:"室内设计",
    salary:"8K-12K",
    socialSecurity:"广州不可停",
    index: 0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    var that = this;
    if(options.show){
      this.setData({
      show:true
      })
    }
    this.setData({
      jobType: wx.getStorageSync('jobx'),
      message: wx.getStorageSync('childs'),
      list: wx.getStorageSync('childs').recommend
    })
   

    
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
    console.log(this.data.jobType, this.data.message, this.data.recommend)
    this.setLastTime()
    
    var _this = this;
    //有地址的更改默认地址
    _this.address(this.data.message);

    wx.getStorage({
      key: 'login',
      success: function (res) {

        if (res.data) {
          _this.setData({
            items: {
              show: false
            },
            key: true

          })
        } else {
          _this.setData({
            items: {
              show: false
            },
            key: false

          })
        }
      }
    })

    this.getRwsume()
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
  map:function (event){
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
  tapCompass: function (e) {
    var that = this;
    console.log(e)
    console.log(e.currentTarget.dataset.counts);
    console.log(e.currentTarget.dataset.counts.ID);
    var id = e.currentTarget.dataset.counts.ID;
    const jobs = that.data.jobType;


    //获取详情页信息   使用Promise进行异步流程处理
    if (this.data.jobType=='兼职') {
      var urls = app.globalData.url+'api/position/get_part_detail';
    

    } else {
      var urls = app.globalData.url+'api/position/get_full_detail';
   

    }

    let requestPromisified = common.wxPromisify(wx.request);
    requestPromisified({
      data: { "position_id": id },
      url: urls,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
      },
    }).then(res => {
      console.log('获取点击的详情的内容', res)
      if (res.data.data.detail.job_sec_type) {
       
        var jobx = "兼职"
      } else {
     
        var jobx = "全职" 
      }

      wx.setStorageSync('jobx', jobx);
      wx.setStorageSync('childs', res.data.data.detail)

    }).then(res => {
    
    
      wx.navigateTo({
        url: '/pages/child/part-timeJob/part-timeJob?show=true'//实际路径要写全
      })
    })




  }
  ,
  //收藏职位
  collectPosition:function(){
    var that = this
    if(!this.data.key){
      wx.showToast({
        title: '您还未登录！',
        icon: 'loading',
        duration: 2000
      }) 
      setTimeout(function(){
        that.loging();
        return false;

      },2000)
    }else{
     
      var urlc = '';
      var self = that.data.message.has_collect
      if (self) {
        urlc = 'api/position/remove_collect_position'

      } else {
        urlc = 'api/position/collect_position'
      }
      that.setData({
        'message.has_collect': !self

      })
      common.request(urlc,
        {
          params: {
            "position_id": that.data.message.position_id
          },
          success: function (res) {
            console.log("获取结果", res)
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            });

          },
          fail: function () {
            //失败后的逻辑  
          },
        }, app.globalData.login)
    }


  }
  ,
  //20180603 增加登录判断 
  //路由跳转等
  urlTo: function () {
    var url = '/pages/child/Login/Login?line_type=1';
    common.SomeThing(url);

  },
  urlTo2: function () {
    var url = '/pages/child/Login/Login?line_type=2';
    common.SomeThing(url);

  },
  urlclose: function () {
    this.setData({
      items: {
        show: false
      }
    });
  }
  , //获取手机号
  getPhoneNumber: function (e) {
    let that = this;
    console.log("errMsg", e.detail.errMsg)
    console.log("vi", e.detail.iv)
    console.log("encryptedData", e.detail.encryptedData)
    var child_iv = e.detail.iv
    var child_encryptedData = e.detail.encryptedData
    //
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showToast({
        title: '授权失败',
        icon: 'loading',
        duration: 1500
      });
    } else {

      wx.showToast({
        title: '授权中....',
        icon: 'loading',
        duration: 1500
      });

      that.setData({
        items: {
          show: false
        }
      });



      //解析手机号
      wx.request({
        url: app.globalData.url+'api/common/wx_login_phone',
        header: {
          'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

        },
        method: 'POST',
        data: {
          openid: app.globalData.oppenid,
          encryptedData: child_encryptedData,
          iv: child_iv
        },


        success: function (res) {
          console.log("登录凭证", res.data)

          //20180515 预修改
          wx.setStorage({
            key: "login",
            data: res.data.data.login_token
          })
          //end 20180515 预修改

          //更新全局变量方式 20180515
          app.globalData.login = res.data.data.login_token
          typeof cb == "function" && cb(app.globalData.login)
          //更新全局变量结束 20180515

          var cai = common.getinst(app.globalData.login)
          console.log("换一种写法", cai)
          that.setData({
            key: true
          })
          that.getRwsume()
          setTimeout(function () {
            that.getuseinfomation()
          }, 250)
        }

      })



    }
  }
  ,  /**点击登录 */
  loging: function () {
    var self = common.tanchu()
    this.setData({
      items: {
        height: self,
        masTitle: "",
        show: true,
        fages: true
      }
    });
  },
  /**授权 */
  bindGetUserInfo: function (e) {
    console.log("授权", e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.setStorage({
        key: "user",
        data: e.detail.userInfo
      })
      this.setData({
        // userInfo: { "nickName": e.detail.userInfo.nickName, "avatarUrl": e.detail.userInfo.avatarUrl },
        bingetinfo: true,
        items: {
          height: self,
          masTitle: "",
          show: true,
          fages: false
        }
      });
    } else {
      this.setData({
        items: {
          height: self,
          masTitle: "",
          show: true,
          fages: false
        }
      });
    }



  },
  //是否拥有本地存储判断
  getuseinfomation: function () {
    var that = this;
    setTimeout(function () {
      if (that.data.key) {
        common.setStronguser({
          success: function (res) {
            console.log("成功判断本地存储", res.data)
            that.setData({
              userInfo: res.data,
              bingetinfo: true
            })
          }

        })

      } else {

        return false;

      }

    }, 50)
  }
  ,  //20180529 获取简历列表
  getRwsume: function () {
    console.log("获取兼职职位类型",this.data.jobType); 
    let typed = this.data.jobType;
    var that = this;
    const usedata = {
      "pageIndex": 1,
      "pageSize": 30
    };
    if (typed=="兼职"){
      usedata.type_id=0
    }else{
      usedata.type_id = 1
    }
    var msgList = []
    var msgTitle = []
    common.request('api/resume/get_list', {
      params: usedata,
      success: function (res) {
        console.log("获取简历列表", res);

        if (res.data.code==0){
          if (res.data.data.list.length > 0) {
            //进行选择

            for (var i = 0; i < res.data.data.list.length; i++) {
              msgList.push(res.data.data.list[i]);
              msgTitle.push(res.data.data.list[i].title)
            }
            that.setData({
              msgList: msgList,
              msgTitle: msgTitle
            })
          } else {
            //提示无简历
            that.setData({
              msgList: ['您未创建简历！'],
              msgTitle: ['您未创建简历！']
            })
          }
        }else{
          //提示未登录
          that.setData({
            msgList: ['您未登录！'],
            msgTitle: ['您未登录！']
          })
        }
       
      }
    }, app.globalData.login)
    // console.log("获取简历列表1", that.data.msgList)
  },
  //投递简历下拉功能
  bindPickerChange: function (e) {
    var that = this;
    if (!this.data.key) {
      wx.showToast({
        title: '您还未登录！',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function () {
        that.loging();
        return false;

      }, 2000)
    } else if (that.data.msgTitle[0] =='您未创建简历'){
      wx.showToast({
        title: '您未创建简历',
        icon: 'loading',
        duration: 2000
      })
      //判断是否有简历
      return false;
    }else{
      


      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
      let xuhao = e.detail.value;
      let count = that.data.msgList;
      console.log(xuhao, count, count[xuhao].resume_id)
      let numbers = count[xuhao].resume_id
      that.pullResume(numbers)
    }
  
  },
  //20180529 投递简历
  pullResume: function (cd) {
    var that = this;
    console.log('简历序号',cd)
    var deletedata = {
      "resume_id": cd,
      "position_id": that.data.message.position_id
    }
    common.request('api/resume/deliver', {
      params: deletedata,
      success: function (res) {
        console.log("投递建立后信息", res)
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
      }
    }, app.globalData.login)
  },
  //地址更改信息
  address(data){
    let adds = data.company;
    console.log(adds)
    let that = this;
    if (adds.lat!=null){
      let message =[
      { 
        address1: `${adds.province != null ? adds.province : ''}${adds.city != null ? adds.city : ''}${adds.county != null ? adds.county : ''}`, 
        address2: `${adds.address != null ? adds.address : ''}`,
        lat: adds.lat,
         lon: adds.lng
         }]

         that.setData({
           list2: message
         })
    }

  },
  //设置时间函数
  setLastTime(){
    let that = this;
    let oldT = that.data.message.company.last;


    if (oldT){
      let oldT1 = oldT.replace(/-/g, '/');
      console.log("time", oldT1);
      var date = new Date(oldT1);
      var time1 = date.getTime();
      console.log("oldtime", time1)
      var time2 = (new Date()).valueOf();
      console.log('stateT',time2)
      var date3 = time2 - time1;
 
   
      //计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000))

      //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      console.log(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")

      that.setData({
        hour: `${days != 0 ? days + '天' : ''}${hours != 0 ? hours + '小时' : ''}${minutes != 0 ? minutes + '分钟' : ''}`
      })

    }else{
      that.setData({
        hour: `${Math.floor(Math.random() * 23 +1)}小时`
      })
    }   
  }
})