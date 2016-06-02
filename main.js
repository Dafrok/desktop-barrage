var electron = require('electron')
var {app, BrowserWindow} = require('electron')
var Barrage = require('./lib/barrage.js')

var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function() {
  var electronScreen = electron.screen
  var size = electronScreen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/page/index.html`)

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  app.on('browser-window-focus', function (e) {
    mainWindow.focus()
  })
  app.createBarrage = function (options) {
    new Barrage({
      text: options.text,
      link: options.link,
      screenSize: size
    })
  }
})
