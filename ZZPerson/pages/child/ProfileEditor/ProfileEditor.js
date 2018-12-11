var app = getApp()
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   noteMaxLen: 58, //备注最多字数 
   limitNoteLen:0, 
   date:"",
   date_end: "",
    array: ['初中', '高中', '中专' ,'大专' ,'本科' ,'硕士', '博士' ,'博士后'],
   arrays: ['应届毕业生', '1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年', '10年以上'],
   arrayd: ['我目前已离职，可快速到岗', '我目前在职，正考虑换个新环境', '我暂时不想找工作', '我是应届毕业生'],
   name:"真实姓名",
   edit_name:" ",
   sex:"性别",
   edit_sex: "请选择",
   year:"出生年月",
   edit_year:"请选择",
   education: "最高学历",
   edit_education: "请选择",
   work: "工作年限",
   edit_work: "请选择",
   phone:"手机号码",
   edit_phone:"",
   email:"联系邮箱",
   edit_email:"",
   city:"所在城市",
   edit_city:"",
   state:"当前状态",
   edit_state:"我目前已离职，可快速到岗",
   edit_textarea:""
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnewlist()
    
  var arrc = common.sjc();
   this.setData({
     date: arrc[1],
     date_end: arrc[0],
    })
     
     this.setData({
       loginG: getApp().globalData.login
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getnewlist()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var that = this;
   
   
  
   
    if (app.globalData.city!=null){
      console.log("全局城市", app.globalData.city)

      setTimeout(function(){
        that.setData({
          edit_city: app.globalData.city
        })
      },500)
     
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

  }
  ,
  onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
  //通俗的select功能
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
    
      
        if (!res.cancel) {
          //console.log(res.tapIndex)
          var sex = res.tapIndex;
          if(sex==0){
            console.log("男")
            // edit_sex="男"
            that.setData({
              edit_sex: "男"
            })
            
          }else{
            // edit_sex = "女"
            console.log("女")
            that.setData({
              edit_sex:"女"
            })
          }
         
        }
      }
    });
  },
  bindname:function(e){
    var value = e.detail.value
    this.setData({
      edit_name: e.detail.value
    })
  },
  bindphone: function (e) {
    var value = e.detail.value
    this.setData({
      edit_phone: e.detail.value
    })
  },
  bindemail: function (e) {
    var value = e.detail.value
    this.setData({
      edit_email: e.detail.value
    })
  },

  open_stata: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['我目前已离职，可快速到岗', '我目前在职，正考虑换个新环境','我暂时不想找工作','我是应届毕业生'],
      success: function (res) {
       
        that.setData({

          edit_state: that.data.arrayd[res.tapIndex]

        })
        //console.log(res.tapIndex)
        console.log(that.data.arrayd[res.tapIndex])
      }
    });
  },
  //时间下拉选择器
  bindDateChange: function (e) {
    this.setData({
      edit_year: e.detail.value
    })
   
   
  },
  //学历选择
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
  
      edit_education: that.data.array[e.detail.value]
     
    })
    console.log('学历', that.data.edit_education)
  },
  //工作年限
  bindPickerwork: function (e) {
    var that = this;
    this.setData({

      edit_work: that.data.arrays[e.detail.value]

    })
  },
  click_city:function(){
    wx.navigateTo({
      url: "../../child/citySelect/citySelect"
    })
  },
  //字数限制  
  bindWordLimit: function (e) {
    var value = e.detail.value, len = parseInt(value.length);
    
    if (len > this.data.noteMaxLen) return;

    this.setData({
      edit_textarea: value,
      currentNoteLen: len, //当前字数  
      limitNoteLen:this.data.noteMaxLen - len //剩余字数  
    });
  }, 
  /*更新最新数据*/ 
  getnewlist:function(){
    var that = this
    common.setStronguser({
      success: function (res) {
       
        common.deleteEmptyProperty(res);
        console.log("成功判断本地存储", res.data)
        that.setData({
          //userInfo: res.data
          edit_name: res.data.nickName,
          edit_sex: res.data.gender,
          edit_state: res.data.job_status,
          edit_textarea: res.data.remark,
          edit_education: res.data.education,
          edit_work: res.data.job_years,
          edit_phone: res.data.phone,
          edit_email: res.data.email,
          edit_city: res.data.city,         
          edit_province: res.data.province,
          edit_county: res.data.county,
          edit_avatarUrl: res.data.avatarUrl,
          edit_year: res.data.birth.slice(0, 7),
          
        })


      }

    })

  },
  //上传修改的数据并更新本地数据
  updateneslist:function(){
    console.log("本地存储mysey", this.data.loginG)
    var mysey =  this.data.loginG
    var that = this;
    //20180910 取消对地址 省 区的接入
    var datas = {
      "real_name": that.data.edit_name,
      "sex": that.data.edit_sex,
      "education": that.data.edit_education,
      "job_years": that.data.edit_work,
      "phone": that.data.edit_phone,
      "email": that.data.edit_email,
      //"province": that.data.edit_province,
      "city": that.data.edit_city,
     // "county": that.data.edit_county,
      "job_status": that.data.edit_state,
      "remark": that.data.edit_textarea,
      "header_img": that.data.edit_avatarUrl,
      "birth": that.data.edit_year + '-29T14:03:30.599Z',
    }
    that.cheeckUse();
    let result= common.IsEmpty(datas);
    if (!result){
      return false;
    }
     common.request('usercenter/update_userinfo',
      {
        params: datas,
        success: function (res) {
          console.log("上传修改的数据并更新本地数据", res)
          if (res.data.code==97){
            wx.showModal({
              content: '您的信息尚未填写完毕,或者您的信息填写错误，请重试！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
            return false ;
          }
          
          that.updatestrong();
        },
        fail: function () {
          //失败后的逻辑  
        },
       }, mysey)
  }
  ,//更新本地存储
  updatestrong: function (){
    let that = this
    var infos = new Object();
    infos.nickName = that.data.edit_name;
    infos.gender = that.data.edit_sex;
    infos.city = that.data.edit_city;
    infos.province = that.data.edit_province;
    infos.birth = that.data.edit_year + '-29T14:03:30.599Z'; 
    infos.county = that.data.edit_county;
    infos.education = that.data.edit_education;
    infos.email = that.data.edit_email;
    infos.job_status = that.data.edit_state;
    infos.job_years = that.data.edit_work;
    infos.phone = that.data.edit_phone;
    infos.province = that.data.edit_province;
    infos.remark = that.data.edit_textarea;
    infos.avatarUrl = that.data.edit_avatarUrl;
    
    wx.setStorage({
      key: "user",
      data: infos,
      success:function(res){
        console.log("更新本地存储", res)
        setTimeout(function () {
          //要延时执行的代码  
          wx.navigateBack({
            delta: 1
          })
        }, 500) //延迟时间 这里是1秒
      }
    })
  },
  openConfirm: function () {
    var that = this
    wx.showModal({
      title: '保存个人信息',
      content: '是否确定保存您的个人信息？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
          that.updateneslist()
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },

  //查询用
  cheeckUse:function(){
    let that = this;
    console.log("上传的信息")
      console.log("real_name", that.data.edit_name)
        console.log("sex", that.data.edit_sex)
          console.log("education", that.data.edit_education)
            console.log("job_years", that.data.edit_work)
              console.log("phone", that.data.edit_phone)
                console.log("email", that.data.edit_email)
                  //console.log( "province", that.data.edit_province,)
                    console.log("city", that.data.edit_city)
                     // console.log(  "county", that.data.edit_county,)
                        console.log("job_status", that.data.edit_state)
                          console.log("remark", that.data.edit_textarea)
                            console.log("header_img", that.data.edit_avatarUrl)
                              console.log( "birth", that.data.edit_year + '-29T14:03:30.599Z')
  }

})

