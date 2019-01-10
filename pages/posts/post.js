var postsData=require("../../data/posts-data.js")
Page({
  data: {
    
  },
  onLoad: function () {
    // this.data.postList=postsData.postList;
    this.setData({
      posts_key: postsData.postList
    });
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    // console.log("on post id is"+postId)
    wx.navigateTo({
      url: "post-detail/post-detail?id="+postId,
    })
  },
  onSwiperItem:function(event){
    var postId=event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id="+postId,
    })
  }
})