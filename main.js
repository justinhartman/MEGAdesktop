const { app, BrowserWindow } = require('electron');
const path = require('path');

// Set application name.
app.setName('MEGAdesktop');

// Set about menu panel options.
app.setAboutPanelOptions({
    applicationName: "MEGAdesktop",
    copyright: "Copyright (c) 2021 Justin Hartman - https://justinhartman.co",
    authors: ["Justin Hartman"],
    website: "https://justinhartman.co"
});

// Import application main menu.
require('./menu');

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 960,
        height: 600,
        frame: false,
        titleBarStyle: 'hidden',
        show: false,
        backgroundColor: '#2e2c29',
        // icon: __dirname + '/build/icons/icon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Load a remote URL
    mainWindow.loadURL('https://mega.nz')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })
}

app.whenReady().then(() => {
    createWindow();

    //Open a window if none are open (macOS)
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

    // Quit the app when all windows are closed (Windows & Linux)
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    });
});
