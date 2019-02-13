const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const Parser = require("../lib/dom-parser")

function xml(res){
  console.log(res)
  let xmlParser = new Parser.DOMParser();
  let doc = xmlParser.parseFromString(res);
  let data = doc.getElementsByTagName("ns:return")[0].firstChild.nodeValue;
  return JSON.parse(data)
}

function request(method, data) {
  var promise = new Promise((resolve, reject) => {
    wx.request({
      url: `http://csbj.lanjiutian.com/eWebService/services/Service/${method}`,
      data: data,
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) { //服务器返回数据       
        let data = xml(res.data)
        if (data.status) {
          console.log(data)
          resolve(data)
        } else {
          console.log(data)
          wx.showToast({
            title: data.message,
            icon: 'none'
          })
        }
        //if (res.data.code == 200) {
          //resolve(res.data);
        //} else { //返回错误提示信息
          //reject(res.data);
          //wx.hideLoading()
         // wx.showToast({
            //title: res.data.msg,
            //icon: 'none'
          //})
        //}
       
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
module.exports = {
  formatTime: formatTime,
  request: request
}
