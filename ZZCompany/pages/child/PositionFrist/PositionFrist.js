// pages/child/PositionFrist/PositionFrist.js
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    explain:{
      explain:"情况说明"
    }
    , personMes:{
      switchde:true
    },
    datas:{
      buyType:'购买',
      fun:'payTo'
    },
    useinfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
  let that = this;
    let token = wx.getStorageSync('token')
    console.log("token",token)
    that.setData({
      token: token.login_token
    })
  console.log("mes",options)
    if (options.type=='全职'){
      that.setData({
        'explain.explain':"自我介绍",
        'personMes.switchde':false,
        'explain.fullTime':true,
         types:'全职',
         'datas.buyType':'邀约',
        'datas.fun':'payTo2'
      })
     
    }else{
      that.setData({
    
        types: '兼职',
      
      })
    }

    console.log(0==[])
   that.getinfo(options.id)
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

  // 
  getinfo(id){
    let that = this;
    let url = '';
    if (that.data.types=='全职'){
      url ='api/resume/full_detail_company'
    }else{
      url = 'api/resume/part_detail_company'
    }

    utils.post(url, {
      resume_id: id

    },that.data.token).then((res) => {
      utils.deleteEmptyProperty(res);
      if (that.data.types == '全职') {
        that.setData({
          'personMes.resumePart': res.ResumeFull,
          'explain.resumePart': res.ResumeFull,
          names: res.ResumeFull.is_collect,
          'datas.names': res.ResumeFull.is_collect,
        })
      } else {
        that.setData({
          'personMes.resumePart': res.resumePart,
          'explain.resumePart': res.resumePart,
          names: res.resumePart.is_collect,
          'datas.names': res.resumePart.is_collect
        })
      } console.log('res', res)
      if (that.data.types == '兼职' && res.resumePart.is_obtain){
         that.setData({
           'datas.buyType': '查看联系信息',
            busying:true
         })
      } 
     else if (that.data.types == '全职' && res.ResumeFull.is_invite){
        that.setData({
          'datas.buyType': '查看联系信息',
          busying: true
        })
      }
      if (that.data.types == '兼职' && res.resumePart.is_deliver) {
        that.setData({
          'datas.buyType': '查看联系信息',
          busying: true
        })
      }
      else if (that.data.types == '全职' && res.ResumeFull.is_deliver) {
        that.setData({
          'datas.buyType': '查看联系信息',
          busying: true
        })
      }
      console.log(res, that.data.explain);//正确返回结果
      wx.hideLoading();
      // that.setData({
      //   oppid: res.wx_openid
      // })

      //存储结束
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    //  reject()
    });
  },
  //收藏取消收藏
  shoucang(name='收藏'){
    if (!this.data.token) {
      utils.noLogon();
      return false;
    }
    let that = this;
    let url = '';
    if(!that.data.names){
      url ='api/resume/collect_resume'
    }else{
      url ='api/resume/remove_collect_Resume'
    }
    let token = wx.getStorageSync('token');

    utils.post(url, {
      resume_id: that.data.explain.resumePart.resume_id
    },token.login_token).then((res) => {
      console.log(res);//正确返回结果
      if (!that.data.names){
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 3000
        });
        that.setData({
          names:true,
          'datas.names': true
        })
      }else{
        wx.showToast({
          title: '移除收藏',
          icon: 'success',
          duration: 3000
        });
        that.setData({
          names: false,
          'datas.names': false
        })
      }
      
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      
      //  reject()
    });
  }
   ,
  clickshou(e){
    let that = this;

    if(that.data.mes){
      that.shoucang();
      that.setData({
        mes:false
      })

    }else{
      that.shoucang(false);
      that.setData({
        mes: true
      })
    }

  },
  //购买按钮
  payTo(){
    let that = this;
 
    if (!this.data.token){
     
      utils.noLogon()
    } else if (that.data.busying){
      that.setData({
        useinfo:true
      })
     }
     else{
      // wx.showToast({
      //   title: '暂不支持购买',
      //   icon: 'loading',
      //   duration: 3000
      // });
      that.patTime()
     }
  },
  payTo2() {
    let that = this;
    if (!this.data.token) {

      utils.noLogon()
    } else if (that.data.busying) {
      that.setData({
        useinfo: true
      })
    }else {
      // wx.showToast({
      //   title: '暂不支持购买',
      //   icon: 'loading',
      //   duration: 3000
      // });
      that.fullTime()
    }
  },
  //购买组件
   patTime(){
     let that = this;
     let datas = {
       "resume_id": that.data.explain.resumePart.resume_id,
       "Company_Id": "00000000-0000-0000-0000-000000000000" 
     }
     console.log('datas', datas)
     utils.requid('api/resume/obtain',datas,that.data.token).then((res) => {
       console.log(res);//正确返回结果
       if (res.data.message == "购买成功") {
         wx.showToast({
           title: '购买成功',
           icon: 'success',
           duration: 1500
         });
         that.setData({
           'datas.buyType': '查看联系信息',
           busying: true
         })
       }
       //resolve()
     }).catch((errMsg) => {
       console.log(errMsg);//错误提示信息
  
      
       //  reject()
     });
   },
  //邀约组件
  fullTime() {
    let that = this;
    let datas = {
      "resume_id": that.data.explain.resumePart.resume_id,
      "Company_Id": "00000000-0000-0000-0000-000000000000" 
    }
    console.log('datas', datas)
    utils.requid('api/resume/invite', datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      if (res.data.message == '邀约成功') {
        wx.showToast({
          title: '邀约成功',
          icon: 'success',
          duration: 1500
        });
        that.setData({
          'datas.buyType': '查看联系信息',
          busying: true
        })
      }
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
  
      //  reject()
    });
  },
  //关闭个人信息
  hrclose(){
    this.setData({
      useinfo:false
    })
  }
})