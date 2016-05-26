var {app, BrowserWindow} = require('electron')

var mainWindow = null


app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

function createBarrage (text) {
  var newWindow = new BrowserWindow({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    frame: false,
    useContentSize: true,
    transparent: true,
    hidden: true,
    movable: false,
  })
  newWindow.loadURL('file://' + __dirname + '/index.html?text=' + text)

  newWindow.on('show', function () {
    var x = 1344
    var y = 0 | Math.random() * 768
    setInterval(function () {
      newWindow.setPosition(x, y)
      x = x - 5
    }, 16.7)
  })
  return newWindow
}

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    frame: false,
    transparent: true,
    // fullscreen: true,
    hidden: true,
    // resizable: false,
    movable: false,
    'use-content-size': true,
  })
  // mainWindow.maximize()
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  // mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null
  })
  createBarrage(233)
  createBarrage(666)
  createBarrage(666)
  createBarrage(666)
  createBarrage(666)
  createBarrage(666)
  createBarrage(666)
})
