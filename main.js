const electron = require('electron')
// Module to control application life.
const app = electron.app
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu;
const Tray = electron.Tray;
const path = require('path')
const url = require('url')
const dialog = require('electron').dialog;
const Menus = require('electron').Menu;

console.log(process.argv);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var appTray = null, trayIcon;

function createWindow() {
  // 主窗口
  mainWindow = new BrowserWindow({
    // width: 1542,
    width: 1022,
    height: 670,
    minWidth: 1022,
    minHeight: 670,
    frame: false,
    resizable: true,
    title: '吉姆音乐厅',
    skipTaskbar: false
  })

  // 软件菜单
  // var template = [
  //     {
  //         label: '文件',
  //         submenu: [
  //             {
  //                 label: 'Undo',
  //                 accelerator: 'CmdOrCtrl+Z',
  //                 // role: 'undo',
  //                 click: function () {
  //                     dialog.showMessageBox({
  //                         title: 'Undo',
  //                         message: 'UndoUndo'
  //                     })
  //                 },
  //             }
  //         ]
  //     },
  //     {
  //         label: '关于',
  //         click: function () {
  //             dialog.showMessageBox({
  //                 title: '关于',
  //                 message: '.........'
  //             })
  //         },
  //     },
  // ]
  // var menu = Menus.buildFromTemplate(template)
  // Menus.setApplicationMenu(menu);

  var trayMenuTemplate = [
    {
      label: '暂停/播放',
      click: function () {
        mainWindow.webContents.send('playorpause');
        // dialog.showMessageBox({title: 'ss'})
      } //打开相应页面
    },
    {
      label: '意见反馈',
      click: function () {
        dialog.showMessageBox({title: '坑爹啊，居然后什么都没有'})
      }
    },
    {
      label: '帮助',
      click: function () {
      }
    },
    {
      label: '关于',
      click: function () {
      }
    },
    {
      label: '退出',
      click: function () {
        //ipc.send('close-main-window');
        app.quit();
      }
    }
  ];

  //系统托盘图标目录
  trayIcon = path.join(__dirname, 'static/app.png');

  console.log(trayIcon);
  console.log(trayIcon);

  appTray = new Tray(trayIcon);

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('吉姆音乐厅');
  appTray.displayBalloon({
    title: '提示',
    content: '功能完善中'
  });

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './dist/ele/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win_event(mainWindow);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  //系统托盘图标闪烁
  var count = 0, timer = null;
  timer = setInterval(function () {
    count++;
    if (count % 2 === 0) {
      appTray.setImage(trayIcon)
    } else {
      appTray.setImage(trayIcon)
    }
  }, 600);

  //单点击 1.主窗口显示隐藏切换 2.清除闪烁
  appTray.on("click", function () {
    if (!!timer) {
      appTray.setImage(trayIcon)
      //主窗口显示隐藏切换
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  })

}

function win_event(win) {
  win.webContents.on('new-window', function (event, url, fname, disposition, options) {
    console.log(url);
    let childWindow;
    childWindow = new BrowserWindow({
      height: 360,
      width: 360,
      webPreferences: {nodeIntegration: false}
    });
    win_event(childWindow);
    childWindow.loadURL(url);
    event.preventDefault();
  });
}

ipcMain.on('hideapp', function (e) {
  // mainWindow.hide();
  // e.sender.send('hided');
  app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
