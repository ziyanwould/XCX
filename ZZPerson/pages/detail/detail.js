// 下拉刷新内容
var common = require('../../utils/common.js');
//获取应用实例
var app = getApp();
var url = "https://www.imooc.com/course/ajaxlist";
var page = 1;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

// 请求数据  
var loadMore = function (that) {

  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn,



    },
    success: function (res) {
      //console.info(that.data.list);  
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;

    }
  });
}

var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {
    currentSize: 0,
    words: [],
    list: [],
    mydata: {
      seektype: "搜索公司"
    }
   
  },
  onLoad: function () {
    var that = this;
    //register.register(this);
    //获取words  
   // this.doLoadData(0, 10);
   
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },
  onShow:function(){
    var that = this;
    //v1.0版本没有数据
    this.V1_0();

    /*是否登录*/
    wx.getStorage({
      key: 'login',
      success: function (res) {

        if (res.data) {
          that.setData({
            key: true
          })
        }
      }
    })
    //判断个人登录情况
    that.identif();
  }
  ,
  doLoadData() {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    wx.request({
      url: url,
      data: {
        page: page,
        page_size: page_size,
        sort: sort,
        is_easy: is_easy,
        lange_id: lange_id,
        pos_id: pos_id,
        unlearn: unlearn
      },
      success: function (res) {
        //console.info(that.data.list);
         console.log("page值："+page)
         if(page>1){
           if (!that.data.key) {
             that.notMore()
             wx.hideLoading();
             register.loadFinish(that, true);
             console.log('登录成功！');
             return false;
           }else{
             if (!that.data.identif) {
               that.notMore();
               wx.hideLoading();
               register.loadFinish(that, true); 
               console.log('个人认证成功');
               return false;
             }
           }  
         }
        
        var list = that.data.list;
        for (var i = 0; i < res.data.list.length; i++) {
          list.push(res.data.list[i]);
        }
        that.setData({
          list: list
        });
        page++;
        wx.hideLoading();
        register.loadFinish(that, true);
        console.log(list);
      }
    });



  },
  //模拟刷新数据
  refresh: function () {

    this.setData({
      words: [],
      currentSize: 0
    });
    this.doLoadData();
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData();
  }
  , tapCompass:function () {
    wx.navigateTo({
      url: '/pages/child/CompanyPage/CompanyPage'//实际路径要写全
    })
  } 
  //搜索页路由跳转
  , seek: function () {
    wx.navigateTo({
      url: '/pages/child/grabble/grabble?permanent=1'//实际路径要写全
    })
  },
  //业务逻辑需求，未登录状态和未认证状态只能浏览20条信息
  notMore:function(){
    wx.showModal({
      content: '您的账号还未进行登录 或者登录后未完成认证，目前只能浏览20条公司信息。请进行相关操作后重试',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  //个人认证的情况
  identif: function () {
    var that = this;
    //console.log('value', value)
    try {
      var value = wx.getStorageSync('ident')
      console.log('value', value)
      if (value) {

        that.setData({
          identif: true
        })
        return false;
      } else {
        if (!that.data.key) {
          return false;
        }
        common.request('usercenter/query_verify_status', {
          success: function (res) {
            // 证书上传信息成功后操作
            console.log("认证状态中 认证成功 认真失败", res)
            if (res.data.data.status == 3) {
              try {
                that.setData({
                  identif: true
                });
                wx.setStorageSync('ident', true)
              } catch (e) {
              }
            }
          }
        }, app.globalData.login)
      }
    } catch (e) {
      // Do something when catch error

    }


  },
  V1_0: function () {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '该功能暂未开放，敬请期待！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
         
          that.tourl()
          
        }
      }
    });
  },
  tourl:function(){
    console.log('444456566')
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})