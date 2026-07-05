console.log("Running...")

const { app, BrowserWindow } = require('electron');

const createWin = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 500,
        resizable: false,
        maximizable: false,
        frame: true,
        fullscreenable: false,
        transparent: false,
        webPreferences: {
            contextIsolation: true
        }
    })
    win.setMenu(null);
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWin()
})