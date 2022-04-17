type AudioButtonData = {
  playing: boolean;
  percent: number;
}

Component<AudioButtonData, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption, WechatMiniprogram.IAnyObject, boolean>({
  properties: {
    src: {
      type: String,
      value: '',
    }
  },
  data: {
    playing: false,
    percent: 0,
  },
  lifetimes: {
    created () {
      this.audioContext = wx.createInnerAudioContext()
      this.audioContext.onTimeUpdate(() => {
        this.setData({
          percent: this.audioContext.currentTime / this.audioContext.duration * 360
        })
      })
      this.audioContext.onPlay(() => {
        this.setData({
          playing: true
        })
      })
      this.audioContext.onPause(() => {
        this.setData({
          playing: false
        })
      })
      this.audioContext.onEnded(() => {
        this.setData({
          playing: false
        })
      })
    },
    attached () {
    },
    detached () {
      this.audioContext.offTimeUpdate()
      this.audioContext.destroy()
    },
  },
  observers: {
    'src': function(src) {
      console.log(src)
      this.audioContext.src = src
    }
  },
  methods: {
    handlePlay () {
      this.audioContext.play()
    },
    handlePause () {
      this.audioContext.pause()
    }
  }
})
