// pages/bindPhone/bindPhone.js
import { 
  getRegMobileCode, 
  registWX 
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      wxId: options.wxId,
      nickName: options.nickName
    })
  },
  setCode:function(){
    getRegMobileCode({ mobile: this.data.phoneNumber,sendType:"0"})
    .then(res=>{
      wx.showToast({
        title: res.message,
        icon: 'success'
      })
    })
  },
  getCode:function(e){
    console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },
  getPhone:function(e){
    console.log(e.detail.value)
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  bind:function(){
    let data={
      wxId:this.data.wxId,
      nickName: this.data.nickName,
      tel: this.data.phoneNumber,
      validCode: this.data.code,
      terminalType:"4"
    }
    registWX(data)
    .then(res=>{
      wx.setStorageSync("token", res.result)
      wx.showToast({
        title: res.message,
        icon: 'success'
      })
      wx.navigateBack({
        delta: 1
      })
    })
    .catch(res=>{
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
    })
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
  
  }
})