const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
 
//communicate with renderer process
const ipc = electron.ipcMain;
const log = require('electron-log');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

//auto reload as changes are made
const path = require('path')
require('electron-reload')(__dirname,{
  ignored:/assets\/data\//
});

//Check if opening in dev mode
const isDev = require('electron-is-dev');
      
function createWindow () {
  var screen = electron.screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 700, 
    height: 500,
    x:screen.width-700,
    y:0,
    frame:false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null;
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
  
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

//close app
ipc.on('close-app',(ev,data) => {
  mainWindow.close();
});

