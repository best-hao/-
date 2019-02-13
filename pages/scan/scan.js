// pages/scan/scan.js
const app = getApp();
import {
  getShop,
  loginWx,
  getCommodity,
  getMedicine
} from "../../utils/api.js"
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bindPhone: false,
    getInfo:false,
    poverIs:false,
    userInfo: {},
    addressurl:"../../images/icon_dingwei.png",
    scanIcon: "../../images/icon_scan.png",
    phoneNumber:wx.getStorageSync("phone"),
    address:"",
  },
  onLoad: function (options) {
    let that = this
    this.getAddress()
    if (wx.getStorageSync("token")){
      console.log("~~~~~~~已登录")
    }else{
      console.log("~~~~~~~未登录")
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log(res)
                let user = res
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                wx.login({
                  success: res => {
                    let data = {
                      code: res.code,
                      encryptedData: user.encryptedData,
                      iv: user.iv,
                      type: "0"
                    }
                    console.log(data)
                    loginWx(data)
                      .then(res => {
                        this.setToken(res)
                      })
                  }
                })
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }else{
            this.setData({
              getInfo: true,
              poverIs: true
            })
          }
        }
      })  
    }
  },
  scan:() =>{
    let that = this
    wx.scanCode({
      success:(res)=>{
        console.log(res)
        that.setData({
          code:res
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })    
  },
  toEntry:()=>{
    wx.navigateTo({
      url: '../entry/entry',
    })
  },
  toAddress: () => {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  toShopcar: () => {
    wx.navigateTo({
      url: '../shopcar/shopcar',
    })
  },
  toOrder: () => {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  toBindPhone:function(){
    wx.navigateTo({
      url: '../bindPhone/bindPhone?wxId=' + this.data.wxId + '&nickName=' + this.data.nickName,
    })
  },
  bindGetUserInfo: function (e) {
    //console.log(e)
    wx.login({
      success: res => {
        let data = {
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          type: "0"
        }
        loginWx(data)
          .then(res => {
            this.setToken(res)
          })
      }
    })
  },
  setToken: function (res) {
    console.log(res)
    if (res.statusCode == "0") {
      wx.setStorageSync("token", res.result)      
      this.setData({
        bindPhone: false,
        getInfo: false,
        poverIs: false
      })
    } else if (res.statusCode == "ZC001") {
      this.setData({
        bindPhone: true,
        wxId: res.result.wxId,
        nickName: res.result.nickName,
        getInfo: false,
        poverIs: true,
        bindPhone: true
      })
    } else {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      this.setData({
        bindPhone: false,
        getInfo: false,
        poverIs: false
      })
    }
  },
  isLife: function (code) {
    let isLife = code.indexOf("life")
    if (isLife == 0) {
      console.log("----life")
      getCommodity({ barcode: this.data.code })
        .then(res => {

        })
    } else {
      console.log("----medicine")
      getMedicine({ barcode: this.data.code })
        .then(res => {

        })
    }
  },
  getAddress:function(){
    getShop({lat:"35.489935",lng:"112.865387"})
    .then(res=>{
        this.setData({
          address:res.result.busName
        })
        wx.setStorageSync("busNo", res.result.busNo)
        wx.setStorageSync("busName", res.result.busName)
    })
  }
})