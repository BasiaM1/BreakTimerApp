'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');

function main() {

  // create new window
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 520,
    height: 650,
    frame: false,
  })

  // load app/index.html as the window content
  mainWindow.loadFile(path.join('app', 'index.html'));
  // mainWindow.webContents.openDevTools();
}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});