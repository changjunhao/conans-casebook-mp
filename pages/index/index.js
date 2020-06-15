//index.js
//获取应用实例
// const app = getApp()

const titles = [
  '计时引爆摩天楼',
  '第十四个目标',
  '世纪末的魔术师',
  '瞳孔中的暗杀者',
  '通往天国的倒计时',
  '贝克街的亡灵',
  '迷宫的十字路口',
  '银翼的魔术师',
  '水平线上的阴谋',
  '侦探们的镇魂曲',
  '蔚蓝的灵柩',
  '战栗的乐谱',
  '漆黑的追踪者',
  '天空的遇难船',
  '沉默的 15 分钟',
  '第 11 名王牌',
  '绝海的侦探',
  '异次元的狙击手',
  '业火的向日葵',
  '纯黑的噩梦',
  '枫红的恋歌',
]

Page({
  data: {
    caseBookList: [],
    current: 0,
    showGuide: false,
    showGuideOne: false,
    showGuideTwo: false,
  },
  onLoad (options) {
    this.times = 0
    const showGuided = wx.getStorageSync('guide')
    if (!showGuided) {
      this.setData({
        showGuide: true,
        showGuideOne: true,
      })
    }
    const id = options.id || 1
    const caseBookList = []
    for (let i = 0; i < 21; i++) {
      caseBookList.push({
        id: i + 1,
        title: titles[i],
        image: `https://oss-materials.ifable.cn/conan/m${i + 1}.jpg?imageView2/0/interlace/1`,
        url: `https://oss-materials.ifable.cn/conan/m${i + 1}.jpg?imageView2/0/interlace/1`,
        urlh: `https://oss-materials.ifable.cn/conan/m${i === 20 ? 1 : i + 1}h.jpg?imageView2/0/interlace/1`,
        logo: `https://oss-materials.ifable.cn/conan/m${i + 1}logo.png`,
        titleLogo: `https://oss-materials.ifable.cn/conan/m${i + 1}logo.png`,
        movd: 'https://oss-materials.ifable.cn/conan/mov-d.png',
        move: 'https://oss-materials.ifable.cn/conan/mov-e.png',
        year: 1997 + i,
        waiting: 1997 + i > 2009
      })
    }
    this.setData({
      current: id - 1,
      caseBookList: caseBookList
    })
  },
  onShareAppMessage () {
    const index = this.data.current
    const id = index + 1
    const currentCase = this.data.caseBookList[index]
    return {
      title: currentCase.title,
      path: index > 12 ? `/pages/index/index?id=${id}` : `/pages/incident/incident?id=${id}`,
      imageUrl: currentCase.image === currentCase.url ?  `https://oss-materials.ifable.cn/conan/m${id}.jpg` : `https://oss-materials.ifable.cn/conan/m${id === 21 ? 1 : id}h.jpg`
    }
  },
  handleRotate () {
    const index = this.data.current
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
  handleNavigate () {
    const index = this.data.current
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
  },
  handleChange (event) {
    if (event.detail.source === 'touch') {
      this.setData({
        current: event.detail.current
      })
    }
  },
  handleGuide () {
    if (this.times === 0) {
      this.setData({
        showGuideOne: false,
        showGuideTwo: true
      })
      this.times = 1
    } else if (this.times === 1) {
      this.times = 0
      this.setData({
        showGuideOne: false,
        showGuideTwo: false,
        showGuide: false
      })
      wx.setStorage({
        key: 'guide',
        data: true
      })
    }
  }
})
