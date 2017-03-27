// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow
const { setCurrentUri, getCurrentUri } = require('electron').remote.require('./main.js')
const path = require('path')
const contextMenu = require('electron-context-menu')

const webview = document.getElementById('trello')
const indicator = document.querySelector('.indicator')

let loadedCurrent = false;

onload = () => {
  const loadstart = () => {
    // TODO: do something with loader..
    // indicator.innerText = 'loading...'
    if (!loadedCurrent) {
      webview.loadURL(getCurrentUri())
    }
    loadedCurrent = true;
  }

  const loadstop = () => {
    // TODO: do something with loader..
    // indicator.innerText = ''
  }

  webview.addEventListener('dom-ready', () => {
    contextMenu({window: webview})
  })

  webview.addEventListener('did-start-loading', loadstart)
  webview.addEventListener('did-stop-loading', loadstop)

  webview.addEventListener('did-navigate-in-page', function (event) {
    setCurrentUri(webview.getURL());
  })
}
