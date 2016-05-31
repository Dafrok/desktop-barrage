var electron = require('electron')
var {app, BrowserWindow} = require('electron')

var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

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
      hidden: true
    })
    this.text = options.text
    this.showInactive()
    this.loadURL('file://' + __dirname + '/barrage.html?text=' + this.text)
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

      }, 16.7)}
    this.stop = () => {
      clearInterval(this.barrageInterval)
      this.destroy()
    }
  }
}

app.on('ready', function() {
  var electronScreen = electron.screen
  var size = electronScreen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow()
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  app.createBarrage = function (text) {
    new Barrage({
      text: text,
      screenSize: size
    })
  }
})
