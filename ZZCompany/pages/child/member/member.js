// pages/child/member/member.js
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        img1:'mber1',
        vip:'普通会员',
        pay:'5000/年',
        lists:[
          { img: 'mber3', text:'发布职位数量300条'},
          { img: 'mber4', text: '拥有邀约面试特权' },
          { img: 'mber5', text: '开通即赠送50000猎聘豆' },
          // { img: 'mber6', text: '下载简历300份' }
          
        ]
      },
      {
        img1: 'mber2',
        vip: '高级会员',
        pay: '10000/年',
        lists: [
          { img: 'mber3', text: '发布职位数量不限' },
          { img: 'mber5', text: '拥有邀约面试特权'  },
          { img: 'mber6', text: '开通即赠送100000猎聘豆' }

        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })

    console.log(app.globalData.userinfo)
    that.getmessage();
    that.getvip();
    that.commom()
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
  getmessage() {
    let that = this;
    utils.post('api/order/vip_goods_list', false, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      let datas = [
        {
          img1: 'mber1',
          vip: res.vipList[0].Name,
          pay: res.vipList[0].base_price,
          Product_Id:res.vipList[0].Product_Id,
          lists: [
            { img: 'mber3', text: `开通即赠送猎聘豆${res.vipList[0].Give_Lp_fee}` },
            { img: 'mber5', text: `可发布各类职位${res.vipList[0].Ext_public == 999999 ? "无限" : res.vipList[0].Ext_public}个` },
            { img: 'mber6', text: `下载简历${res.vipList[0].Full_max}份` }

          ]
        },
        {
          img1: 'mber2',
          vip: res.vipList[1].Name,
          pay: res.vipList[1].base_price,
          Product_Id: res.vipList[1].Product_Id,
          lists: [
            { img: 'mber3', text: `开通即赠送猎聘豆${res.vipList[1].Give_Lp_fee}` },
            { img: 'mber5', text: `可发布各类职位${res.vipList[1].Ext_public == 999999 ? "无限" : res.vipList[1].Ext_public}个` },
            { img: 'mber6', text: `下载简历${res.vipList[1].Full_max}份` }

          ]
        }
      ]
      that.setData({
      //会员价格列表
        list:datas
      })
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
      //reject()
    });
  },
  getvip() {
    let that = this;
      utils.post('usercenter/get_vip', false, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      that.setData({
        Etime_String: res.vip.Etime_String,
        vips: res.vip.Name
      })
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
      //reject()
    });
  },
  commom(){
    let that = this;
    let useinfo = app.globalData.userinfo;
    that.setData({
      nameCompany: useinfo.Company_Name,
      logo: useinfo.Company_Logo
    
    })
  },
    // 支付
  pays(e) {
    let that = this;
    let detail = '建筑猎聘会员充值';
    console.log(e)
    let price =e.target.dataset.pay;
    let ID = e.target.id;
   // return false
    if (price == 0 || price == null || price == undefined){
      wx.showToast({
        title: '价格不能为0',
        icon: 'loading',
        duration: 1500
      });
      return false
    }
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
        // return new Promise(step1)
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
      let datas = {
        code: that.data.code.code,
        //code:"bndfuhdu54545454",
        total_fee: price*100,//精确到分
        product_id: ID,//商品ID
        count: 1,//数量
        roomid: 1,
        describe: `建筑猎聘-${detail}`//充值描述
      }


      // let formData = new Window.FormData();
      // formData.append('code', that.data.code.code)


      //datas.append("total_fee", that.data.code.code)

      console.log('paydatas', datas)
      utils.post1('Pay/pay.ashx', datas, that.data.token).then((res) => {
        //console.log('支付', res);//正确返回结果
        that.setData({
          keys: res
        })
        resolve(true)
      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息

        reject()
      });

    }

    function step3(resolve, reject) {
      wx.requestPayment({
        'timeStamp': that.data.keys.timeStamp,
        'nonceStr': that.data.keys.nonceStr,
        'package': that.data.keys.package,
        'signType': that.data.keys.signType,
        'paySign': that.data.keys.paySign,
        'success': function (res) {
          resolve(res)
        },
        'fail': function (res) {
          reject(res)
        }
      })
    }
  }
})