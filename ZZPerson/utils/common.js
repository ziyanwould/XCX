var Promise = require('./bluebird.min.js');
const URL = 'https://api.17liepin.com/';
function sjc() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours();
  //分  
  var m = date.getMinutes();
  //秒  
  var s = date.getSeconds();

  //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  

  return [Y - 50 + "-" + M, Y + "-" + M,Y];
};
//获取页面高度
function tanchu(){
  var height =0;
  console.log('onLoad')
  var that = this
  wx.getSystemInfo({
    success: function (res) {
    height=res.windowHeight
    }
  })
  return height;
};

function SomeThing(api){
  wx.navigateTo({
    url: api 
  })
  
};



//封装请求
var requestHandler = {
  params: {},
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  },
};

function request(url, requestHandler,token) {
  //注意：可以对params加密等处理  
  var params = requestHandler.params;
  //获取登录钥匙
   wx.request({
          url: URL+url,
          data: params,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header 
          header: {
            'content-type': 'application/json',
            'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
            'login_token': token
          },
          success: function (res) {
            //注意：可以对参数解密等处理  
            requestHandler.success(res)
          },
          fail: function () {
            requestHandler.fail()
          },
          complete: function () {
            // complete  
          }
        })
};

/**获取基本信息及更新初始化 */
function getinst(token)  {
  request('usercenter/get_userinfo',
    {
      success: function (res) {
        //deleteEmptyProperty(res)
        console.log("获取服务器关于账号的基本信息", res)
        if (res.data.message=="未登录"){
          return false;
        }
        setintuse(res,token);
      },
      fail: function () {
        //失败后的逻辑  
      },
    }, token)
}

//更新信息
function setintuse(datas, token){
  let info = datas.data.data.userinfo;
  console.log("服务器信息",info)
  if (info.real_name){
    console.log("进入跟新服务器信息")
    var infos = new Object();
    infos.verify_status = info.verify_status;
    infos.gender = info.sex;
    infos.remark = info.remark;
    infos.education = info.education;
    infos.job_status = info.job_status;
    infos.birth = info.birth;
    infos.province = info.province;
    infos.nickName = info.real_name;
    infos.reg_time = info.reg_time;
    infos.job_years = info.job_years;
    infos.city = info.city;
    infos.phone = info.phone;
    infos.avatarUrl = info.header_img;
    infos.county = info.county;
    infos.email = info.email;

    wx.setStorage({
      key: "user",
      data: infos
    })

     
  }else{
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log("获取本地user信息",res)
        
        var datas = {
          "header_img": res.data.avatarUrl,
          "real_name": res.data.nickName,
          "sex": `${res.data.gender==2?'女':'男'}`,
          "birth": "2018-06-21T08:54:11.398Z",
          "education": "",
          "job_years": "1年",
          "phone": "",
          "email": "",
          "province": res.data.province,
          "city": res.data.city,
          "county": "",
          "job_status":"我是应届毕业生",
          "remark": "欢迎您来到建筑猎聘！"
          
        }
        //本地消息
        var lost ={
        avatarUrl: res.data.avatarUrl,
        birth: "2018-06-21 00:00:00",
        city: res.data.city,
        gender: `${res.data.gende == 2 ? '女' :'男'}` ,
        job_status: "我是应届毕业生",
        job_years: "1年",
        nickName: res.data.nickName,
        province: res.data.province,
        reg_time: "2018-06-22 17:23:19",
        remark: "欢迎您来到建筑猎聘！",
   
        }
       
       
        
       

        request('usercenter/update_userinfo',
          {
              params: datas,
              success: function (res) {
              console.log("提交信息给服务器结果", res)
                wx.setStorage({
                key: "user",
                data: lost
              })

            },
            fail: function () {
              //失败后的逻辑  
            },
          }, token)
     
      }
      , fail: function () {
        var datas = {
          "header_img": "http://www.liujiarong.top/WX/notLogin.png",
          "real_name": "猎聘用户",
          "sex": "男",
          "birth": "2018-06-21T08:54:11.398Z",
          "education": "",
          "job_years": "1年",
          "phone": "",
          "email": "",
          "province": "广东",
          "city": "广州",
          "county": "",
          "job_status": "我是应届毕业生",
          "remark": "欢迎您来到建筑猎聘！"

        }

         //本地消息
        var lost ={
        avatarUrl: "http://www.liujiarong.top/WX/notLogin.png",
        birth: "2018-06-21T08:54:11.398Z",
        city: "广州",
        gender: "男",
        job_status: "我是应届毕业生",
        job_years: "1年",
        nickName: "猎聘用户",
        province: "广东",
        reg_time: "2018-06-22 17:23:19",
          remark: "寄欢迎您来到建筑猎聘！",
   
        }

        request('usercenter/update_userinfo',
          {
            params: datas,
            success: function (res) {
              console.log("提交信息给服务器结果", res)
              wx.setStorage({
                key: "user",
                data: lost
              })

            },
            fail: function () {
              //失败后的逻辑  
            },
          }, token)

      
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，你可以在本页面授权按钮继续授权，否则将用默认信息代替你的个人信息,可编辑修改。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')


            }
          }
        })
      }
    })
 

  }
  

}

