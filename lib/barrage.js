var {BrowserWindow} = require('electron')

class Barrage extends BrowserWindow {
  constructor(options) {
    super({
      width: 0,
      height: 0,
      acceptFirstMouse: true,
      frame: false,
      useContentSize: true,
      transparent: true,
      hidden: true,
      x: options.screenSize.width,
      y: 0 | options.screenSize.height * Math.random(),
      // movable: false,
      // resizable: false,
      alwaysOnTop: true,
      enableLargerThanScreen: true,
      show: false,
      skipTaskbar: true,
    })
    this.link = options.link
    this.text = options.text
    this.setMenuBarVisibility(false)
    this.showInactive()
    this.loadURL(`file://${__dirname }/../page/barrage.html?text=${this.text}&link=${this.link}`)
    this.go = () => {
      var width = this.getSize()[0]
      var position = this.getPosition()
      this.x = position[0]
      this.y = position[1]
      this.barrageInterval = setInterval(() => {
        try {
          this.setPosition(this.x, this.y)
          if (this.x < -width) {
            this.stop()
          } else {
            this.x = this.x - 5
          }
        } catch (e) {}

      }, 16.7)
    }
    this.stop = () => {
      clearInterval(this.barrageInterval)
      this.destroy()
    }
  }
}
module.exports = Barrage
