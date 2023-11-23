const { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { session } = require('electron')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        frame: false,
        width: 1145,
        height: 680,
        icon: __dirname + '/images/logo.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            devTools: true,
        },
    });


    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': [
                "default-src 'self'",
                "style-src 'self' https://morfyum.github.io/maincss/maincss.css https://morfyum.github.io/maincss/src/extras.css https://morfyum.github.io/maincss/src/768p.css https://morfyum.github.io/maincss/src/1280p.css https://morfyum.github.io/maincss/src/2160p.css",
            ] 
          },
        });
      });

      mainWindow.webContents.openDevTools(); // DevTools megnyitása
      mainWindow.loadFile('index.html');
 };

/*
	mainWindow.openDevTools();
    ///Content-Security-Policy': ['default-src \'self\' \'./js/\']
	///mainWindow.loadURL('https://morfyum.github.io/maincss/')
	mainWindow.loadFile('index.html');	
};*/


let tray

app.whenReady().then(() => {
    const icon = nativeImage.createFromPath('./images/logo.png')
    tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'normal' },
        { label: 'Item2', type: 'normal' },
        { label: 'Item3', type: 'normal' },
        { label: 'Quit', type: 'normal', click: () => app.quit() }
    ])
    tray.setToolTip('MB_electron')
    tray.setContextMenu(contextMenu)
    

 
 })


app.whenReady().then(() => {
    createWindow()
    // MacOS compatibility 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


// Quit app when all window are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


console.log(`[ OK ] Running...`)
console.log('Platform: [', process.platform, ']')