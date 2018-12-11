// pages/child/grabble/grabble.js
var common = require('../../../utils/common.js');
const app = getApp();
var pageIndex = 0;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    historys: [],
    enjoy: [
      { name: "建造师" },
      { name: "前端开发工程师" },
      { name: ".net后端工程师" },
      { name: "UI设计师" },
      { name: "SEO工程师" },
      { name: "开发产品经理" },
    ],
    used_list: [
      { title: "分类01", name: "用证地址" },
      { title: "分类02", name: "证书类别" }
  
    ],
    used_lists: [
      { title: "分类01", name: "公司地址" },
      { title: "分类02", name: "职位类别" }

    ],
    searchList:[
      // { name: "造价师" },
      // { name: "广东省独资公司" },
      // { name: "价格" },
      // { name: "其他" },
      // { name: "其他2" },
    ], 
    companys: "中住71",
    label: "50-150人/移动互联网/建筑/设计/教育",
    attestation: "http://www.liujiarong.top/WX/certified.png",
    types: "http://www.liujiarong.top/WX/popCompass.png",
    companyPerson: "http://www.liujiarong.top/WX/pending.png",
    history: "85664",
    counturl: "http://www.liujiarong.top/WX/Comup.png",
    city:"广州",
    pageShow:true,
    pageshows:true,
    Fbutton:"取消",
    count:"",
    selectD:true ,
    gps:true,
    selected:true,
    selectType:'',
    changeJob:"兼职",
    company: true,
    xuhao:-1,
    otherNumber:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.permanent==1){
      that.setData({
      company:false,
      changeJob:"公司"
      })
    } else if (options.permanent == 2){
       that.setData({
         changeJob: "全职",
       })
    }
    //console.log("254545", app.globalData.Jobl, app.globalData.CRL)
    this.setData({
      Jobl: app.globalData.Jobl,//工作列表
      CRL: app.globalData.CRL//证书列表
    })
   
   //使用本地存储功能
    wx.getStorage({
      key: 'SeaHistory',
      success: function (res) {
       that.setData({
         historys:res.data
       })
      }
    });

 

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
    var that = this;
    wx.getStorage({
      key: 'gabbleCity',
      success: function (res) {
        console.log(res.data)
        that.setData({
          'used_list[0].name': res.data.select_city,
          list:[],
          selectCityle: res.data.select_city
        })
        console.log("序号值",that.data.xuhao)//修复在选择地址不能同时进行职位类别，证书类别下的赛选
        if (that.data.changeJob == '兼职' && that.data.xuhao>0) {
          var city  = {
            "city": res.data.select_city,
            "ger_type_id": that.data.xuhao
          }
        } else if (that.data.changeJob == '全职' && that.data.xuhao > 0){
          var city  = {
            "city": res.data.select_city,
            "job_type_id": that.data.xuhao
          }
        }else{
          var city = {//let 连if的作用域都出不去
            "city": res.data.select_city,
          }
        }
      
        pageIndex=1;
        that.getInfo(city)
        wx.removeStorage({
          key: 'gabbleCity',
          success: function (res) {
         
          }
        })
      }
    })

    //状态判断
    if (this.data.selected!=true){
      this.setData({
        activeIndex: 1,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      selected: true,
      activeIndex: -1,
    
    })
    console.log("页面已经隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("页面已经页面卸载")
    var that = this
    wx.setStorage({
      key: "SeaHistory",
      data: that.data.historys
    }) 
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
     wx.showNavigationBarLoading();
     pageIndex = 1;
     that.setData({
       list:[]
     })
     that.getInfo()
     wx.hideNavigationBarLoading();
     wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getInfo();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  ,
  jumpCity: function (event) {

    wx.navigateTo({
      url: "/pages/child/citySelect/citySelect"
    })
  },
  active: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
    if(e.currentTarget.id==1){
      this.setData({
        selected: false
      })
    }else{
      wx.navigateTo({
        url: '/pages/child/citySelect/citySelect?other=usecity'//实际路径要写全
      })
      this.setData({
        activeIndex: -1
      })
    }
    
  
  },
  actives: function (e) {
    console.log(e.currentTarget.dataset.value)
    console.log("序号来着", e)
    this.setData({
      xuhao: e.currentTarget.id,
      selectType: e.currentTarget.dataset.value
    })
  
    if (this.data.selectCityle){
      var useCity = this.data.selectCityle
    }else{
      var useCity = ''
    }
    if (this.data.changeJob=='兼职'){
      var cityd = {
        "city": useCity,
        "ger_type_id": e.currentTarget.id
      }
    }else{
      var cityd = {
        "city": useCity,
        "job_type_id": e.currentTarget.id
      }
    }
    this.setData({
      nextSelct: cityd
    })
  },
  selectClick:function(){
    if(this.data.selectType==''){
      wx.showModal({
        title: '温馨提示',
        content: '您并没有选中任何类别',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      this.setData({
        list:[]
      })
      this.getInfo(this.data.nextSelct)
    }
    this.setData({
      selected:true,
      activeIndex:-1,
      //xuhao: -1,隐藏后可以保持所选记录
    })
  },
  watchPassWord: function (event) {
    var that = this;
    var changdu = event.detail.value.length;
    var changdu2 = that.data.count.length;
    console.log("修改时候变动的信息", changdu, changdu2)
    this.setData({
      count: event.detail.value.replace(/\s+/g, '')
    })
    that.keywordAdvice(event.detail.value);
    // if (changdu > 0 && changdu2>0){//原来的连动规则改变
    if (changdu > 0) {
        that.setData({
        Fbutton: '完成',
         selectD: false,
         pageShow: true,
         gps: true
    })
    }else{
      that.setData({
        Fbutton: '取消',
        selectD: true ,
        gps: true
       
      })
    }
    // that.setData({
    //   city: res.data.select_city,
    // })
    console.log(event.detail.value);
   
  }, 
  urlTime:function(event){
    var that = this;
    var flage =that.data.Fbutton;
    if (flage=="完成"){
     
      that.setData({
        pageShow: false,
        gps:false,
        selectD:true,
        list:[]
      })
      pageIndex = 1;
      that.getInfo()
    //监测输入后得到值 并存入本地变量 历史搜索
   console.log('搜索值',that.data.count);
   var self = that.data.historys;
   self.unshift(that.data.count); 
   self = that.dedupe(self)
   //console.log('更新后历史记录', self)
   that.setData({
     historys: self
   })
   // 历史搜索结束 
    }else{
      wx.navigateBack({ changed: true });//返回上一页  
    }
  }, 
  remove:function(){
    this.setData({
      historys: []
    })
  }
  , gitval:function(event){
    var that = this;
    console.log(event.currentTarget.dataset.val);
    //收索历史记录
    var self = that.data.historys;
    self.unshift(event.currentTarget.dataset.val); 
    self = that.dedupe(self)
    //收索历史记录end
    this.setData({
       count: event.currentTarget.dataset.val,
       Fbutton: '完成',
       pageShow: false,
       gps: false,
       selectD:true,
       historys: self,
       list:[]
    })
    pageIndex = 1;
    that.getInfo()
  }, 
  open: function () {
    var that = this;
    var oldword = that.data.changeJob//监听旧的关键字
    if (that.data.company){
      wx.showActionSheet({
        itemList: ['兼职', '全职'],
        success: function (res) {
          if (!res.cancel) {

            if (res.tapIndex == 0) {
              that.setData({
                changeJob: "兼职"
              })
            } else {
              that.setData({
                changeJob: "全职"
              })
            }

            if (that.data.changeJob != oldword)//当职位发生变更时 进行二次菜单类别的清零
              {
              that.setData({
                xuhao:-1,
                list:[]
              })
              console.log("执行清零动作");
              }
          }
        }
      });
    }else{
     
    }
  
  }
  , clickMCity:function(){
    wx.navigateTo({
      url: "/pages/AboutCompany/AboutCompany"
    }) 
  }
  ,dedupe:function(array){
    var old = array.slice(0, 6);
    return Array.from(new Set(old));
  }
  ,
  Noselect:function(){
    this.setData({
      selected:true,
      activeIndex: -1,
      xuhao:-1,
    })
  },
  //关键字云浮动提示
  keywordAdvice:function(value){
    var that =this;
    if (that.data.changeJob=='全职'){
      var urlx = app.globalData.url+'sort/search_job_type'
    }else{
      var urlx = app.globalData.url+'sort/search_ger_type'
    }
    let requestPromisified = common.wxPromisify(wx.request);
      requestPromisified({
        data: {
          "key": value,
        },
        url: urlx,
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
        },
      }).then(res => {
        console.log('获取到关联列表', res)
        if (res.data.data.list){
          that.setData({
            searchList: res.data.data.list
          });
        }
      })
  },
  //按下完成和地址，类别请求到的结果
  getInfo:function(otherValue){
    if (otherValue) {
      pageIndex = 0;
    }
    wx.showLoading({
      title: '玩命加载中',
    });

    var that = this;
    if (that.data.changeJob == '全职') {
      var urlx = app.globalData.url+'api/position/get_full_list';
      var datax ={
        "pageIndex": pageIndex,
        "pageSize": 10,
        //"job_type_id": null,
        // "province": "",
        // "city": "",
        // "county": "",
        "key": that.data.count,
        // "wages": "",
        // "job_exp": "",
        // "education": ""
      }
      if (otherValue) {
        
         datax = Object.assign(datax, otherValue)
      }
      console.log("data的内容：", datax)
    } else {
      var urlx = app.globalData.url+'api/position/get_part_list';
      var datax = {
        "pageIndex": pageIndex,
        "pageSize": 10,
        // "ger_type_id": null,
        // "province": "",
        // "city": "",
        // "county": "",
        "key": that.data.count
      }
      if (otherValue){
        pageIndex = 0;
         datax = Object.assign(datax, otherValue)
      }
      console.log("data的内容：", datax)
    }
    let requestPromisified = common.wxPromisify(wx.request);
    requestPromisified({
      data: datax,
      url: urlx,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
      },
    }).then(res => {
      console.log('获取到职位列表', res)
      var list = that.data.list;
      for (var i = 0; i < res.data.data.positions.length; i++) {
        res.data.data.positions[i].Utime = common.timeFat(res.data.data.positions[i].Utime);
        if ((res.data.data.positions[i].Position_Title).length > 13)
          res.data.data.positions[i].Position_Title = (res.data.data.positions[i].Position_Title).substring(0, 14) + '...';
        list.push(res.data.data.positions[i]);

      
      }
    
      if (res.data.data.positions.length==0){
        that.setData({
        pageshows:false 
         });
        if (that.data.list.length>0) {
          that.setData({
            otherNumber: true
          })

        }
      }else{
        that.setData({
          pageshows: true
        });
      }
      that.setData({
        list: list
      });
      pageIndex++;
     
      setTimeout(function(){
        wx.hideLoading();
      },500)
      //register.loadFinish(that, true);
      if (res.data.data.positions.length == 0) {
        wx.showToast({
          title: '没有相关职位',
          icon: 'loading',
          duration: 2000
        });
      }
    })
  },
  tapCompass: function (e) {
    var that = this;
    //console.log(e.currentTarget.dataset.counts);
    //console.log(e.currentTarget.dataset.counts.ID);
    var id = e.currentTarget.dataset.counts.ID;
    const jobs = that.data.changeJob;


    //获取详情页信息   使用Promise进行异步流程处理
    if (jobs == "兼职") {
      var urls = app.globalData.url+'api/position/get_part_detail';
     

    } else {
      var urls = app.globalData.url+'api/position/get_full_detail';
    

    }

    let requestPromisified = common.wxPromisify(wx.request);
    requestPromisified({
      data: { "position_id": id },
      url: urls,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
      },
    }).then(res => {
      console.log('获取点击的详情的内容', res)
      if (res.data.data.detail.job_sec_type) {
        //var mycode = (res.data.data.detail.job_sec_type).slice(0, 1);
        var jobx = "全职"
      } else {
        // var mycode = (res.data.data.detail.certificate["0"].sec_type_name).slice(0, 1);
        var jobx = "兼职"
      }
      /**字符串时间格式化 for组 */
      for (let i in res.data.data.detail.recommend) {
        res.data.data.detail.recommend[i].Utime = common.timeFat(res.data.data.detail.recommend[i].Utime);
        if ((res.data.data.detail.recommend[i].Position_Title).length > (app.globalData.deleTitle - 1))
          res.data.data.detail.recommend[i].Position_Title = (res.data.data.detail.recommend[i].Position_Title).substring(0, app.globalData.deleTitle) + '...';

      }
      wx.setStorageSync('jobx', jobx);
      wx.setStorageSync('childs', res.data.data.detail)
      // that.setData({
      //   seachKey: mycode
      // })
    }).then(res => {
      console.log('列表的关键字:', that.data.seachKey);
      //  that.second()
      wx.navigateTo({
        url: '/pages/child/part-timeJob/part-timeJob'//实际路径要写全
      })
    })




  }
})  