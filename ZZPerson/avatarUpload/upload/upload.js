import WeCropper from '../../we-cropper/we-cropper.js'
var common = require('../../utils/common.js');
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
var app = getApp()

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        //  获取到裁剪后的图片 下放上传成功后执行
        // wx.redirectTo({
        //   url: `/pages/child/resume/resume?avatar=${avatar}`
        // })
        const avatars = avatar
        /**上传图片啦啦啦啦 */
        wx.getStorage({
          key: 'login',
          success: function (res) {
            const mysey = res.data
            console.log("login成功进行传图片", res.data)

            wx.uploadFile({
              url: app.globalData.url+'usercenter/upload_img', //仅为示例，非真实的接口地址
              filePath: avatars,
              name: 'file',
              header: {
                'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
                'login_token': mysey
              },
              success: function (res) {
                //图片格式不对字符串切换
                var obj = JSON.parse(res.data)
                console.log("res", res)
                console.log("obj", obj.imgs[0])
                // var data = res.data.substring(2);
                // data = data.slice(0, -2);
                common.request('usercenter/change_header_img', {
                  params: {
                    "header_img": obj.imgs[0]
                  },
                  success: function (res) {
                    console.log("更新图片效果", res)
                     //更新信息
                    common.getinst(mysey);
                  
                  }
                }, mysey)
                //console.log("上传图片的结果", data,res)
                //  获取到裁剪后的图片

                //取消原来的简历详情页跟换图片方式
                // wx.redirectTo({
                //   url: `/pages/user/user?avatar=${avatars}`
                // })

                 setTimeout(function(){
                   wx.switchTab({//tab只能用这种跳转方式
                     url: '/pages/user/user'
                   })
                 },100)
              }


            })
          }
          , fail: function (res) {
            mysey = null,
              console.log("login失败", res.data)
          }
        })
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {
    const { cropperOpt } = this.data

    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})
