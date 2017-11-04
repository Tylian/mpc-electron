const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

let window = null;
app.on('ready', () => {
  window = new BrowserWindow({ width: 800, height: 600, show: false });
  window.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // win.webContents.openDevTools();
  window.on('closed', () => {
    window = null
  });

  window.once('ready-to-show', () => {
    window.show()
  });

  app.on('window-all-closed', () => {
    app.quit()
  });  

  installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});