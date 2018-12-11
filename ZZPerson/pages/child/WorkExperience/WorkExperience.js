// pages/child/WorkExperience/WorkExperience.js
var app = getApp();
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     company:"",
     position:"请输入",
     entrytime:"请选择",
     endtime:"至今",
     switchs:true,
     input:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    const self = app.globalData.ResumeFull;
    this.setData({
      info: app.globalData.ResumeFull,
    })
    if(options.type){
      this.setData({
        key: options.type,
        num: options.id,
        infoChild: self.workExperience[options.id],
        resumeId: self.resume_id,
        moben: self.workExperience[options.id].id,
        active: app.globalData.ResumeFull.expectWork.job_type_id
      })
    
      
   
    }else{
      this.setData({
        switchs:false,
        resumeId: self.resume_id,
        moben:0
      })
    } 
      //20180531
     //传递记录简历的ID和所在版块的ID
     
    //console.log(this.data.key,this.data.num,this.data.info)
    //console.log("testing", this.data.infoChild)
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
    /**跳转筛选 */
    var value = wx.getStorageSync('worktype')
    //console.log("携带回来的信息", value)   
    if (value) {
      this.setData({
        'position': value.value,
        'infoChild.post': value.value,
        'active': value.id//证书与职位才需要
      })
    }
    wx.removeStorageSync('worktype')
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
          //取消全局联动删除
          // //莫名是旧数据更新 赋值得到是错误
          // const her = 'info.workExperience';
          // var delInfo = (that.data.info.workExperience).splice(that.data.num, 1)
          // that.setData({
          //   [her]: that.data.info.workExperience
          // })
          
          // //更新全局变量方式 20180519
          // app.globalData.ResumeFull = that.data.info
          // typeof cb == "function" && cb(app.globalData.ResumeFull)
          // //更新全局变量结束 20180519
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
  },
  bindDateChange: function (e) {
    
    this.setData({
     endtime: e.detail.value,
     'infoChild.endTime': e.detail.value
    })
  },
  bindend: function (e) {
    this.setData({
      entrytime: e.detail.value,
      'infoChild.startTime': e.detail.value
    })
  },
  watchPassWord: function (event) {
    //console.log(event.currentTarget.dataset.self)
    //console.log(event.detail.value);
    const inputs = event.currentTarget.dataset.self;
    this.setData({
      [inputs]: event.detail.value
    })
    //console.log("替换后的值",this.data.info)
  },
  save:function(){
    var that = this;
    var that = this;
    console.log('infoChild', that.data.infoChild);

    if (that.data.moben != 0) {
      //修改板块
      var setdata = {
        "id": that.data.moben,
        "resume_Id": that.data.resumeId,
        "company_Name": that.data.infoChild.company,
        "project_Detail": that.data.infoChild.jobContent,
        "job_Type_Id": that.data.active,
        "start_Time": that.data.infoChild.startTime + "-29T14:03:30.599Z",
        "end_Time": that.data.infoChild.endTime + "-29T14:03:30.599Z"

      }
    } else {
      //新增板块

      var setdata = {
        "id": that.data.moben,
        "resume_Id": that.data.resumeId,
        "company_Name": that.data.company,
        "project_Detail": that.data.input,
        "job_Type_Id": that.data.active,
        "start_Time": that.data.entrytime + "-29T14:03:30.599Z",
        "end_Time": that.data.endtime + "-29T14:03:30.599Z"

      }
    }
    let result = common.IsEmpty(setdata);
    if (!result) {
      return false;
    }

    common.request('api/resume/save_jobexp', {
      params: setdata,
      success: function (res) {
        console.log("保存/新增工作经验", res)

      }
    }, app.globalData.login)
    if (that.data.switchs){

      //2018.5.31取消原来的全局保存
      // const you = "info.workExperience[" + this.data.num + "]";
      // this.setData({
      //   [you]: that.data.infoChild
      // })
     
    }else{

      //2018.5.31取消原来的全局新增
      // var newlist = {}
      // newlist.id = that.data.info.workExperience.length;
      // newlist.post = that.data.position;
      // newlist.company = that.data.company;
      // newlist.startTime = that.data.entrytime;
      // newlist.endTime = that.data.endtime;
      // newlist.jobContent = that.data.input;
     

      // var infos = (that.data.info.workExperience).push(newlist);
      // console.log(that.data.info.workExperience)
      // that.setData({
      //   'info.workExperience': that.data.info.workExperience
      // })
    }

    // //更新全局变量方式 20180519
    // app.globalData.ResumeFull = this.data.info
    // typeof cb == "function" && cb(app.globalData.ResumeFull)
    // //更新全局变量结束 20180519
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
    //对全局职位的筛选
  selectWork:function () {
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject?id=0'//实际路径要写全
    })
  },
  //20180529 保存/新增工作经验
  getResume: function () {

  },
  //删除此项目
  removex:function(){
    var that = this;
    var setdata={
      "id": that.data.moben,
      "resume_Id": that.data.resumeId,
    }
    common.request('api/resume/delete_jobexp', {
      params: setdata,
      success: function (res) {
        console.log("删除工作经验", res)

      }
    }, app.globalData.login)
  }
})