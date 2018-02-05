const tray = require('./app/tray');

const { app, BrowserWindow, Menu, protocol, ipcMain } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");


autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


let template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
      {
        role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell.openExternal('https://electronjs.org')
        }
      },
      {
        label: 'Documentation',
        click() {
          shell.openExternal(
            `https://github.com/electron/electron/tree/v${process.versions.electron}/docs#readme`
          )
        }
      },
      {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron')
        }
      },
      {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/electron/electron/issues')
        }
      }
    ]
  }
]


let mainWindow

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('message', text);
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Angular Material',
    icon: `${__dirname}/build/favicon.ico`,
    width: 800,
    height: 600
  })


  mainWindow.loadURL(`file://${__dirname}/index.html#v${app.getVersion()}`);

  tray.create(mainWindow);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...');
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createWindow();
  //Make sure in dev. enviroment, auto updater won't be called.
  if (process.env.NODE_ENV !== "dev") {
    autoUpdater.checkForUpdates();
  }
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

autoUpdater.on('update-downloaded', (ev, info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
  mainWindow.setClosable(true);
  setTimeout(function () {
    autoUpdater.quitAndInstall();
  }, 5000)
})
