Page({
  data: {
    id: 1,
    music: '',
    bgUrl: '',
    caseNotice: '',
    section: [],
    title: '',
  },
  onLoad: function (options) {
    const id = options.id
    wx.request({
      url: `https://conan.ifable.cn/api/getIncident`,
      data: {
        id
      },
      success: (res) => {
        const { title, section } = res.data
        wx.setNavigationBarTitle({
          title
        })
        this.setData({
          id,
          music: `https://oss-materials.ifable.cn/conan/m${id}.mp3`,
          bgUrl: `https://oss-materials.ifable.cn/conan/m${id}-bg.jpg?imageView2/0/interlace/1`,
          caseNotice: `https://oss-materials.ifable.cn/conan/m${id}-pic-2.png`,
          section,
          title,
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: `/pages/incident/incident?id=${this.data.id}`,
      imageUrl: `https://oss-materials.ifable.cn/conan/m${this.data.id}.jpg`
    }
  }
})
