// pages/creation/creation.js
var model = require('../../model/model.js')
const utils = require('../../utils/util.js')

var show = false;
var item = {};
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // show:true,
    //自定义模板必须引入的数据版块
    navData: [
      {
        name: "兼职人才",  //文本
        current: 0,    //是否是当前页，0不是  1是
        style: 0,     //样式
        ico: '.icon-fabu',  //不同图标
        fn: 'gotoCompanyIndex'   //对应处理函数
      }, {
        name: "全职人才",
        current: 0,
        style: 0,
        ico: 'icon-mingpianjia',
        fn: 'gotobusinessCard'
      }, {
        name: "发布",
        current: 1,
        style: 1,
        ico: '',
        fn: 'gotopublish'
      }, {
        name: "推荐",
        current: 0,
        style: 0,
        ico: 'icon-yikeappshouyetubiao35',
        fn: 'gotoMessages'
      }, {
        name: "公司",
        current: 0,
        style: 0,
        ico: 'icon-wode',
        fn: 'bindViewMy'
      }
      
    ],
    tabs: ["发布兼职", "发布全职",],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //版块数据组
    allms:{
     // showTextarea:true,
      select:[
        {
          comTitle:'职位信息',
          child:[
            {
              inputTitle:'职位标题',
              inputPlace:'请输入',
              input:'',
              fn:'titleInput'
              
            },
            {
              countTitle:'职位薪资',
              countCount:'请选择',
              fn:'choosePay'
            }
          ],
        },
         {
          comTitle: '任职要求',
          child: [
            {
              countTitle: '职位类别',
              countCount: '请选择',
              fn: 'post'
            },
            {
              countTitle: '招聘人数',
              countCount: '请选择',
              fn: 'receuit'
            },
            {
              countTitle: '工作地区',
              countCount: '请选择',
              fn: 'area'
            }
            ,
            {
              countTitle: '工作经验',
              countCount: '请选择',
              fn: 'exp'
            }
            ,
            {
              countTitle: '学历要求',
              countCount: '请选择',
              fn: 'education'
            }
          
          ],
        }
      ],
      textarea:[
        {
          textareaTitle:"情况说明",
          fn:'textarea',
          placeTitle:'请编辑岗位职责',
          textarea:''
        }
      ],
      publish:'发布职位',
      fn:'publish'
    },
    otherms:{
      select: [
        {
          comTitle: '职位信息',
          child: [
            {
              inputTitle: '职位标题',
              inputPlace: '请输入',
              input: '',
              fn: 'FtitleInput'

            },
            {
              countTitle: '职位薪资',
              countCount: '请选择',
              fn: 'FchoosePay'
            }
          ],
        },
        {
          comTitle: '证书要求',
          child: [
            {
              countTitle: '证书类别',
              countCount: '请选择',
              fn: 'Ftype'
            },
            {
              countTitle: '注册情况',
              countCount: '请选择',
              fn: 'Fcase'
            },
            {
              countTitle: '证书状态',
              countCount: '请选择',
              fn: 'Fstate'
            }
            ,
            {
              countTitle: '用证地区',
              countCount: '请选择',
              fn: 'Farea'
            }
            ,
            {
              countTitle: '证书用途',
              countCount: '请选择',
              fn: 'Fuse'
            }

          ],
        }
      ],
      textarea: [
        {
          textareaTitle: "情况说明",
          fn: 'Ftextarea',
          placeTitle: '请编辑岗位职责',
          textarea: ''
        }
      ],
      publish: '发布职位',
      fn: 'publish'
    },
    item: {
      show: show
    }

  },
  //各个跳转函数
  gotoCompanyIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  gotobusinessCard: function () {
    wx.reLaunch({
      url: '/pages/detail/detail'
    })
  },
  gotopublish: function () {
    // wx.reLaunch({
    //   url: '/pages/creation/creation'
    // })
    return false;
  },
  gotoMessages: function () {
    wx.reLaunch({
      url: '/pages/news/news'
    })
  },
  bindViewMy: function () {
    wx.reLaunch({
      url: '/pages/user/user'
    })
  },
  //各个跳转函数end

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  let message = utils.sjc();
  //  console.log(message) 测试箭头函数

    // utils.request('sort/get_job_type', {
    //   params: {},
    //   success:res=> {
    //      console.log(res)
    //      utils.deleteEmptyProperty(res);
    //      console.log(res)
    //   }
    // }) 测试封装函数
   let that =this;
    /**跳转筛选 */
    let value = wx.getStorageSync('worktype')
    console.log("otherms", that.data.otherms)
    console.log("allms", that.data.allms)
    if (value) {
      if (that.data.activeIndex==0){
        that.setData({
          'otherms.select[1].child[0].countCount': value.value,
           pID: value.id
        })
      }else{
        that.setData({
          'allms.select[1].child[0].countCount': value.value,
           fID: value.id
        })
      }
        
    }
    wx.removeStorageSync('worktype')

    // 判断是否登录
  
    let values = wx.getStorageSync('token')
    if (values.has_Verify != 3) {
      this.setData({
        items: {
          //height: 550,
          masTitle: "",
          show: true,
          fages: true
        }
      });
    }
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
  area(){
    this.translate()
  },
  Farea(){
    this.translate()
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
   
  },
   //点击选择城市按钮显示picker-view
  translate(e) {
    let that = this;
    //隐藏输入框及头部及底部
    that.setData({
      'otherms.showTextarea': true,
      'allms.showTextarea':true,
      show:true

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
    console.log(that.data.province, that.data.city)
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
    });
    if (that.data.activeIndex == 0) {
      that.setData({
        'otherms.select[1].child[3].countCount': that.data.province + ' ' + that.data.city
      })
    } else {
      that.setData({
        'allms.select[1].child[2].countCount': that.data.province + ' ' + that.data.city
      })
    }
  },
  onReachBottom () {
  },
  nono() { },

