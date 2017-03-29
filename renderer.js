// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow
const { setCurrentUri, getCurrentUri } = require('electron').remote.require('./main.js')
const path = require('path')
const contextMenu = require('electron-context-menu')

const webview = document.getElementById('webview')
const loader = document.querySelector('.loader')
const isLoadingClass = 'is-loading'

let loadedCurrent = false;

onload = () => {
  const loadstart = () => {
    loader.classList.add(isLoadingClass)

    if (!loadedCurrent) {
      webview.loadURL(getCurrentUri())
    }

    loadedCurrent = true;
  }

  const loadstop = () => {
    loader.classList.remove(isLoadingClass)
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
