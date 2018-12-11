var common = require('../../../utils/common.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project: "",
    work: "请输入",
    startTime: "请选择",
    endTime: "请选择",
    input:null,
    switchs:true
    // major: ['大专', '本科', '硕士', '博士', '其他']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arrc = common.sjc();
    this.setData({
      startTime: arrc[1],
      endTime: arrc[1],
    })

    //逻辑编辑功能
    const self = app.globalData.ResumeFull;
    this.setData({
      info: app.globalData.ResumeFull,
    })
    if (options.type) {
      this.setData({
        key: options.type,
        num: options.id,
        infoChild: self.projectExperience[options.id],
        resumeId: self.resume_id,
        moben: self.projectExperience[options.id].id
      })
    } else {
      this.setData({
        switchs: false,
        resumeId: self.resume_id,
        moben: 0
      })
    }

    //console.log(this.data.key, this.data.num, this.data.infoChild)
    //end

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
   
    if (that.data.moben != 0) {
      var setdatas = {
        "id": that.data.moben,
        "resume_Id": that.data.resumeId,
        "start_Time": that.data.infoChild.startTime + "-29T14:17:27.682Z",
        "end_Time": that.data.infoChild.endTime + "-29T14:17:27.682Z",
        "project_Name": that.data.infoChild.projectName,
        "project_Detail": that.data.infoChild.projectContent

      }
    } else {

      var setdatas = {
        "id": that.data.moben,
        "resume_Id": that.data.resumeId,
        "start_Time": that.data.startTime + "-29T14:17:27.682Z",
        "end_Time": that.data.endTime + "-29T14:17:27.682Z",
        "project_Name": that.data.project,
        "project_Detail": that.data.input

      }
    }
    console.log(setdatas)
    let result = common.IsEmpty(setdatas);
    if (!result) {
      return false;
    }
    common.request('api/resume/save_projectexp', {
      params: setdatas,
      success: function (res) {
        console.log("保存/新增项目经历板块", res)

      }
    }, app.globalData.login)
    //20180601撤销全局修改
    // if (that.data.switchs) {
    //   const you = "info.projectExperience[" + this.data.num + "]";
    //   this.setData({
    //     [you]: that.data.infoChild
    //   })
    // } else {
    //   var newlist = {}
    //   newlist.id = that.data.info.projectExperience.length;
    //   newlist.projectName = that.data.project;
    //   newlist.role = that.data.work;
    //   newlist.startTime = that.data.startTime;
    //   newlist.endTime = that.data.endTime;
    //   newlist.projectContent = that.data.input;



    //   var infos = (that.data.info.projectExperience).push(newlist);
    //   //console.log(that.data.info.projectExperience)
    //   that.setData({
    //     'info.projectExperience': that.data.info.projectExperience
    //   })
    // }

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
          //2018061 取消全局删除按钮
          // //莫名是旧数据更新 赋值得到是错误
          // const her = 'info.projectExperience';
          // var delInfo = (that.data.info.projectExperience).splice(that.data.num, 1)
          // that.setData({
          //   [her]: that.data.info.projectExperience
          // })

          // //更新全局变量方式 20180519
          // app.globalData.ResumeFull = that.data.info
          // typeof cb == "function" && cb(app.globalData.ResumeFull)
          //更新全局变量结束 20180519
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
  ,
  //20180529 保存/新增项目经历板块
  getResume: function () {

  },
  removex: function () {
    var that = this;
    var setdata = {
      "id": that.data.moben,
      "resume_Id": that.data.resumeId,
    }
    common.request('api/resume/delete_projectexp', {
      params: setdata,
      success: function (res) {
        console.log("删除证书", res)

      }
    }, app.globalData.login)
  }
})