//es6简化写法
  Ftype(){
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject'//实际路径要写全
    })
  },
  post(){
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject?id=0'//实际路径要写全
    })
  },
  //兼职的函数
  
  selsect(arry,elet){
    var that = this;
    wx.showActionSheet({
      itemList: arry,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          that.setData({
            [elet]: arry[res.tapIndex]
          })
        }
      }
    })
  },
  FchoosePay(){
    let arry = [ "1.5W-3.5W", "3.5W-4.5W", "4.5W-5.5W", "5.5W-6.5W","6.5W以上","面议"];
    let ele = 'otherms.select[0].child[1].countCount';
    this.selsect(arry, ele)
  },
  Fcase(){
    let arry = ["转注", "初始", "不限"];
    let ele = 'otherms.select[1].child[1].countCount';
    this.selsect(arry, ele)
  },
  Fstate(){
    let arry = ["闲置中", "快到期", "未拿证","不限"];
    let ele = 'otherms.select[1].child[2].countCount';
    this.selsect(arry, ele)
  },
  Fuse(){
    let arry = ["资质", "项目", "不限"];
    let ele = 'otherms.select[1].child[4].countCount';
    this.selsect(arry, ele)
  },
  FtitleInput(e){
   // console.log(e.detail.value);
   this.setData({
     'otherms.select[0].child[0].input': e.detail.value
   })
  },
  Ftextarea(e){
    this.setData({
      'otherms.textarea[0].textarea': e.detail.value
    })
  },

  publish(){
    let that = this;
    let url = '';
    let datas = [];
    if (!that.data.token){
      wx.showToast({
        title: '您未登录',
        icon: 'loading',
        duration: 1500
      });
      setTimeout(function(){
        that.setData({
          items: {
            //height: 550,
            masTitle: "",
            show: true,
            fages: true
          }
        });
      },1500)
      return false;
    }
    if (that.data.activeIndex==0){
      url = 'api/position/public_part_position',
      datas = {
        "Position_Title": that.data.otherms.select[0].child[0].input,
        "Company_Name": app.globalData.userinfo.Company_Name,
        "Position_Year_Wage": that.data.otherms.select[0].child[1].countCount,
        // "Position_Year_Wage": 10086,
        "Remark": that.data.otherms.textarea[0].textarea,
        "sho_position_gertificate": [
          {

            "Gertificate_Type_Id": that.data.pID,
            "Reg_Status": that.data.otherms.select[1].child[1].countCount,
            "Gertificate_Status": that.data.otherms.select[1].child[2].countCount,
            "Province": that.data.province,
            "City": that.data.city,
            "Gertificate_Use": that.data.otherms.select[1].child[4].countCount,
          }
        ]
      }
      console.log("兼职",that.data.otherms)
    }else{
      url = 'api/position/public_full_position';
      datas = {
     
      
        "Position_Title": that.data.allms.select[0].child[0].input,
        "Company_Name": app.globalData.userinfo.Company_Name,
        "Position_Month_Wage": that.data.allms.select[0].child[1].countCount,
        "Need_Count": that.data.allms.select[1].child[1].countCount,
        "Province": that.data.province,
        "City": that.data.city,
        "County": that.data.county,
        "Job_Exp": that.data.allms.select[1].child[3].countCount,
        "Education": that.data.allms.select[1].child[4].countCount,
        "Job_Type_Id": that.data.fID,
        "Remark": that.data.allms.textarea[0].textarea
      }
      console.log("datas", datas)
    }
    console.log("是否有空的东西", utils.IsEmpty(datas), 'datas',datas) ;
     if (datas.sho_position_gertificate){
       console.log("证书", utils.IsEmpty(datas.sho_position_gertificate[0]), datas.sho_position_gertificate[0]);
    }
   

    //判断是否有空的输入填入
    if (!utils.IsEmpty(datas)){
      wx.showToast({
        title: '有未填项',
        icon: 'loading',
        duration: 3000
      });
      return false;
    }else{
      if (datas.sho_position_gertificate){
        if (!utils.IsEmpty(datas.sho_position_gertificate[0])){
          wx.showToast({
            title: '有未填项',
            icon: 'loading',
            duration: 3000
          });
          return false;
        }
      }
    }
    utils.post(url, datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      wx.showToast({
        title: '已发布',
        icon: 'success',
        duration: 1500
      });
      setTimeout(function(){
        wx.showModal({
      
          content: '是否查看发布的该简历？',
          confirmText: "是",
          cancelText: "否",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              console.log('用户点击主操作')
              wx.navigateTo({
                url: '/pages/child/positionManagement/positionManagement'//
              })
            } else {
              console.log('用户点击辅助操作')
              return false;
            }
          }
        });
      },1000)
      //存储结束
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.showToast({
        title: '发布失败',
        icon: 'loading',
        duration: 3000
      });

      //reject()
    });
  
    
  },
  
  //全职相关
  titleInput(e){
    console.log(e.detail.value);
    this.setData({
      'allms.select[0].child[0].input': e.detail.value
    })
  },
  textarea(e){
    console.log(e.detail.value);
     this.setData({
       'allms.textarea[0].textarea': e.detail.value
     })
  },
  choosePay(){
    let arry = ["3k -6k", "6k -10k", "10k -15k", "15k以上", "面议"];
    let ele = 'allms.select[0].child[1].countCount';
    this.selsect(arry, ele)
  },
  receuit(){
    let arry = ["1-5人", "5-20人", "20-30人", "若干人"];
    let ele = 'allms.select[1].child[1].countCount';
    this.selsect(arry, ele)
  },
  exp(){
    let arry = ["1年", "2-5年", "5-10年", "10年以上"];
    let ele = 'allms.select[1].child[3].countCount';
    this.selsect(arry, ele)
  },
  education(){
    let arry = ["高中", "大专", "本科", "硕士","博士以上","不限"];
    let ele = 'allms.select[1].child[4].countCount';
    this.selsect(arry, ele)
  },
    //针对登录的js

  getPhoneNumber(e) {
    let that = this;
    that.setData({

      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      new Promise(step1)
        .then(function (val) {
          console.log(val);
          return new Promise(step2)
        })
        .then(function (val) {
          console.log(val);
          return new Promise(step3)
        })
        .then(function () {
          console.log('搞定！')
        })



      function step1(resolve, reject) {
        const mylogin = utils.wxPromisify(wx.login);
        mylogin().then(res => {
          console.log(res)
          let data = {
            "code": res.code
          }
          that.setData({
            code: data
          })
          resolve(true)
        }).catch(res => {
          reject(false)
        })
      }


      function step2(resolve, reject) {

        utils.post('api/common/get_com_wx_openid', that.data.code).then((res) => {
          console.log(res);//正确返回结果
          wx.hideLoading();
          that.setData({
            oppid: res.wx_openid
          })
          //存储oppid
          try {
            wx.setStorageSync('oppid', res.wx_openid)
          } catch (e) {
          }
          //存储结束
          resolve()
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
          reject()
        });
      }

      function step3(resolve, reject) {
        let datas = {
          "openid": that.data.oppid,
          "encryptedData": that.data.encryptedData,
          "iv": that.data.iv
        };
        utils.post('api/common/wx_login_phone_token', datas).then((res) => {
          console.log(res);//正确返回结果
          // console.log(res.dic.has_Verify)
          if (res.dic.has_Verify == 0) {
            wx.showModal({
              title: '温馨提示',
              content: '你的微信号尚未进行企业认证，是否进行认证？',
              confirmText: "确定",
              cancelText: "取消",
              success: (e) => {
                console.log(e);
                if (e.confirm) {
                  //console.log('用户点击主操作')
                  wx.navigateTo({
                    // url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}`//实际路径要写全
                    url: '/pages/child/logon/logon?login_phone=' + res.dic.login_phone + '&login_token=' + res.dic.login_token//实际路径要写全
                  })
                } else {
                  //console.log('用户点击辅助操作')
                }
              }
            })
          } else if (res.dic.has_Verify == 1 || res.dic.has_Verify == 2) {
            wx.showModal({
              title: '温馨提示',
              content: '您的账号还在审核中',
              confirmText: "确定",
              cancelText: "取消",
              success: (e) => {
                console.log(e);
                if (e.confirm) {
                  //console.log('用户点击主操作')

                } else {
                  //console.log('用户点击辅助操作')
                }
              }
            })
          } else if (res.dic.has_Verify == 3) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 3000
            });
            // 存储登录信息
            try {
              // wx.setStorageSync('token', res.dic.login_token);
              wx.setStorageSync('token', res.dic);
              app.globalData.register = true;
              that.setData({
                'items.show': false,
                token: true
              })
            } catch (e) {
            }
          } else if (res.dic.has_Verify == 4) {
            wx.showModal({
              title: '温馨提示',
              content: '你的微信号尚未进行企业认证，是否进行认证？',
              confirmText: "确定",
              cancelText: "取消",
              success: (e) => {
                console.log(e);
                if (e.confirm) {
                  //console.log('用户点击主操作')
                  wx.navigateTo({
                    url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}&has_Verify=${res.dic.has_Verify}`//实际路径要写全
                    //序号为4是认证失败，需要提示重新认证，并且接口换成“api/common/company_again_register”
                  })
                } else {
                  //console.log('用户点击辅助操作')
                }
              }
            })
          }
          wx.hideLoading();
          resolve()
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
          reject()
        });
      }
      // wx.showModal({
      //   title: '提示',
      //   showCancel: false,
      //   content: '同意授权',
      //   success: function (res) { }
      // })
    }
  },
  urlTo() {
    wx.navigateTo({
      url: `/pages/child/logon/logon`//实际路径要写全
    })
  },
  urlTo2() {
    wx.navigateTo({
      url: `/pages/child/logon/logon?type=company`//实际路径要写全
    })
  },
  urlclose() {
    this.setData({
      items: {
        show: false
      }
    });
  }
  //
})