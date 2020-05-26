Page({
  data: {
    id: 1,
    music: '',
    bgUrl: '',
    caseNotice: ''
  },
  onLoad: function (options) {
    const id = options.id
    this.setData({
      id,
      music: `http://oss-materials.ifable.cn/conan/m${id}.mp3`,
      bgUrl: `http://oss-materials.ifable.cn/conan/m${id}-bg.jpg`,
      caseNotice: `http://oss-materials.ifable.cn/conan/m${id}-pic-2.png`
    })
    // wx.setNavigationBarTitle({
    //   title: ''
    // })
  }
})
