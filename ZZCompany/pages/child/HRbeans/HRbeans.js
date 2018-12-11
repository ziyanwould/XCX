const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')
const oppid = wx.getStorageSync('oppid')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeindex:-1,
    detailPay:0,
    list1:[
      {
        title:'50豆',
        name:'￥50.00',
        id:0
      },
      {
        title: '100豆',
        name: '￥100.00',
        id: 1
      },
      {
        title: '200豆',
        name: '￥200.00',
        id: 2
      }
    ],
    list2: [
      {
        title: '250豆',
        name: '￥250.00',
        id: 3
      },
      {
        title: '300豆',
        name: '￥300.00',
        id: 4
      },
      {
        title: '500豆',
        name: '￥500.00',
        id: 5
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
    //获取oppid 
    console.log("oppid", oppid)

    that.getmessage();
    that.getbeards()
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
  config(e){
    console.log(e.currentTarget.dataset.pay)
    let that  =this;
    console.log(e.currentTarget.id);
    that.setData({
      activeindex: e.currentTarget.id,
      detailPay: e.currentTarget.dataset.pay
    })
  },
  //获取列表消息
  getmessage(){
    let that = this;
    let list1 =[];
    let list2 = [];
    utils.post('api/order/recharge_goods_list', false, that.data.token).then((res) => {
//      console.log(res.rechargeList);//正确返回结果
      for (let i in res.rechargeList) {
        //console.log(i); //0,1,2,3
        if(i<3){
          list1.push(res.rechargeList[i])
        }else{
          list2.push(res.rechargeList[i])
        }
      }
      that.setData({
        list1: list1,
        list2: list2
      })
      console.log(list1, list2)
      //存储结束
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
      //reject()
    });
  },
  //获取猎聘豆
  getbeards(){
    let that = this;
    utils.post('usercenter/get_lp_fee', false, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      that.setData({
        Lp_fee: res.Lp_fee
      })
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
      //reject()
    });
  },
  // 支付
  pays(){

    let that = this;
    let detail = '建筑猎聘会员充值';
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
      if (that.data.activeindex==-1){
        wx.showToast({
          title: '请选择商品',
          icon: 'loading',
          duration: 1500
        });
        reject(false);
        return false ;
      }
      let datas= {
        code: that.data.code.code,
        //code:"bndfuhdu54545454",
        total_fee: that.data.detailPay*100,//精确到分
        product_id: that.data.activeindex,//商品ID
        count: 1,//数量
        roomid: 1,
        describe: `建筑猎聘-${detail}`//充值描述
      }


      // let formData = new Window.FormData();
      // formData.append('code', that.data.code.code)
    
    
      //datas.append("total_fee", that.data.code.code)
    
      console.log('paydatas', datas)
      utils.post1('Pay/pay.ashx', datas,that.data.token).then((res) => {
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