//index.js
//获取应用实例
// const app = getApp()

Page({
  data: {
    caseBookList: [],
    times: 0
  },
  onLoad: function () {
    const caseBookList = []
    for (let i = 0; i < 21; i++) {
      caseBookList.push({
        id: i + 1,
        image: `http://oss-materials.ifable.cn/conan/m${i + 1}.jpg?imageView2/0/interlace/1`,
        url: `http://oss-materials.ifable.cn/conan/m${i + 1}.jpg?imageView2/0/interlace/1`,
        urlh: `http://oss-materials.ifable.cn/conan/m${i === 20 ? 1 : i + 1}h.jpg?imageView2/0/interlace/1`,
        logo: `http://oss-materials.ifable.cn/conan/m${i + 1}logo.png`,
        titleLogo: `http://oss-materials.ifable.cn/conan/m${i + 1}logo.png`,
        movd: 'http://oss-materials.ifable.cn/conan/mov-d.png',
        move: 'http://oss-materials.ifable.cn/conan/mov-e.png',
        year: 1997 + i,
        waiting: 1997 + i > 2009
      })
    }
    this.setData({
      caseBookList: caseBookList
    })
  },
  handleRotate: function(event) {
    const index = Number(event.currentTarget.dataset.index)
    const rotated = this.data.caseBookList[index].image === this.data.caseBookList[index].urlh
    setTimeout(() => {
      this.setData({
        caseBookList: this.data.caseBookList.map((item, i) => {
          if (i === index && rotated) {
            return {...item, image: item.url, logo: item.titleLogo}
          }
          if (i === index && !rotated) {
            return {...item, image: item.urlh, logo: item.waiting ? item.move : item.movd}
          }
          return item
        })
      })
    }, 250)
    this.animate(`.case-book-item-block-${index}`, [
      { rotateY: !rotated ? 0: 180 },
      { rotateY: !rotated ? 90: 90 },
      { rotateY: !rotated ? 180: 0 },
    ], 500)
    this.animate(`.case-book-item-${index}`, [
      { rotateY: !rotated ? 0 : -180 },
      { rotateY: !rotated ? -90 : -90 },
      { rotateY: !rotated ? -180 : 0 },
    ], 500)
  },
  handleNavigate: function (event) {
    const index = event.currentTarget.dataset.index
    if (this.data.caseBookList[index].waiting) {
      wx.showToast({
        title: '静候上线',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: `/pages/incident/incident?id=${index + 1}`,
      })
    }
  }
})
