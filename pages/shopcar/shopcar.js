import {
  showShopCart
} from '../../utils/api.js'
Page({
  data: {
    lists:[],
    carts:[],
    noShop:false,
    noTitle:"您的购物车是空的!",
    scanIcon: "../../images/icon_scan.png",
    delIcon:"../../images/del_shop_car.png",
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true    // 全选状态，默认全选
  },
  onLoad: function (options) {
    this.showShopCart()
  },
  showShopCart:function(){
    showShopCart()
    .then(res=>{
      if (res.result){ 
        let data = res.result.DETAILS.filter(item => item.LOGISTICS_COMPANY_ID === wx.getStorageSync("busNo")) 
        let carts = data[0].DETAILS
        for (let i = 0; i < carts.length; i++) {
          carts[i].selected = true;
        } 
        console.log(carts)
        this.setData({
          shopName: data[0].LOGISTICS_COMPANY,
          carts: carts,
          noShop: false
        })
        this.getTotalPrice()
      }else{
        this.setData({
          noShop: true
        })
      }
    })
  },
  toScan:function(){
    wx.navigateTo({
      url:"../scan/scan"
    })
  },
  selectList(e) { 
    const index = e.currentTarget.dataset.index;  
    console.log(e.currentTarget.dataset) 
    let carts = this.data.carts;                 
    const selected = carts[index].selected;       
    carts[index].selected = !selected;            
    this.setData({
      carts: carts
    });
    this.getTotalPrice();                     
  },
  getTotalPrice() {
    let carts = this.data.carts;            
    let total = 0;
    for (let i = 0; i < carts.length; i++) {       
      if (carts[i].selected) {
        total += carts[i].SALEPRICE * carts[i].EXCHANGE_QUANLITY;
      }
    }
    this.setData({                           
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  selectAll() {
    let selectAllStatus = this.data.selectAllStatus; 
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;    
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                 
  },
  // 增加数量
  addCount(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].EXCHANGE_QUANLITY;
    num = num + 1;
    carts[index].EXCHANGE_QUANLITY = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].EXCHANGE_QUANLITY;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].EXCHANGE_QUANLITY = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);             
    this.setData({
      carts: carts
    });
    if (!carts.length) {                 
      this.setData({
        noShop: false          
      });
    } else {                            
      this.getTotalPrice();          
    }
  }
})