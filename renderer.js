// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow
const { setCurrentUri, getCurrentUri } = require('electron').remote.require('./main.js')
const path = require('path')

const webview = document.getElementById('trello')
const indicator = document.querySelector('.indicator')

let loadedCurrent = false;

onload = () => {
  const loadstart = () => {
    indicator.innerText = 'loading...'
    console.log(getCurrentUri())
    if (!loadedCurrent) {
      webview.loadURL(getCurrentUri())
    }
    loadedCurrent = true;
  }

  const loadstop = () => {
    indicator.innerText = ''
  }

  webview.addEventListener('did-start-loading', loadstart)
  webview.addEventListener('did-stop-loading', loadstop)

  webview.addEventListener('did-navigate-in-page', function (event) {
    setCurrentUri(webview.getURL());
  })
}
