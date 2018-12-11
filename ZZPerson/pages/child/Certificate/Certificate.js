var common = require('../../../utils/common.js');
var logonNum = 0;//是否是初始化进入
var app = getApp();
/**位置 */
var model = require('../../../model/model.js')

var show = false;
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project: "请选择",
    work: "请输入",
    startTime: "请选择",
    endTime: "请选择",
    switchs:true,
    registration: '请选择',
    state: '请选择',
    useRe: '请选择',
    location:'请选择',
    optional:" (可选)",
    infoChild:{
      b_card:0
    },
    b_card:0,
    item: {
      show: show
    }

    // major: ['大专', '本科', '硕士', '博士', '其他']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    logonNum = 0;
    let that = this;
    var arrc = common.sjc();
    this.setData({
      startTime: arrc[1],
      endTime: arrc[1],

    })
    console.log(options)
    //逻辑编辑功能
    
    if (options.parTime){
      var self = app.globalData.resumePart;
      this.setData({
        info: app.globalData.resumePart,
        parTime:true
      })
     }else{
      var self = app.globalData.ResumeFull;
      this.setData({
        info: app.globalData.ResumeFull,
      })
     }

    if (options.type) {
      this.setData({
        key: options.type,
        num: options.id,
        infoChild: self.certificate[options.id],
        resumeId: self.resume_id,
        moben: self.certificate[options.id].id
      })
    } else {
      this.setData({
        switchs: false,
        optional:"",
        resumeId: self.resume_id,
        moben: 0
      })
    }

    //console.log(this.data.key, this.data.num, this.data.infoChild)
    //end
    if(options.approveID){
      this.setData({
       approveID:true
      })
    }
       //认证的结果
    this.RZresult()
    //B证
   // console.log("Bzheng", that.data.infoChild.b_card)
    if (that.data.infoChild.b_card){
     switch (that.data.infoChild.b_card) {
      case 0:
        that.setData({
          wufo: false
        })
        break;
      case 1:
        that.setData({
          wufo: true
        })
        break;
      case 2:
        that.setData({
          wufo: true
        })
        break;
      case 3:
        that.setData({
          wufo: true
        })
        break;
      case 4:
        that.setData({
          wufo: true
        })
        break;
      default:
        that.setData({
          wufo: false
        })
     }
    }
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    logonNum ++;
    console.log("logonNum", logonNum)
    /**跳转筛选 */
    let that = this;
