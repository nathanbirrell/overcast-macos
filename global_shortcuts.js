const { globalShortcut } = require('electron')

exports.globalShortcuts = (mainWindow) => {
  // Global keyboard shortcuts
  globalShortcut.register('MediaPlayPause', () => {
    console.log('MediaPlayPause')
    mainWindow.webContents.send('playback', 'playpause')
  })
  globalShortcut.register('MediaNextTrack', () => {
    console.log('MediaNextTrack')
    mainWindow.webContents.send('playback', 'next')
  })
  globalShortcut.register('MediaPreviousTrack', () => {
    console.log('MediaPreviousTrack')
    mainWindow.webContents.send('playback', 'previous')
  })
}
