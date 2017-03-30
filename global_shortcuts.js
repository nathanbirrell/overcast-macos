const { globalShortcut } = require('electron')

exports.globalShortcuts = (mainWindow) => {
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