//    console.log('infoChild', that.data.infoChild)
    var value = wx.getStorageSync('worktype')
    console.log("携带回来的信息", value)   
    if (value) {
      that.setData({
        'infoChild.NameCertificate': value.value,
        'project': value.value,
         'active':value.id,
        'infoChild.parent_id': value.parent_id
      })
    }else{
      that.setData({
     
        'infoChild.parent_id': -1
      })
    }
    wx.removeStorageSync('worktype')

    /**有B证列表判断 */

    if (logonNum>1){
      if (that.data.infoChild.parent_id==1){
        that.setData({
          wufo:true
        })
      } else if (that.data.infoChild.parent_id == 2){
        that.setData({
          wufo: true
        })
      } else{
        that.setData({
          wufo: false
        })
      }
    }
    // console.log("that.data.infoChild.b_card", that.data.infoChild.b_card)

     /** */
     /**城市带回 */
    var counCity = wx.getStorageSync('bookCity')
    if (counCity) {
      console.log("返回城市", counCity)
      that.setData({
        'infoChild.location': counCity,
        'location': counCity
      })
    }
    wx.removeStorageSync('bookCity')
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
    // do somthing
    wx.stopPullDownRefresh();
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
  bindDateChange: function (e) {
    this.setData({
      endtime: e.detail.value,
      'infoChild.endTime': e.detail.value,
    })
  },
  bindend: function (e) {
    this.setData({
      startTime: e.detail.value,
      'infoChild.startTime': e.detail.value,
    })
  },
  bindendEnd: function (e) {
    this.setData({
      endTime: e.detail.value,
      'infoChild.endTime': e.detail.value,
    })
  },
    //监听 修改 增加 删除三件套
  watchPassWord: function (event) {

    const inputs = event.currentTarget.dataset.self;
    this.setData({
      [inputs]: event.detail.value
    })

  },
  save: function () {
    var that = this;
    this.getResume();
    // if (that.data.switchs) {
    //   const you = "info.certificate[" + this.data.num + "]";
    //   this.setData({
    //     [you]: that.data.infoChild
    //   })
    // } else {
    //   var newlist = {}
    //   newlist.id = that.data.info.certificate.length;
    //   newlist.NameCertificate = that.data.project;
    //   newlist.organization = that.data.work;
    //   newlist.startTime = that.data.startTime;
    //   newlist.endTime = that.data.endTime;

    //   newlist.registration = that.data.registration;
    //   newlist.state = that.data.state;
    //   newlist.useRe = that.data.useRe;
    //   newlist.location = that.data.location;



    //   var infos = (that.data.info.certificate).push(newlist);
    //   //console.log(that.data.info.certificate)
    //   that.setData({
    //     'info.certificate': that.data.info.certificate
    //   })
    // }
    // if (this.data.parTime){
    //   //更新全局变量方式 20180519
    //   app.globalData.resumePart = this.data.info
    //   typeof cb == "function" && cb(app.globalData.resumePart)
    // //更新全局变量结束 20180519
    // }else{
    //   //更新全局变量方式 20180519
    //   app.globalData.ResumeFull = this.data.info
    //   typeof cb == "function" && cb(app.globalData.ResumeFull)
    // //更新全局变量结束 20180519
    // }


  },
  openConfirm: function () {
    var that = this;
    wx.showModal({
      title: '确定删除',
      content: '',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
          that.removex()
          //取消全局修改模式 
          // //莫名是旧数据更新 赋值得到是错误
          // const her = 'info.certificate';
          // var delInfo = (that.data.info.certificate).splice(that.data.num, 1)
          // that.setData({
          //   [her]: that.data.info.certificate
          // })

          // if (that.data.parTime) {
          //   //更新全局变量方式 20180519
          //   app.globalData.resumePart = that.data.info
          //   typeof cb == "function" && cb(app.globalData.resumePart)
          //   //更新全局变量结束 20180519
          // } else {
          //   //更新全局变量方式 20180519
          //   app.globalData.ResumeFull = that.data.info
          //   typeof cb == "function" && cb(app.globalData.ResumeFull)
          //   //更新全局变量结束 20180519
          // }
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 800
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          console.log('用户点击取消')
        }
      }
    });
  }
