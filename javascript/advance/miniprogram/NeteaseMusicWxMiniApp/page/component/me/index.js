var app = getApp();
var bsurl = require('../../../utils/bsurl.js');
Page({
  data: {
    list: [],
    subcount: {},
    loading: true,
    
  },
  onLaunch: function() {
  },
  logout: function () {
    wx.removeStorageSync('user');
    wx.navigateTo({
      url: '../login/index'
    });
    return;
  },
  tapProfilePage() {
    var userid = wx.getStorageSync('user').account.id;
    wx.navigateTo({
      url: '../user/index?id=' + userid,
    });
    /*
    var userid = wx.getStorageSync('user').account.id;
    wx.redirectTo({
      url: '../user/index?id=' + userid
    })
    */
  },
  onLoad: function () {
    
    var that = this;
    var userInfo = wx.getStorageSync('user');
    console.log(userInfo)
    var userInfo = wx.getStorageSync('user');
    if (!userInfo.account) {
      wx.navigateTo({
        url: '../login/index'
      });
      return;
    }
    var id = userInfo.account.id;
    this.setData({
      uid: id,
      userInfo: userInfo,
      currentCity: app.data.currentCity
    })
    wx.request({
      url: bsurl + 'user/subcount?id=' + id,
      success: function (res) {
        that.setData({

          subcount: res.data
        });
      }
    });
    wx.request({
      url: bsurl + 'user/playlist',
      data: {
        uid: id,
        offset: 0,
        limit: 1000
      },
      success: function (res) {
        that.setData({
          loading: false,
          list1: res.data.playlist.filter(function (item) { return item.userId == id }),
          list2: res.data.playlist.filter(function (item) { return item.userId != id }),
        });
      }
    });
  },
  onShow: function () {
    console.log("me show----------")
  }
})