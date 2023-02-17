type Section = {
  title: string;
  data: any[];
};

type IncidentData = {
  id: number;
  music: string;
  bgUrl: string;
  caseNotice: string;
  section: Section[];
  title: string;
}

type RequestType = {
  title: string;
  section: Section[]
}

Page<IncidentData, WechatMiniprogram.Page.CustomOption>({
  data: {
    id: 1,
    music: '',
    bgUrl: '',
    caseNotice: '',
    section: [],
    title: '',
  },
  onLoad (options) {
    const id = options.id
    this.setData({
      id: id ? Number(id) : 1,
      music: `https://oss-materials.ifable.cn/conan/m${id}.mp3`,
      bgUrl: `https://oss-materials.ifable.cn/conan/m${id}-bg.jpg?imageView2/0/interlace/1`,
      caseNotice: `https://oss-materials.ifable.cn/conan/m${id}-pic-2.png`,
    })
    wx.request<RequestType>({
      url: `https://conan.ifable.cn/api/getIncident`,
      data: { id },
      success: (res) => {
        const { title, section } = res.data
        wx.setNavigationBarTitle({
          title
        })
        this.setData({
          section,
          title,
        })
      }
    })
  },
  onAddToFavorites (): WechatMiniprogram.Page.IAddToFavoritesContent {
    return {
      title: this.data.title,
      query: `id=${this.data.id}`,
      imageUrl: `https://oss-materials.ifable.cn/conan/m${this.data.id}.jpg`
    }
  },
  onShareAppMessage () {
    return {
      title: this.data.title,
      path: `/pages/incident/incident?id=${this.data.id}`,
      imageUrl: `https://oss-materials.ifable.cn/conan/m${this.data.id}.jpg`
    }
  },
  onShareTimeline (): WechatMiniprogram.Page.ICustomTimelineContent | void {
    return {
      title: this.data.title,
      query: `id=${this.data.id}`,
      imageUrl: `https://oss-materials.ifable.cn/conan/m${this.data.id}.jpg`
    }
  }
})
