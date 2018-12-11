// pages/child/resume/resume.js
let page = 1;
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')

Page({
  data: {
    msgList: [

    ],
    height: 0,
    scrollY: true,
    activeIndex: 0,
    pageshows: true,
    used_list: [
      { title: "分类01", name: "已购买简历" },
      { title: "分类02", name: "已邀约人才" }
      // { title: "分类03", name: "求职者投递" },
    ],
    seekData: {
      inputShowed: false,
      inputVal: ""
    },


  },
  swipeCheckX: 35, //激活检测滑动的阈值
  swipeCheckState: 0, //0未激活 1激活
  maxMoveLeft: 80, //消息列表项最大左滑距离
  correctMoveLeft: 75, //显示菜单时的左滑距离
  thresholdMoveLeft: 75,//左滑阈值，超过则显示菜单
  lastShowMsgId: '', //记录上次显示菜单的消息id
  moveX: 0,  //记录平移距离
  showState: 0, //0 未显示菜单 1显示菜单
  touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
  swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
  onLoad: function (e) {
    var that = this;
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })
    console.log(e)
    if (e.collect){//这个是投递者投递过来的简历
      that.setData({
        send_id: e.ID,
        send_type: e.type,
        send_collect: e.collect
      })
      wx.setNavigationBarTitle({
        title: '投递的简历'
      })
    }
    page = 1;
    that.datalist()

    //var height = '100%';

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
    //console.log("删除操作", e.currentTarget.id);
    this.deleteResume(e.currentTarget.id)
    this.deleteMsgItem(e);
  },
  onDeleteMsgLongtap: function (e) {
    console.log(e);
  },
  onMarkMsgTap: function (e) {
    console.log(e);
    var index = this.getItemIndex(e.currentTarget.id);
    console.log("序号你", this.data.msgList[index].resume_id)
    var up = "msgList[" + index + "].status";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
    if (this.data.msgList[index].status == '公开') {
      this.setData({
        [up]: '保密'
      })
    } else {
      this.setData({
        [up]: '公开'
      })
    }
    this.setStates(this.data.msgList[index].resume_id)
    this.translateXMsgItem(e.currentTarget.id, 0, 600);
  },
  onMarkMsgLongtap: function (e) {
    console.log(e);
  },
  getItemIndex: function (id) {
    var msgList = this.data.msgList;
    for (var i = 0; i < msgList.length; i++) {
      if (msgList[i].resume_id == id) {
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
    var numberv = e.currentTarget.id;
    console.log("number", e.currentTarget.id);
    page=0;
    that.setData({
      msgList: [],
      numbers: numberv
      
    })
    that.datalist()
    // for (let i in that.data.msgList) {
    //   console.log("数据结构", that.data.msgList[i].type)
    //   if (numberv == 1 && that.data.msgList[i].type == "全职") {

    //     that.setData({
    //       pageshows: true
    //     })
    //   } else if (numberv == 2 && that.data.msgList[i].type == "兼职") {

    //     that.setData({
    //       pageshows: true
    //     })
    //   } else if (numberv == 0 && that.data.msgList.length > 0) {
    //     that.setData({
    //       pageshows: true
    //     })
    //   }
    // }

  },
  urlto: function (e) {
    let that = this;
    console.log("简历", e.currentTarget);
    console.log(that.data.send_type)
    //return false;
    if (that.data.numbers == 1) {
      wx.navigateTo({
         url: `/pages/child/PositionFrist/PositionFrist?id=${e.currentTarget.id}&type=全职`//全职简历
      })
    } else {
      wx.navigateTo({
         url: `/pages/child/PositionFrist/PositionFrist?id=${e.currentTarget.id}&type=兼职`//全职简历
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
    var setdata = {
      "resume_id": ids
    }
    // common.request('api/resume/set_status', {
    //   params: setdata,
    //   success: function (res) {
    //     console.log("设置简历信息", res)

    //   }
    // }, app.globalData.login)
  },
  //20180529 设置简历状态
  deleteResume: function (cd) {
    console.log(cd)
    var deletedata = {
      "resume_id": cd
    }
    // common.request('api/resume/delete', {
    //   params: deletedata,
    //   success: function (res) {
    //     console.log("删除简历信息", res)

    //   }
    // }, app.globalData.login)
  },
  showInput: function () {
    this.setData({
      'seekData.inputShowed': true,

    });
  },
  hideInput: function () {
    this.setData({
      'seekData.inputVal': "",
      'seekData.inputShowed': false,

    });
  },
  clearInput: function () {
    this.setData({
      'seekData.inputVal': ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      'seekData.inputVal': e.detail.value
    });
  },
  datalist: function (messages = "玩命加载中") {
    var that = this;
    wx.showLoading({
      title: messages,
    });
    var list = that.data.msgList;
    let url = '';
    let datas ={};
    that.setData({
      pageshows:true
    })
    //测试用start
    // let setArr = ['李文文', '吴碧勇', '何碧碧',  '迪迦','李雯'];
    // if (list.length>19) {
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
    //     area: i % 2 == 0 ? '广东佛山市' : '广东广州市',
    //     stats: i % 2 == 0 ? '资质' : '不限',
    //     pay: '面议',
    //     person: false

    //   }
    //   list.push(lists)
    // }
    // that.setData({
    //   list: list
    // });
    //测试end
    if (that.data.send_collect){//判断是否是职位管理下投递的简历
      url = 'api/resume/deliver_log_company',
      datas = {
        "ID": that.data.send_id,
        "type_id": `${that.data.send_type=='兼职'?0:1}`,
        "pageIndex": page,
        "pageSize": 10
      }
    }else{
      url = `${that.data.activeIndex == 0 ? 'api/resume/obtain_log' :'api/resume/invite_log'}`,
      datas = {
        "type_id": 0,
        "pageIndex": page,
        "pageSize": 10
      }
    }
    console.log(datas);
    utils.post(url,datas,that.data.token).then((res) => {
      console.log(res);//正确返回结果
      if (res.list == '') {
        wx.showToast({
          title: '到底了...',
          icon: 'loading',
          duration: 2000
        });
        that.setData({
          pageshows: false
        })
        return false;
      }
      for (let i in res.list) {
        console.log(res.list[i]);
        let lists = {
          fn: 'detail',
          //sex: i % 2 == 0 ? '女' : '男',
          tille: res.list[i].certificate.length == 0 ? res.list[i].title : `${res.list[i].certificate[0].fir_type_name}-${res.list[i].certificate[0].sec_type_name}`,
          name: res.list[i].name,
          area: res.list[i].certificate.length == 0 ? `${res.list[i].city}` : `${res.list[i].certificate[0].province}${res.list[i].certificate[0].city}`,
          stats: i % 2 == 0 ? '资质' : '不限',
          pay: res.list[i].wages == null ? `面议` : `${res.list[i].wages}`,
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
      wx.hideLoading();
      that.setData({
        msgList: list
      });
      page++;
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

      wx.hideLoading();
      // reject()
    });

    setTimeout(function () {
      wx.hideLoading();
    }, 800);
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 900)

  },
})
