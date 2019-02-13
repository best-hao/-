import {
  getMyOrderList
} from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabindex: 0,
    page: 0,
    list: []
  },
  bindtab(e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
    this.getMyOrderList(e.currentTarget.dataset.index)
  },
  //status,1待安排,2已完结,3待评价,
  getMyOrderList(status) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    //this.setData({
      //tabindex: options.status || 0
    //})
    //this.getMyOrderList(options.status)
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
    //console.log(app.globalData.status)
    //this.setData({
     // tabindex: app.globalData.status || 0
    //})
    //this.getMyOrderList(app.globalData.status) 
    //app.globalData.status = ''
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