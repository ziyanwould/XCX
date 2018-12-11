// pages/detail/detail.js
let page = 1;
const app = getApp();
const utils = require('../../utils/util.js')
const Promise = require('../../utils/bluebird.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        current: 1,
        style: 0,
        ico: 'icon-mingpianjia',
        fn: 'gotobusinessCard'
      }, {
        name: "发布",
        current: 0,
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
      },
    ],
    seek: {
      fn: 'seek',
    }
    ,
    list: []


  },
  //各个跳转函数
  gotoCompanyIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  gotobusinessCard: function () {
    // wx.reLaunch({
    //   url: '/pages/detail/detail'
    // })
    return false;
  },
  gotopublish: function () {
    wx.reLaunch({
      url: '/pages/creation/creation'
    })
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
    page =1;
    var that = this;
    let isIphoneX = app.globalData.isIphoneX;
    that.setData({
      isIphoneX: isIphoneX
    });
    that.datalist();

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
    //请求函数
  datalist: function (messages = "玩命加载中") {
    var that = this;
    wx.showLoading({
      title: messages,
    });
    var list = that.data.list;

    // let setArr = ['刘婷婷', '吴军', '文瑜', '王毅', '何仙姑'];
    // if (list.length > 19) {
    //   wx.showToast({
    //     title: '到底了...',
    //     icon: 'loading',
    //     duration: 2000
    //   });

    // }
    // for (let i in setArr) {
    //   if (list.length > 19) {
    //     continue;//终止循环
    //   }
    //   //let sexs = (i+1) % 2 == 0 ?'男':'女';
    //   let lists = {
    //     fn: 'detail',
    //     sex: i % 2 == 0 ? '女' : '男',
    //     tille: i % 2 == 0 ? '土木工程师-注册岩土工程师' : '土木工程师-注册水利水电工程师',
    //     name: setArr[i],
    //     education: i % 2 == 0 ? '本科' : '硕士',
    //     birthday: i % 2 == 0 ? '32岁' : '28岁',
    //     experience: 1+i+'年',
    //     person: false

    //   }
    //   list.push(lists)
    // }
    // that.setData({
    //   list: list
    // });
    let code = {
      "type_id": 1,
      "pageIndex": page,
      "pageSize": 8
    }
 
    console.log("code", code)
    utils.post('api/resume/resume_list', code).then((res) => {
     
      console.log(res);//正确返回结果
      if (res.list == '') {
        wx.showToast({
          title: '到底了...',
          icon: 'loading',
          duration: 2000
        });
        return false;
      }
      for (let i in res.list) {
        console.log(res.list[i]);
        let lists = {
          fn: 'detail',
          tille: res.list[i].work,
          name: res.list[i].name,
          education: res.list[i].education,
          birthday: res.list[i].age,
          experience: res.list[i].jobexp,
          person: res.list[i].img,
          time: res.list[i].utime.substr(0, 10),
          resume_id: res.list[i].resume_id
        }
        if (res.list[i].sex == 0) {
          lists.sex = '男'
        } else if (res.list[i].sex == 1) {
          lists.sex = '男'
        } else if (res.list[i].sex == 2) {
          lists.sex = '女'
        } else {
          lists.sex = res.list[i].sex
        }
        ;
        list.push(lists)
      }
  
      that.setData({
        list: list
      });
      page++;
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

    
      // reject()
    });

    setTimeout(function () {
      wx.hideLoading();
    }, 800);
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 900)

  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    // wx.showNavigationBarLoading();
    let that = this;
    page=0;
    that.setData({
      list: []
    })
    that.datalist('刷新数据中')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    this.datalist()
  },
  detail(e) {
    //console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `/pages/child/PositionFrist/PositionFrist?id=${e.currentTarget.dataset.id}&type=全职`//全职简历
      // url:"/pages/child/Positionsecond/Positionsecond"   
    })
  },
  //搜索跳转
  seek(){
    wx.navigateTo({
      url: "/pages/child/Searchpage/Searchpage?permanent=2"//全职简历
      // url:"/pages/child/Positionsecond/Positionsecond"   
    })
  }
})