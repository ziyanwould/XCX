// pages/child/logon/logon.js
var model = require('../../../model/model.js')
const utils = require('../../../utils/util.js')

var show = false;
var item = {};
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let interval = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 61,
    codeNum:2,
    step:-1,
    wxPhone:18776007488,
    company_register:{
    },//注册信息表
    switchs:true,
    allDa:{
      step: [
        {
          num: 1,
          active: true
        },
        {
          num: 2,
          active: false
        }
        , {
          num: 3,
          active: false
        }
        , {
          num: 4,
          active: false
        }
      ],
      mesInput: true,
      credImg: false,
      inputList: [
        {
          img: 'logocomp.png',
          classx: 'img1',
          title: '企业名字：',
          value: '',
          placeholder: '(请与营业执照注册名保存一致)',
          placlass: 'loPlone',
          fn: 'watchInput'
        },
        {
          img: 'Logoarea.png',
          classx: 'img2',
          title: '所在地：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: '',
          dis: true,
          fun: 'area'
        },
        {
          img: 'detailArea.png',
          classx: 'imgarea',
          title: '详细地址：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput'
        }

      ],
      Ccie: {
        // img:'companylogon.png',
        img: 'http://www.liujiarong.top/WXImg/companylogon.png',
        classx: 'img4',
        uptext: '点击上传营业执照',
        other: '(图片格式为jpg,png,大小不超过3M)',
        fn: 'setup'

      },
      lastSetp: 'lastSetp',
      nextSetp: 'nextSetp',
      nextText: '下一步',
      mes: true,
      mesLeft: '注册代表你已同意',
      mesRight: '《建筑猎聘用户协议》',
      Acc: true,
      AccText: '已有账户',
    },
    wxDa: {
      step: [
        {
          num: 1,
          active: true
        },
        {
          num: 2,
          active: false
        }
        , {
          num: 3,
          active: false
        }
     
      ],
      mesInput: true,
      credImg: false,
      inputList: [
        {
          img: 'logocomp.png',
          classx: 'img1',
          title: '企业名字：',
          value: '',
          placeholder: '(请与营业执照注册名保存一致)',
          placlass: 'loPlone',
          fn: 'watchInput'
        },
        {
          img: 'Logoarea.png',
          classx: 'img2',
          title: '所在地：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: '',
          dis: true,
          fun: 'area'
        },
        {
          img: 'detailArea.png',
          classx: 'imgarea',
          title: '详细地址：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput'
        }

      ],
      Ccie: {
        // img:'companylogon.png',
        img: 'http://www.liujiarong.top/WXImg/companylogon.png',
        classx: 'img4',
        uptext: '点击上传营业执照',
        other: '(图片格式为jpg,png,大小不超过3M)',
        fn: 'setup'

      },
      lastSetp: 'lastSetp',
      nextSetp: 'nextSetp',
      nextText: '下一步',
      mes: true,
      mesLeft: '注册代表你已同意',
      mesRight: '《建筑猎聘用户协议》',
      Acc: true,
      AccText: '已有账户',
    },
    useDa:{
    
    },
    login: {
       switcher:true,
      mesInput: true,
      credImg: false,
      inputList: [
        {
          img: 'logUse.png',
          classx: 'logUse',
          title: '企业名/手机号：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput'
        },
        {
          img: 'code.png',
          classx: 'imgpass',
          title: '密码：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput',
          'type': 'password',
        }
      ],
      lastSetp: '',
      nextSetp: '',
      nextText: '登录',
      mes: true,
      mesLeft: ' ',
      mesRight: ' ',
      Acc: true,
      AccText: '立即注册',
      AccFn:'loginTo',
      nextSetp:'enter',
    },
    login2: {
        switcher: false,
        mesInput: true,
        credImg: false,
        inputList: [
          {
            img: 'logphone.png',
            classx: 'logphone',
            title: '请输入手机号码：',
            value: '',
            placeholder: '',
            placlass: 'loPlone',
            fn: 'watchInput',


          },
          {
            img: 'logfaty.png',
            classx: 'logfaty',
            title: '请输入验证码：',
            value: '',
            placeholder: '',
            placlass: 'loPlone',
            fn: 'watchInput',
            fn2: 'getVerificationCode',
            valMessPan: true,
            time: "获取验证码"

          }
        ],
        lastSetp: '',
        nextSetp: '',
        nextText: '登录',
        mes: true,
        mesLeft: ' ',
        mesRight: ' ',
        Acc: true,
        AccText: '立即注册',
        AccFn: 'loginTo',
        nextSetp: 'enterico',
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    if (options.has_Verify){
      this.setData({
        has_Verify:true
      })
    }
    if (options.login_phone){
        //微信注册
      that.setData({
      useDa: that.data.wxDa,
      codeNum: 2,
      wxLogin:true,
      login_token: options.login_token,
      wxPhone: options.login_phone
    })
    }else if(options.type){
      that.setData({
        useDa: that.data.login,
        logine:true
      })
    } else{
      //手机号注册呢
      that.setData({
        useDa: that.data.allDa,
        codeNum: 2,
      })

    }
 

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    let that = this;
    model.updateAreaData(that, 0, e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("信息", this.data.useDa);

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
  //尝试更改是否可以恢复
  getVerificationCodes(e){
    this.getVerificationCode(e,"手机注册")
  },
  getVerificationCode: function (e,types="手机登录") {
    let code = this.data.codeNum;
    let mobiles = code-1;
    let flage = this.data.useDa.inputList[code].time;
    console.log("输入框信息1", flage)
    if (!(flage == '获取验证码' || flage == '重新发送')){
      console.log("输入框信息2", flage)
       return false;
     }
    //  发送验证码
    let mobile = this.data.useDa.inputList[mobiles].value;
    let regMobile = /^1\d{10}$/;
    if (!regMobile.test(mobile)) {
      wx.showModal({
        content: '您的手机号输入有误',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      });
      return false;
    }
    //启动计数器
    console.log("手机验证码烈性", types)
    utils.post('api/common/send_smscode', {
      "mobile": mobile,
      "action_type": types,
      "content": "建筑猎聘登录/注册"
    }).then((res) => {
      console.log(res);//正确返回结果
      wx.hideLoading();
    
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
  
    });
    this.getCode();
    var that = this
    let setmessage = 'useDa.inputList['+code+'].disabled'
    that.setData({
      [setmessage]: true
    })
   
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    let code = this.data.codeNum;
    var setmessage = 'useDa.inputList[' + code+'].time';
    var setdis = 'useDa.inputList[' + code +'].disabled';
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        [setmessage]: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          [setmessage]: '重新发送',
          currentTime: 61,
          [setdis]: false
        })
      }
    }, 1000)
  },
  //地区三联动
  area() {
    this.translate()
  },
  Farea() {
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
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView(e) {
    var that = this;
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
  
      that.setData({
        'useDa.inputList[1].value': that.data.province + ' ' + that.data.city + ' ' + that.data.county
      })
  
  },
  onReachBottom() {
  },
  nono() { },
  //监测页面
  watchInput(e){
    let that = this;
    let id = e.target.dataset.id  
    console.log(id, e.detail.value)
    let value = 'useDa.inputList[' + id+'].value';
    that.setData({
      [value]: e.detail.value
    })
  },
  //上传图片板块
  setup(){
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
       let    tempFilePaths = res.tempFilePaths
        console.log("图片链接", tempFilePaths)
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })  

        const uploadFile = utils.wxPromisify(wx.uploadFile);
        uploadFile({
          url: app.globalData.url+'usercenter/upload_img', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
          },
        }).then(res => {
          console.log()
          let dataimg = JSON.parse(res.data)
          let imgsrc = dataimg.imgs[0];
          that.setData({
            'useDa.Ccie.img': imgsrc
          })
          setTimeout(function () {
            wx.hideToast();
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            });
          }, 200)
        }).catch(res => {
         
        })


      
       
      }
    })
  },
  //页面逻辑版块
  activeSetp(){
    let that = this;
    let arg = that.data.useDa.step;
    for (let val of arg) {
      if (val.active) {
        that.setData({
          step: val.num,
        })
      }
    }

  },
  //设置导航状态
  setStep(nums){
    let that = this;
    let arg = that.data.useDa.step;
    for (let val of arg) {
      if (val.num == nums) {
         val.active =true
      }else{
        val.active =false
      }
    }
    //console.log(arg)
    that.setData({
      'useDa.step': arg
    })
  },
  lastSetp(){
  
    let that = this;
    that.activeSetp()
    let num = that.data.step;
    if (num>2){
      let lastList = 'lastList' + num
      that.setData({
        [lastList]: that.data.useDa.inputList
      })
    }
    if (that.data.wxLogin){
      switch (num) {
        case 1:
          wx.navigateBack({
            delta: 1 //返回页面数
          })
          break;
        case 2:
          that.state(1);
          that.setStep(1);
          that.setData({
            'useDa.inputList': that.data.lastList1
          })
          break;
        case 3:
          that.state(2);
          that.setStep(2);
          that.setData({
            'useDa.inputList': that.data.lastList2,
            'useDa.nextText': '下一步'
          })
          break;
  
        default:

      }
      return false;
    }
   
    switch (num) {
      case 1:
        wx.navigateBack({
          delta: 2 //返回页面数
        })
        break;
      case 2:
        that.state(1);
        that.setStep(1);
        that.setData({
          'useDa.inputList': that.data.lastList1
        })
        break;
      case 3:
        that.state(2);
        that.setStep(2);
        that.setData({
          'useDa.inputList': that.data.lastList2
        })
        break;
      case 4:
        that.state(3);
        that.setStep(3);
        that.setData({
          'useDa.inputList': that.data.lastList3,
          'useDa.nextText': '下一步'
        })
        break;
      default:
      
    }
  },
  nextSetp(){
    let that = this;
    that.activeSetp();
    let num = that.data.step;
    let lastList = 'lastList' + num
    that.setData({
      [lastList]: that.data.useDa.inputList
    })
    if(that.data.wxLogin){
      switch (num) {
        case 1:
          that.step1();
          break;
        case 2:
          that.step2();
          break;
        case 3:
          that.step4();
          break;
      
        default:

      }

      return false
    }
    switch (num) {
      case 1:
        that.step1();
        break;
      case 2:
        that.step2();
        break;
      case 3:
        that.step3();   
        break;
      case 4:
        that.step4();
        break;
      default:

    }
 
  
  }
  ,
  step1(){
    let that = this;
    //console.log(that.data.useDa.inputList[0].value, that.data.useDa.inputList[1].value, that.data.useDa.inputList[2].value)
    let arg = that.data.useDa.inputList;
    let flage = false;
    for (let val of arg) {
      if (val.value=='') {
        flage = true
      }
    }
    if(flage){
      wx.showModal({
        content: '您尚有信息没有填写完毕',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }else{
      //页面信息刷新
      that.setStep(2);
      that.save(1)
      that.state(2);
    }

  },
  step2(){
    let that = this;
    let flage = that.data.useDa.Ccie.img;
    if (flage == "http://www.liujiarong.top/WXImg/companylogon.png"){
      wx.showModal({
        content: '您尚未上传营业执照',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      if (that.data.wxLogin) {
        that.setStep(3);
        that.save(2)
        that.state(5);
        if (that.data.lastList4) {
          that.setData({
            'useDa.inputList': that.data.lastList4
          })
        }
        return false;

      }
      that.setStep(3);
      that.save(2)
      that.state(3)
      if (that.data.lastList3) {
        that.setData({
          'useDa.inputList': that.data.lastList3
        })
      }
    }
  
  },
  step3() {
    let that = this;
    let ps1 = that.data.useDa.inputList[0].value;
    let ps2 = that.data.useDa.inputList[1].value;

    let regMobile = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
   
    if (ps1==''){
      wx.showModal({
        content: '密码不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else if (!regMobile.test(ps1)) {
      wx.showModal({
        content: '您的密码强度不够',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      })
      return false;
    }else if(ps1!=ps2){
      wx.showModal({
        content: '您的两次密码不一致',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      })
    }else{
      that.setStep(4);
      that.save(3)
      that.state(4);
       if (that.data.lastList4){
          that.setData({
            'useDa.inputList': that.data.lastList4
          })
        }
    }
 
  },
  step4(){
    let that = this;
    let mes1 = that.data.useDa.inputList[0].value;
    var mes2 = 0;
    var mes3 = '';
    if(that.data.wxLogin){
      mes3 = true;
      mes2= true
    }else{
      mes3 =that.data.useDa.inputList[2].value;
      mes2 =that.data.useDa.inputList[1].value
    }

    if (mes1==''){
      wx.showModal({
        content: '联系人不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      })
    }else if (mes2 =='')
    {
      wx.showModal({
        content: '手机号不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      })
    } else if (mes3 == ''){
      wx.showModal({
        content: '验证码不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      })
    }else{
      let url ='';
      if (that.data.login_token){
        console.log("token", that.data.login_token)
        that.save(5)
      }else{
        that.save(4)
      }
     
      if (that.data.has_Verify){
        url ='api/common/company_again_register'
      }else{
        url = 'api/common/company_register'
      }
      //提交注册信息
      console.log("message", that.data.company_register)
      utils.post(url, that.data.company_register).then((res) => {
        console.log(res);//正确返回结果
        wx.showToast({
          title: '成功提交',
          icon: 'success',
          duration: 1000
        });
        //后退的页面路由
        setTimeout(function () {
          wx.navigateBack({
            delta: 2 //返回页面数
          })
        }, 1000)
        wx.hideLoading();
       
      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息
        wx.showModal({
          content: errMsg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })

        wx.hideLoading();
       
      });
     

    
    }

  },
  state(unm){
    let that = this;
    if (unm == 1){
      let list = [
        {
          img: 'logocomp.png',
          classx: 'img1',
          title: '企业名字：',
          value: '',
          placeholder: '(请与营业执照注册名保存一致)',
          placlass: 'loPlone',
          fn: 'watchInput'
        },
        {
          img: 'Logoarea.png',
          classx: 'img2',
          title: '所在地：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: '',
          dis: true,
          fun: 'area'
        },
        {
          img: 'detailArea.png',
          classx: 'imgarea',
          title: '详细地址：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput'
        }
      ]

      that.setData({
        'useDa.mesInput': true,
        'useDa.credImg': false,
        'useDa.Acc': false,
        'useDa.inputList': list
      }) 
    } else if (unm==2){
      that.setData({
        'useDa.mesInput' : false,
        'useDa.credImg': true,
        'useDa.Acc':false,
      }) 
    } else if (unm == 3){
      
      let list = [
        {
          img:'code.png',
          classx:'imgpass',
          title:'设置登录密码：',
          value:'',
          placeholder: '密码由6-21字母和数字组成',
          placlass:'loPlone',
          fn:'watchInput',
          'type':'password',
        },
        {
          img: 'code.png',
          classx: 'imgpass',
          title: '确认登录密码：',
          value: '',
          placeholder: '请再次输入密码',
          placlass: 'loPlone',
          fn: 'watchInput',
          'type': 'password',
        
        }]
      that.setData({
        'useDa.mesInput': true,
        'useDa.credImg': false,
        'useDa.Acc': false,
        'useDa.inputList': list
      }) 
    } else if (unm == 4){

      let list = [
        {
          img: 'logUse.png',
          classx: 'logUse',
          title: '联系人姓名：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput',
         
        },
        {
          img: 'logcall.png',
          classx: 'logcall',
          title: '联系人手机号码：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput',
       

        },
        {
          img: 'logfaty.png',
          classx: 'logfaty',
          title: '手机号码验证码：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput',//验证码修改
          fn2:'getVerificationCodes',
          valMessPan:true,
          time: "获取验证码"

        }
        ]
      that.setData({
        'useDa.mesInput': true,
        'useDa.credImg': false,
        'useDa.Acc': false,
        'useDa.inputList': list,
        'useDa.nextText':'完成注册'
      }) 
    } else if (unm == 5){
      let list = [
        {
          img: 'logUse.png',
          classx: 'logUse',
          title: '联系人姓名：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput',

        },
        {
          img: 'logcall.png',
          classx: 'logcall',
          title: '联系人手机号码：',
          value: that.data.wxPhone,
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput',
          dis:true

        }
      
      ]
      that.setData({
        'useDa.mesInput': true,
        'useDa.credImg': false,
        'useDa.Acc': false,
        'useDa.inputList': list,
        'useDa.nextText': '完成注册'
      }) 
    }
  
  },
  //存数据函数函数
  save(num){
     let that = this;    
    switch (num) {
      case 1:
        that.setData({
          
          "company_register.Company_Name": that.data.useDa.inputList[0].value,
          "company_register.Province": that.data.province ,
          "company_register.City": that.data.city,
          "company_register.County": that.data.county,
          "company_register.Address": that.data.useDa.inputList[2].value
        })
        break;
      case 2:
        that.setData({
          "company_register.Company_License": that.data.useDa.Ccie.img
        })
        break;
      case 3:
        that.setData({
          "company_register.password": that.data.useDa.inputList[1].value
        })
        break;
      case 4:
        that.setData({
          "company_register.Link_Man": that.data.useDa.inputList[0].value,
          "company_register.phone": that.data.useDa.inputList[1].value,
          "company_register.code": that.data.useDa.inputList[2].value
        
        })
        break;
      case 5:
        console.log("token",that.data.login_token+'=')
        that.setData({
          "company_register.Link_Man": that.data.useDa.inputList[0].value,
          "company_register.phone": that.data.wxPhone,
          "company_register.login_token": that.data.login_token+'='
         
        })
        break;
      default:

    }
  },
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
          //进行登录值得判断，结果进入管道输出
          that.pullId(res);
          wx.hideLoading();
          resolve()
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
          reject()
        });
      }
   
    }
  },
  icoIpone(){
    let that = this;
    that.setData({
      useDa: that.data.login2,
      logine: true,
      codeNum: 1,
    })
  },
  AccNumber(){
    let that = this;
    that.setData({
      useDa: that.data.login,
      logine: true,
      codeNum: 2,
    })
  }
  , loginTo(){
    let that = this;
    that.setData({
      useDa: that.data.allDa,
      codeNum: 2,
      logine:false
    })
  },
   enter(){
    let that = this;
     let message = that.entercom();
     let mobile = message.m1;
     let datas ={};
     let numbers =/^([.~'!@#￥$%^&*()-+_=:0-9\s]+)$/;
     let regMobile = /^1\d{10}$/;
     if (numbers.test(mobile)){
       console.log("进入号码范畴")
       if (!regMobile.test(mobile)) {
         wx.showModal({
           content: '您的手机号输入有误',
           showCancel: false,
           success: function (res) {
             if (res.confirm) {
               //console.log('用户点击确定')
             }
           }
         });
       }else{
         if (message.m1 == '' || message.m2 == '') {
           wx.showModal({
             content: '您尚有未填信息',
             showCancel: false,
             success: function (res) {
               if (res.confirm) {
                 //console.log('用户点击确定')
               }
             }
           });
           return false;
         }
         datas={
           "phone": mobile,
          // "code": "string",
          // "company": "string",
           "password": message.m2
         }
       }
     }else{
       if (message.m1 == '' || message.m2 == '' ){
         wx.showModal({
           content: '您尚有未填信息',
           showCancel: false,
           success: function (res) {
             if (res.confirm) {
               //console.log('用户点击确定')
             }
           }
         });
         return false;
       }
       datas = {
         //"phone": mobile,
         // "code": "string",
         "company": mobile,
         "password": message.m2
       }
     
     }

     console.log("上传2", datas);
     utils.post('api/common/company_login', datas).then((res) => {
       console.log(res);//正确返回结果
       that.CompullId(res);
       wx.hideLoading();
   
    
     }).catch((errMsg) => {
       console.log(errMsg);//错误提示信息
       wx.showModal({
         content: errMsg,
         showCancel: false,
         success: function (res) {
           if (res.confirm) {
             //console.log('用户点击确定')
           }
         }
       });
       wx.hideLoading();
    
     });
   },
   enterico(){
     let that = this;
     let message = that.entercom();
     let mobile = message.m1;
     let regMobile = /^1\d{10}$/;
     if (!regMobile.test(mobile)) {
       wx.showModal({
         content: '您的手机号输入有误',
         showCancel: false,
         success: function (res) {
           if (res.confirm) {
             //console.log('用户点击确定')
           }
         }
       });
     } else if (message.m1 == '' || message.m2 == '' ){
       wx.showModal({
         content: '您尚有未填信息',
         showCancel: false,
         success: function (res) {
           if (res.confirm) {
             //console.log('用户点击确定')
           }
         }
       });
     }
     else{
       let datas ={
         "phone": mobile,
         "code": message.m2,
       
       }
       console.log("上传", datas);
       utils.post('api/common/company_login', datas).then((res) => {
         console.log(res);//正确返回结果
         that.CompullId(res);
         wx.hideLoading();
       }).catch((errMsg) => {
         console.log(errMsg);//错误提示信息
         wx.showModal({
           content: errMsg,
           showCancel: false,
           success: function (res) {
             if (res.confirm) {
               //console.log('用户点击确定')
             }
           }
         });
         wx.hideLoading();

       });
     }


   }
   ,entercom(){
     let that = this;
     let val1 = that.data.useDa.inputList[0].value;
     let val2 = that.data.useDa.inputList[1].value;
     console.log("登录信息", val1, val2)
     return {
       m1: val1,
       m2: val2,
     }
   },
  swictchTO(){
    let that = this;
    that.setData({
      useDa: that.data.login,
      logine: true
    })
  },
  //用微信判断的信息
  pullId(res){
    let that = this;
    console.log("dic",res)
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
            // wx.navigateTo({
            //   // url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}`//实际路径要写全
            //   url: '/pages/child/logon/logon?login_phone=' + res.dic.login_phone + '&login_token=' + res.dic.login_token//实际路径要写全
            // })
            // 取消跳转直接切换
            that.setData({
              useDa: that.data.wxDa,
              codeNum: 2,
              wxLogin: true,
              login_token: res.dic.login_token.substring(0, (res.dic.login_token).lastIndexOf('=')),
              wxPhone: res.dic.login_phone,
              logine: false//控制底部两个图标
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
            setTimeout(function () {
              wx.navigateBack({
                delta: 2 //返回页面数
              })
            }, 1000)

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
        setTimeout(function () {
          wx.navigateBack({
            delta: 2 //返回页面数
          })
        }, 1000)
      } catch (e) {
      }
    } else if (res.dic.has_Verify == 4) {
      wx.showModal({
        title: '温馨提示',
        content: '你的微信号认证失败，是否重新认证？',
        confirmText: "确定",
        cancelText: "取消",
        success: (e) => {
          console.log(e);
          if (e.confirm) {
            //console.log('用户点击主操作')
            // wx.navigateTo({
            //   url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}&has_Verify=${res.dic.has_Verify}`//实际路径要写全
            //   //序号为4是认证失败，需要提示重新认证，并且接口换成“api/common/company_again_register”
            // })
            // 取消跳转
            that.setData({
              useDa: that.data.wxDa,
              codeNum: 2,
              wxLogin: true,
              login_token: res.dic.login_token.substring(0, (res.dic.login_token).lastIndexOf('=')),
              wxPhone: res.dic.login_phone,
              logine: false,//控制底部两个图标
              has_Verify: true//控制为更新失败的数据
            })
          } else {
            //console.log('用户点击辅助操作')
          }
        }
      })
    }
  },
  //普通账号的判断信息
  CompullId(res) {
    let that = this;
    console.log("dic", res)
    if (res.dic.has_Verify == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '你的用户名不存在，是否进行注册认证？',
        confirmText: "确定",
        cancelText: "取消",
        success: (e) => {
          console.log(e);
          if (e.confirm) {
            //console.log('用户点击主操作')
            // wx.navigateTo({
            //   // url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}`//实际路径要写全
            //   url: '/pages/child/logon/logon?login_phone=' + res.dic.login_phone + '&login_token=' + res.dic.login_token//实际路径要写全
            // })
            // 取消跳转直接切换
            that.setData({
              useDa: that.data.allDa,
              codeNum: 2,
              wxLogin: false,
              logine: false//控制底部两个图标
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
            setTimeout(function () {
              wx.navigateBack({
                delta: 2 //返回页面数
              })
            }, 1000)

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
        setTimeout(function () {
          wx.navigateBack({
            delta: 2 //返回页面数
          })
        }, 1000)
      } catch (e) {
      }
    } else if (res.dic.has_Verify == 4) {
      wx.showModal({
        title: '温馨提示',
        content: '你的微信号认证失败，是否重新认证？',
        confirmText: "确定",
        cancelText: "取消",
        success: (e) => {
          console.log(e);
          if (e.confirm) {
            //console.log('用户点击主操作')
            // wx.navigateTo({
            //   url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}&has_Verify=${res.dic.has_Verify}`//实际路径要写全
            //   //序号为4是认证失败，需要提示重新认证，并且接口换成“api/common/company_again_register”
            // })
            // 取消跳转
            that.setData({
              useDa: that.data.allDa,
              codeNum: 2,
              wxLogin: false,
              logine: false,//控制底部两个图标
              has_Verify: true//控制为更新失败的数据
            })
          } else {
            //console.log('用户点击辅助操作')
          }
        }
      })
    }
  }
})