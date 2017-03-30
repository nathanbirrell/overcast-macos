const { globalShortcut } = require('electron')
const Config = require('electron-config')
const config = new Config()

toggleMediaKeySettings = (window) => {
  let currentlyOn = config.get('mediaKeysOn')
  if (currentlyOn) {
    config.set('mediaKeysOn', false)
    unregisterGlobalShortcuts()
  } else {
    config.set('mediaKeysOn', true)
    registerGlobalShortcuts(window)
  }
}

registerGlobalShortcuts = (mainWindow) => {
  if (!config.get('mediaKeysOn')) {
    return false;
  }
  // Global keyboard shortcuts
  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.send('playback', 'playpause')
  })
  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.send('playback', 'next')
  })
  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.send('playback', 'previous')
  })
}

unregisterGlobalShortcuts = () => {
  globalShortcut.unregister('MediaPlayPause')
  globalShortcut.unregister('MediaNextTrack')
  globalShortcut.unregister('MediaPreviousTrack')
}

exports.toggleMediaKeySettings = toggleMediaKeySettings
exports.registerGlobalShortcuts = registerGlobalShortcuts
