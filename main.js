const electron = require('electron')
const Config = require('electron-config')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Allows communication between the main process and the render process
const ipcMain = electron.ipcMain

const config = new Config()

const path = require('path')
const url = require('url')

const defaultUrl = 'https://overcast.fm/podcasts'

let currentUri = config.get('currentUri')

// Set current URL as default if not set
if (!currentUri || currentUri === '') {
  currentUri = defaultUrl;
  config.set('currentUri', currentUri)
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  let options = {
    width: 520,
    height: 600,
    transparent: false,
    titleBarStyle: 'hidden-inset',
    frame: false
  }

  Object.assign(options, config.get('winBounds'))

  // Create the browser window.
  mainWindow = new BrowserWindow(options)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('close', function () {
    config.set('winBounds', mainWindow.getBounds())
    config.set('currentUri', currentUri)
  })

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  require('./global_shortcuts.js').globalShortcuts(mainWindow)
}

exports.getCurrentUri = () => {
  return currentUri;
};
exports.setCurrentUri = (uri) => {
  currentUri = uri;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

require('./menu')
