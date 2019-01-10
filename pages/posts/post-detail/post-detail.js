var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (options) {
    // var globalData = app.globalData;
    var postId = options.id;
    this.setData({
      currentPostId: postId
    });

    var postData = postsData.postList[postId];
    this.setData({
      postData: postData,
    });

    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    };
    this.setMusicMonitor();
    if (app.globalData.g_isPlayingMusic && app.globalData.g_curentMusicPostId===postId){
      this.setData({
        isPlayingMusic: app.globalData.g_isPlayingMusic
      })
    }

  },
  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_curentMusicPostId = that.data.currentPostId
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_curentMusicPostId =null
    })
  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId];

    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postCollected, postsCollected);


  },

  showToast: function (postCollected, postsCollected) {

    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏',
      icon: 'success',
      duration: 1000,
    })

  },
  onShareTap: function () {
    var itemList = [
      "分享到微信",
      "分享到QQ",
      "分享到微博",
      "分享到微信好友"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#666",
      success: function (res) {
        // res.tapIndex
        // res.cancel
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否点击了取消按钮' + res.cancel,

        })
      }
    })
  },
  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      console.log(isPlayingMusic)
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      console.log(isPlayingMusic)
    }

  }
})


