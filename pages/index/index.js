//index.js
//获取应用实例
const app = getApp()
import {
  loginWx
} from '../../utils/api.js'
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meto:"，欢迎您",
    bindPhone: false
  },
  onLoad: function () {
    //wx.showModal({
      //title: '提示',
      //content: '这是一个模态弹窗',
      //showCancel: false,
      //success(res) {
        //if (res.confirm) {
          //console.log('用户点击确定')
        //} else if (res.cancel) {
          //console.log('用户点击取消')
        //}
      //}
    //})
  },
  bindGetUserInfo:function(e){
    //console.log(e)
    let that = this
    wx.login({
      success: res => {
        //console.log(res.code)
        that.setData({
          code: res.code
        })
        let data = {
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          type:"0"
        }
        loginWx(data)
        .then(res=>{
          this.setToken(res)
        })
      }
    })
  },
  getPhoneNumber:function(e){
    console.log(e)
    let data = {
      wxId: this.data.wxId,
      code: this.data.code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      type:"1"
    }
    loginWx(data)
    .then(res => {
      this.setToken(res)
    })
  },
  setToken: function (res){
    console.log(res)
    if (res.statusCode=="0"){
      wx.setStorageSync("token", res.result)
      wx.navigateTo({
        url: '/pages/scan/scan',
      })
    }else if (res.statusCode == "ZC001"){
      this.setData({
        bindPhone: true,
        wxId: res.result.wxId
      })
    } else{
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
    }
  }
})
