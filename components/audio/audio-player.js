import util from '../../utils/util'

Component({
  properties: {
    src: {
      type: String,
      value: '',
    }
  },
  data: {
    playing: false,
    duration: '00:00',
    currentTime: '00:00',
    percent: 0,
  },
  lifetimes: {
    created () {
      this.audioContext = wx.createInnerAudioContext()
      this.audioContext.onCanplay((a, b) => {
        this.setData({
          duration: util.timeFilter(this.audioContext.duration),
          currentTime: util.timeFilter(this.audioContext.currentTime)
        })
      })
      this.audioContext.onTimeUpdate((a, b) => {
        this.setData({
          duration: util.timeFilter(this.audioContext.duration),
          currentTime: util.timeFilter(this.audioContext.currentTime),
          percent: this.audioContext.currentTime / this.audioContext.duration * 100
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
      this.audioContext.src = src
    }
  },
  pageLifetimes: {
    show () {
    },
    hide () {
      //this.audioContext.offTimeUpdate()
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
