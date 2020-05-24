import util from '../../utils/util'

Component({
  properties: {
    src: {
      type: String,
      value: '',
    }
  },
  data: {
    audioContext: null,
    playing: false,
    duration: 0,
    currentTime: 0,
    percent: 0,
  },
  lifetimes: {
    attached: function() {
      const audioContext = wx.createInnerAudioContext()
      audioContext.src = this.data.src
      audioContext.onCanplay((a, b) => {
        this.setData({
          duration: util.timeFilter(this.data.audioContext.duration),
          currentTime: util.timeFilter(this.data.audioContext.currentTime)
        })
      })
      audioContext.onTimeUpdate((a, b) => {
        this.setData({
          duration: util.timeFilter(this.data.audioContext.duration),
          currentTime: util.timeFilter(this.data.audioContext.currentTime),
          percent: this.data.audioContext.currentTime / this.data.audioContext.duration * 100
        })
      })
      audioContext.onEnded(() => {
        this.setData({
          playing: false
        })
      })
      this.setData({
        audioContext
      })
    },
    detached: function() {
      this.data.audioContext.destroy()
    },
  },
  methods: {
    handlePlay: function () {
      this.setData({
        playing: true
      })
      this.data.audioContext.play()
    },
    handlePause: function () {
      this.setData({
        playing: false
      })
      this.data.audioContext.pause()
    }
  }
})