//监听 修改 增加 删除三件套 end

  //对全局证书的筛选
  , selectbook: function () {
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject?id=1'//实际路径要写全
    })
  }
  ,//下拉选择
  opend: function (e) {
    var that = this
   console.log(e)
   var typed = e.currentTarget.id
   console.log(typed)
   if (typed==0){
     var lists =['转注','初始']
   } else if (typed == 1){
     var lists = ['闲置中', '未到期','快拿证']
   } else if (typed == 2){
     var lists = ['不限', '资质', '项目']
   }else if(typed == 3){
     var lists = ['带B证', '不带B证', '考B证','情况不清']
   }
    wx.showActionSheet({
      itemList:lists,
      success: function (res) {
        if (!res.cancel) {
         const number = res.tapIndex
         if (typed==0){
          that.setData({
            'infoChild.registration': lists[number],
            'registration': lists[number]
          })
         } else if (typed == 1){
           that.setData({
            'infoChild.state' :  lists[number],
             'state' :  lists[number]
           })
         } else if (typed == 2){
           that.setData({
             'infoChild.useRe': lists[number],
             'useRe': lists[number]
           })
         }else if(typed == 3){
           that.setData({
             'infoChild.b_card': number+1,
             'b_card': number + 1
           })
         }

        }
      }
    });
  }
  ,//城市选择跳转
  slectBookCity:function(){
    wx.navigateTo({
      url: '/pages/child/citySelect/citySelect?approveID=true'//实际路径要写全
    })
  },
  //进行认证操作
  approve:function(){
    var that = this;
    let self1 = that.data.project == "请输入";
    let self2 = that.data.registration == "请输入";
    let self3 =  that.data.state == "请输入";
    let self4 = that.data.useRe == "请输入";
    let self5 = that.data.location == "请输入" ;
    if (!(self1 || self2 || self3 || self4 || self5)){
    
        
        //调用认证
        that.identification();
        //调用认证 end
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
    }else{
      wx.showToast({
        title: '请输入证书信息',
        icon: 'loading',
        duration: 1000
      });
    }

  },
  //个人认证版块
  identification:function(){
    var that = this ;
    console.log("certificate_Name",that.data.project,
      "Certificate_Type_Id", that.data.active,
      "reg_Status", that.data.registration,
      // "gertificate_Status", that.data.state,
      "Certificate_Status", that.data.state,
      "province", that.data.province,
      "city", that.data.location,
      "Certificate_Use", that.data.useRe)
    const usedata = { 
      //"start_Time": that.data.startTime + "-29T14:17:27.682Z",
      //"end_Time": that.data.endTime + "-29T14:17:27.682Z",
      "certificate_Name": that.data.project,
      "Certificate_Type_Id": that.data.active,
      "reg_Status": that.data.registration,
      // "gertificate_Status": that.data.state,
      "Certificate_Status": that.data.state,
      "province": that.data.province,
      "city": that.data.location,
      "Certificate_Use": that.data.useRe
    };
    common.request('usercenter/apply_verify', {
      params: usedata,
      success: function (res) {
      // 证书上传信息成功后操作
      console.log("证书上传情况",res)

      wx.showToast({
        title: res.data.message,
        icon: 'success',
        duration: 1200
      })
      }
    }, app.globalData.login)
  },
  //认证状态中 认证成功 认真失败
  RZresult:function(){
    if (!this.data.approveID){
      return false;
    }
    common.request('usercenter/query_verify_status', {
      success: function (res) {
        // 证书上传信息成功后操作
        console.log("认证状态中 认证成功 认真失败",res)
        if (res.data.data.status==3){
          wx.showToast({
            title: '你已经认证成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1800)
        } else if (res.data.data.status == 1){
          wx.showModal({
            content: '您的账号还未认证，请您填一份证书作为认证信息，提交认证',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
        else if (res.data.data.status == 2) {
          wx.showToast({
            title: '你申请认证还在审核中，请耐心等待',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1800)
        }else{
          wx.showModal({
            content: '您的账号认证失败，请您重新填一份证书作为认证信息，提交认证',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    }, app.globalData.login)
  },
  //20180529 保存/新增证书板块
  getResume: function () {
    var that = this;
    let setdatas = {};
    if (that.data.moben!=0){
      setdatas = {
        "id": that.data.moben,
        "resume_Id": that.data.resumeId,
        "start_Time": that.data.infoChild.startTime + "-29T14:17:27.682Z",
        "end_Time": that.data.infoChild.endTime + "-29T14:17:27.682Z",
        "certificate_Name": that.data.infoChild.NameCertificate,
        "B_Card": that.data.infoChild.b_card,
        "Certificate_Title": that.data.infoChild.title,
        "train_Org": that.data.infoChild.organization,
        "gertificate_Type_Id": that.data.active,
        "reg_Status": that.data.infoChild.registration,
        "gertificate_Status": that.data.infoChild.state,
        "province": that.data.province,
        "city": that.data.infoChild.location,
        "gertificate_Use": that.data.infoChild.useRe
      }
    }else{
      setdatas = {
        "id": that.data.moben,
        "resume_Id": that.data.resumeId,
        "start_Time": that.data.startTime + "-29T14:17:27.682Z",
        "end_Time": that.data.endTime + "-29T14:17:27.682Z",
        "certificate_Name": that.data.project,
        "B_Card": that.data.b_card,
        "Certificate_Title": that.data.Certificate_Title,
        "train_Org": that.data.work,
        "gertificate_Type_Id": that.data.active,
        "reg_Status": that.data.registration,
        "gertificate_Status": that.data.state,
        "province": that.data.province,
        "city": that.data.location,
        "gertificate_Use": that.data.useRe

      }
    }
    let result = common.IsEmpty(setdatas);
    if (!result) {
      return false;
    }

    common.request('api/resume/save_certificate', {
      params: setdatas,
      success: function (res) {
        console.log("保存/新增证书板块", res)

      }
    }, app.globalData.login)

    wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 800
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  //删除此项目
  removex: function () {
    var that = this;
    var setdata = {
      "id": that.data.moben,
      "resume_Id": that.data.resumeId,
    }
    common.request('api/resume/delete_certificate', {
      params: setdata,
      success: function (res) {
        console.log("删除证书", res)

      }
    }, app.globalData.login)
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name,
      location: item.citys[item.value[1]].name,
      'infoChild.location': item.citys[item.value[1]].name
    });
  },
  onReachBottom: function () {
  },
  nono: function () { }
})