const { request } = require('util.js')
//匹配门店
const getShop = (data) => request("getShop", data)
//登录
const loginWx = (data) => request("loginxcx",data)
//获取验证码
const getRegMobileCode = (data) => request("getRegMobileCode", data)
//绑定手机号
const registWX = (data) => request("registWX", data)
//扫码加入购物车
const addShopByCode = (data) => request("addShopCarByBarcode", data)
//生活馆扫码
const getCommodity = (data) => request("getCommodityDetailsByBarcode",data)
//医药馆扫码
const getMedicine = (data) => request("getMedicineByBarcode", data)
//展示购物车
const showShopCart = (data) => request("shoppingcart", {
  token: wx.getStorageSync("token"),
  op: "getShoppingCartList",
  data: {LAT:"0",LNG:"0"}
})
//加入购物车
const addShopCart = (data) => request("shoppingcart", {
  token: wx.getStorageSync("token"),
  op: "create",
  data: data
})

module.exports = {
  getShop,
  getRegMobileCode,
  registWX,
  loginWx,
  getCommodity,
  getMedicine,
  showShopCart,
  addShopCart,
  addShopByCode
}