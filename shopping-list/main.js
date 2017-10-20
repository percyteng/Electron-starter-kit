const electron = require('electron')
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

//SET ENV
// process.env.NODE_ENV='production';
let mainWindow, addWindow;


// Listen for app to be ready
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
  
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
function createWindow(){
    //create new window
    mainWindow = new BrowserWindow({width: 800, height: 600});
    // load html file into the window

    //quit app when closed
    mainWindow.on('close', ()=>{
        app.quit();
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
}
//hanlde add window
function createAddWindow(){
    //create new window
    addWindow = new BrowserWindow({width: 300, height: 200});
    // load html file into the window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'html/addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    //garbage collection
    addWindow.on('close', ()=>{
        addWindow = null;
    })
}
//Catch item add
ipcMain.on('item:add', (e, item)=>{
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
})
// Create menu template
const mainMenuTemp = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('itemClear')
                }
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                },
                accelerator: 
                process.platform === 'darwin'?'Command+Q':'Ctrl+Q'
            }
        ],
    }
];
if (process.platform = 'darwin')
    mainMenuTemp.unshift({});


if (process.env.NODE_ENV !== 'production'){
    mainMenuTemp.push({
        label: 'Dev Tools',
        submenu:[
            {
                label:'Toggle Dev Tools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                 },
                 accelerator: 
                 process.platform === 'darwin'?'Command+I':'Ctrl+I'
            },
            {
                role: 'reload'
            }
        ]
    })
} 
exports.openWindow = (fileName, wid, hei)=>{
    // win.currentOpenWindow().close()
    let win = new BrowserWindow({width:wid, height: hei})
    win.loadURL(`file://${__dirname}/../html/` + fileName + `.html`)
}