//设置渲染用户信息界面
function setStronguser (myevent){
  wx.getStorage({
    key: 'user',
    success: function (res) {
      myevent.success(res)
      console.log("渲染用户信息this.data里", res)
  
    }
    , fail: function () {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，你可以在本页面授权按钮继续授权，否则将用默认信息代替你的个人信息,可编辑修改。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  })
}

//异步处理方案 
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//获取oppid 
function geToppid(infoOppid){
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求    
        console.log("发起网络请求", res.code)
        //that.globalData.openid = res.code
        wx.request({
          url: URL+'api/common/get_wx_openid',
          header: {
            'content-type': 'application/json',
            'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
          },
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (event) {
           infoOppid.success(event)

            // console.log(event.data.data.wx_openid)
            // wx.setStorage({
            //   key: "openId",
            //   data: event.data.data.wx_openid
            // });

            // //更新全局变量方式 20180515
            // _this.globalData.oppenid = event.data.data.wx_openid
            // typeof cb == "function" && cb(that.globalData.oppenid)
            // //更新全局变量结束 20180515
          }

        })

      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}

 //格栅化字符串无效值
function deleteEmptyProperty(object) {
  for (var i in object) {
    var value = object[i];
    // sodino.com
    // console.log('typeof object[' + i + ']', (typeof value));
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i];
          console.log('delete Array', i);
          continue;
        }
      }
      deleteEmptyProperty(value);
      if (isEmpty(value)) {
        console.log('isEmpty true', i, value);
        delete object[i];
        console.log('delete a empty object');
      }
    } else {
      if (value === '' || value === null || value === undefined) { 
      // if (value === null) {20180625暂时取消
        delete object[i];
        console.log('delete ', i);
      } else {
        console.log('check ', i, value);
      }
    }
  }
}
function isEmpty(object) {
  for (var name in object) {
    return false;
  }
  return true;
}

/**时间格栅化 */
function timeFat(time) {

  let month = time.substring(5, 7);
  let day = time.substring(8, 10);
  let comTime = time.substring(11, 16);
  let endTime = month + '月' + day + '日 ' + comTime;
  return endTime;
}
function getRad(d) {
  var PI = Math.PI;
  return d * PI / 180.0;
}
//计算两个经纬度距离
function getDistance(lat1, lng1, lat2 = 23.099364, lng2 = 113.297425) {
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);
  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);
  var s, c, w, r, d, h1, h2;
  var a = 6378137.0;//The Radius of eath in meter.   
  var fl = 1 / 298.257;
  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;
  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;
  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  s = s / 1000;
  s = s.toFixed(2);//指定小数点后的位数。   
  return s;
}
//判断对象里是否有空值
const IsEmpty = (obj, showT='您有未填项') => {

  let pdf = false;
  for (let i in obj) { // 如果不为空，则会执行到这一步，返回true
    console.log("数据", obj[i])
    if (obj[i] == undefined || obj[i] == '' || obj[i] == null || obj[i] == '请选择' || obj[i] =='string' ) {
      if (obj[i]!=0){
        pdf = false;
        wx.showToast({
          title: showT,
          icon: 'loading',
          duration: 1500
        });
        break;
      }else{
        pdf = true
      }
  
    } else {
      pdf = true
    }

  }
  return pdf // 如果为空,返回false
  //   if (Object.keys(obj).length === 0 || Object.keys(obj) == undefined || Object.keys(obj)==null) {
  //     return false // 如果为空,返回false
  //   }
  //   console.log(Object.keys(obj))
  //   return true // 如果不为空，则会执行到这一步，返回true
}

module.exports = {
  //要引用的函数 xx:xx
  sjc: sjc,
  tanchu: tanchu,
  SomeThing: SomeThing,
  request: request,
  getinst: getinst,
  setStronguser: setStronguser,
  wxPromisify: wxPromisify,
  geToppid: geToppid,
  deleteEmptyProperty: deleteEmptyProperty,
  setintuse: setintuse,
  timeFat:timeFat,
  getDistance:getDistance,
  IsEmpty: IsEmpty
}
