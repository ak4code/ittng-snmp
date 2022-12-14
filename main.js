const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const getSnmp = require('./index')

if (require('electron-squirrel-startup')) return app.quit();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
};

app.whenReady().then(async () => {
    ipcMain.handle('mib', await getSnmp)
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});