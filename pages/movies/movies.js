var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters");
    this.getMovieListData(comingSoonUrl,"comingSoon");
    this.getMovieListData(top250Url,"top250");

  },

  getMovieListData: function (url,settedKey) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (res) {
          that.processDoubanData(res.data,settedKey)
      },
      fail: function () {
        console.log(Error)
      }
    })
  },
  processDoubanData: function (moviesDouban,settedKey) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        moviesId: subject.id,
      };
      movies.push(temp)
    }
    var readyData={};
    readyData[settedKey]={
      movies:movies
    }
    this.setData(readyData)
  }
})

