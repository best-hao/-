// pages/entry/entry.js
const app = getApp()
import { 
  getMedicine,
  getCommodity,
  addShopCart,
  addShopByCode
} from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      search:{
        placeholder:"请输入商品条形码",
        btnText:"添加",
        isfocus:true
      },
      code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  serchCode: function(e){
    this.setData({
      code: e.detail.value
    })
  },
  addCode:function(){
    console.log(this.data.code)
    this.isLife(this.data.code)
  },
  //isLife:function(code){
    //let isLife = code.indexOf("life")
    //if (isLife == 0) {
      //console.log("----life")
      //getCommodity({ barcode: this.data.code })
      //.then(res=>{
       // this.addCar(res.result)
      //})
    //} else {
      //console.log("----medicine")
      //}
      
      //}
  //},
  //6933346880668
  addCar:function(){
    let data = {
      token: wx.getStorageSync("token"),
      barcode: this.data.code,
      busNo: wx.getStorageSync("busNo"), 
      busName: wx.getStorageSync("busName") 
    }
    addShopByCode(data)
    .then(res => {
      wx.showToast({
        title: "成功",
        icon: 'success'
      })
      wx.navigateTo({
        url: '../shopcar/shopcar',
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