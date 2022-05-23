/**
 * Main application file to handle the process for setting up the app.
 *
 * @author     Justin Hartman <code@justinhartman.co>
 * @link       https://justinhartman.co
 * @copyright  Copyright (c) 2021-2022 Justin Hartman
 * @licence    https://github.com/justinhartman/MEGAdesktop/blob/main/LICENSE MIT
 * @since      1.0.0
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

// Prevent app from loading multiple times during Squirrel install
// See: https://github.com/electron/windows-installer#handling-squirrel-events
if (require('electron-squirrel-startup')) return app.quit();

// Set application name.
app.setName('MEGAdesktop');

// Set about menu panel options.
app.setAboutPanelOptions({
    applicationName: 'MEGAdesktop',
    copyright: 'Copyright (c) 2021-2022 Justin Hartman \ncode@justinhartman.co\nhttps://justinhartman.co',
    authors: ['Justin Hartman'],
    website: 'https://justinhartman.co',
});

// Import application main menu.
require('./menu');

// Configuration for the main application window.
function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 960,
        height: 600,
        titleBarStyle: 'default',
        titleBarOverlay: true,
        roundedCorners: true,
        show: false,
        backgroundColor: '#2e2c29',
    });

    // Load a remote URL.
    mainWindow.loadURL('https://mega.nz/login');

    // Load a local file URL.
    // mainWindow.loadFile('index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(() => {
    createWindow();

    // Open a window if none are open (macOS).
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    // Quit the app when all windows are closed (Windows & Linux).
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});
