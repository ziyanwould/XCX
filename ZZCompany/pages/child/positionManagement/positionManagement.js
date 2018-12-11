//index.js
//获取应用实例
let page = 1;
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')

Page({
  data: {
    msgList: [],
    height: 0,
    scrollY: true,
    activeIndex: 0,
    pageshows: true,
    used_list: [
      { title: "分类03", name: "兼职" },
      { title: "分类02", name: "全职" },
    
    ]

  },
  swipeCheckX: 35, //激活检测滑动的阈值
  swipeCheckState: 0, //0未激活 1激活
  maxMoveLeft: 185, //消息列表项最大左滑距离
  correctMoveLeft: 175, //显示菜单时的左滑距离
  thresholdMoveLeft: 75,//左滑阈值，超过则显示菜单
  lastShowMsgId: '', //记录上次显示菜单的消息id
  moveX: 0,  //记录平移距离
  showState: 0, //0 未显示菜单 1显示菜单
  touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
  swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动


  onLoad: function () {
    let that = this;
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })

    //var height = '100%';
    that.getmessage();
    that.remain();
  },

  ontouchstart: function (e) {
    if (this.showState === 1) {
      this.touchStartState = 1;
      this.showState = 0;
      this.moveX = 0;
      this.translateXMsgItem(this.lastShowMsgId, 0, 200);
      this.lastShowMsgId = "";
      return;
    }
    this.firstTouchX = e.touches[0].clientX;
    this.firstTouchY = e.touches[0].clientY;
    if (this.firstTouchX > this.swipeCheckX) {
      this.swipeCheckState = 1;
    }
    this.lastMoveTime = e.timeStamp;
  },

  ontouchmove: function (e) {
    if (this.swipeCheckState === 0) {
      return;
    }
    //当开始触摸时有菜单显示时，不处理滑动操作
    if (this.touchStartState === 1) {
      return;
    }
    var moveX = e.touches[0].clientX - this.firstTouchX;
    var moveY = e.touches[0].clientY - this.firstTouchY;
    //已触发垂直滑动，由scroll-view处理滑动操作
    if (this.swipeDirection === 2) {
      return;
    }
    //未触发滑动方向
    if (this.swipeDirection === 0) {
      console.log(Math.abs(moveY));
      //触发垂直操作
      if (Math.abs(moveY) > 4) {
        this.swipeDirection = 2;

        return;
      }
      //触发水平操作
      if (Math.abs(moveX) > 4) {
        this.swipeDirection = 1;
        this.setData({ scrollY: false });
      }
      else {
        return;
      }

    }
    //禁用垂直滚动
    // if (this.data.scrollY) {
    //   this.setData({scrollY:false});
    // }

    this.lastMoveTime = e.timeStamp;
    //处理边界情况
    if (moveX > 0) {
      moveX = 0;
    }
    //检测最大左滑距离
    if (moveX < -this.maxMoveLeft) {
      moveX = -this.maxMoveLeft;
    }
    this.moveX = moveX;
    this.translateXMsgItem(e.currentTarget.id, moveX, 0);
  },
  ontouchend: function (e) {
    this.swipeCheckState = 0;
    var swipeDirection = this.swipeDirection;
    this.swipeDirection = 0;
    if (this.touchStartState === 1) {
      this.touchStartState = 0;
      this.setData({ scrollY: true });
      return;
    }
    //垂直滚动，忽略
    if (swipeDirection !== 1) {
      return;
    }
    if (this.moveX === 0) {
      this.showState = 0;
      //不显示菜单状态下,激活垂直滚动
      this.setData({ scrollY: true });
      return;
    }
    if (this.moveX === this.correctMoveLeft) {
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.id;
      return;
    }
    if (this.moveX < -this.thresholdMoveLeft) {
      this.moveX = -this.correctMoveLeft;
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.id;
    }
    else {
      this.moveX = 0;
      this.showState = 0;
      //不显示菜单,激活垂直滚动
      this.setData({ scrollY: true });
    }
    this.translateXMsgItem(e.currentTarget.id, this.moveX, 500);
    //this.translateXMsgItem(e.currentTarget.id, 0, 0);
  },
  onDeleteMsgTap: function (e) {

    console.log("删除操作", e.currentTarget.id);
    this.deleteResume(e.currentTarget.id)
    this.deleteMsgItem(e);
  },
  onDeleteMsgLongtap: function (e) {
    console.log(e);
  },
  onMarkMsgTap: function (e) {
    let  that = this;
    console.log(e);
    var index = this.getItemIndex(e.currentTarget.id);
    console.log("序号你", this.data.msgList[index].ID)
    var up = "msgList[" + index + "].Is_Public";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
    if (this.data.msgList[index].Is_Public != 1) {
      this.setData({
        [up]: 1
      })
      that.positionShow(1, e.currentTarget.id)
    } else {
      this.setData({
        [up]: 0
      })
      that.positionShow(0, e.currentTarget.id)
    }
    this.setStates(this.data.msgList[index].ID)
    this.translateXMsgItem(e.currentTarget.id, 0, 600);
  },
  onMarkMsgLongtap: function (e) {
    console.log(e);
  },
  getItemIndex: function (id) {
    var msgList = this.data.msgList;
    for (var i = 0; i < msgList.length; i++) {
      if (msgList[i].ID == id) {
        return i;
      }
    }
    return -1;
  },
  deleteMsgItem: function (e) {
    console.log(this.data.msgList)
    var animation = wx.createAnimation({ duration: 200 });
    animation.height(0).opacity(0).step();
    this.animationMsgWrapItem(e.currentTarget.id, animation);
    // var s = this;
    // setTimeout(function () {
    //   var index = s.getItemIndex(e.currentTarget.id);
    //   s.data.msgList.splice(index, 1);
    //   s.setData({ msgList: s.data.msgList});
    //   console.log("序号你", index)

    // }, 200);
    this.showState = 0;
    this.setData({ scrollY: true });
  },
  translateXMsgItem: function (id, x, duration) {
    var animation = wx.createAnimation({ duration: duration });
    animation.translateX(x).step();
    this.animationMsgItem(id, animation);
  },
  animationMsgItem: function (id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'msgList[' + index + '].animation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  animationMsgWrapItem: function (id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'msgList[' + index + '].wrapAnimation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  active: function (e) {
    var that = this;
    this.setData({
      activeIndex: e.currentTarget.id,
      pageshows: false
    })
    that.getmessage()
    var numberv = e.currentTarget.id;
    console.log("number", e.currentTarget.id);
    for (let i in that.data.msgList) {
      console.log("数据结构", that.data.msgList[i].type)
      if (numberv == 1 && that.data.msgList[i].type == "全职") {

        that.setData({
          pageshows: true
        })
      } else if (numberv == 2 && that.data.msgList[i].type == "兼职") {

        that.setData({
          pageshows: true
        })
      } else if (numberv == 0 && that.data.msgList.length > 0) {
        that.setData({
          pageshows: true
        })
      }
    }

  },
  urlto: function (e) {
    let  that  =this;
    console.log("简历", e.currentTarget);
    //return false;
    if (that.data.activeIndex == 1) {
      wx.navigateTo({
        url: '/pages/child/position/position?ID=' + e.currentTarget.id+'&type=全职',
      })
    } else {
      wx.navigateTo({
        url: '/pages/child/position/position?ID=' + e.currentTarget.id +'&type=兼职',
      })
    }

  },
  //20180529 获取简历列表
  getRwsume: function () {
    wx.showLoading({
      title: '拼命加载中',
    });
    var that = this;
    const usedata = {
      "pageIndex": 1,
      "pageSize": 30
    };
    var msgList = that.data.msgList
    // common.request('api/resume/get_list', {
    //   params: usedata,
    //   success: function (res) {
    //     console.log("获取简历列表", res.data.data.list);
    //     for (var i = 0; i < res.data.data.list.length; i++) {
    //       msgList.push(res.data.data.list[i])
    //     }

    //     //register.loadFinish(that, true);
    //     if (res.data.data.list.length == 0) {
    //       wx.showToast({
    //         title: '没有相关简历',
    //         icon: 'loading',
    //         duration: 2000
    //       });
    //       that.setData({
    //         pageshows: false
    //       })
    //     } else {
    //       that.setData({
    //         pageshows: true
    //       })
    //     }
    //     that.setData({
    //       msgList: msgList
    //     })
    //     setTimeout(function () {
    //       wx.hideLoading();
    //     }, 500)
    //   }
    // }, app.globalData.login)
    // console.log("获取简历列表1", that.data.msgList)



  },
  //20180529 设置简历状态
  setStates: function (ids) {
    console.log("显示",ids)
    var setdata = {
      "ID": ids
    }
    // common.request('api/resume/set_Is_Public', {
    //   params: setdata,
    //   success: function (res) {
    //     console.log("设置简历信息", res)

    //   }
    // }, app.globalData.login)
  },
  //20180529 设置简历状态
  deleteResume: function (cd) {
    console.log(cd)
   
    let that = this;
    let url = 'api/position/set_position_states';
    let datas = {
      "position_id": cd,//简历ID
      "del": 1,//1是删除
    };
    utils.post(url, datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果
     

      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

      //  reject()
    });
  },
  //获取信息列表
  getmessage(){
    let that = this;
    let url = '';
    let datas = {};
    if (that.data.activeIndex==0){
      url ='api/position/get_recruit_part_position'
    }else{
      url = 'api/position/get_recruit_full_position'
    }
    utils.post(url, datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      that.setData({
        msgList:res.list
      })
      if (res.list!=0){
        that.setData({
          pageshows: true
        }) 
      }

      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

      //  reject()
    });
  },
  //上架与取消上架
  positionShow(id,ids){
    console.log("上架消息",id,ids)
    let that = this;
    let url = 'api/position/set_position_states';
    let datas = {
      "position_id": ids,//简历ID
      "is_public": id,//0是公开，1是隐藏
    };
    utils.post(url, datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      //  reject()
    });
  },
  //刷新
  refresh(){
    let that = this;
    let url = '';
    let datas = {};
    utils.post(url, datas, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      that.setData({
        msgList: res.list
      })

      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

      //  reject()
    });
  },
  // 投递的简历
  collecting(e){
    let that = this;
    console.log(that.data.activeIndex)
    console.log(e.currentTarget.id);
    let url =''
    if (that.data.activeIndex==0){
      url = '/pages/child/resume/resume?ID=' + e.currentTarget.id + '&type=兼职&collect=true'
    }else{
      url = '/pages/child/resume/resume?ID=' + e.currentTarget.id + '&type=全职&collect=true'
    }
    wx.navigateTo({
      url: url,
    })
  },
  //获取剩余发布职位
  remain(){
    let that = this;
    utils.post('api/position/public_may', false, that.data.token).then((res) => {
      console.log("职位次数", res.count);//正确返回结果
      that.setData({
        jobNumber: `${res.count != 0 ? res.count:'无次数'}`
      })
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      //  reject()
    });
  }

})
