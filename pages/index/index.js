//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    caseBookList: []
  },
  onLoad: function () {
    const caseBookList = []
    for (let i = 0; i < 21; i++) {
      caseBookList.push({
        id: i + 1,
        url: `http://oss-materials.ifable.cn/conan/m${i + 1}.jpg?imageView2/0/interlace/1`,
        logo: `http://oss-materials.ifable.cn/conan/m${i + 1}logo.png`,
        year: 1997 + i,
        waiting: 1997 + i > 2009
      })
    }
    this.setData({
      caseBookList: caseBookList
    })
  },
})
