import path from "node:path";
import { app, BrowserWindow } from "electron";

const { isPackaged } = app;
export const createMainWindow = () => {
    // 创建主应用窗口
    const mainWinOtp:any = {
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        resizable: false,
        webPreferences: {
            webSecurity: false,
            preload: path.join(__dirname, isPackaged?'preload.js':'preload.ts'),
        },
        // titleBarStyle: "hidden",
        titleBarOverlay: {
            color: "rgba(0,0,0,0)",
            height: 35,
            symbolColor: "white",
        },
    };
    const mainWin = new BrowserWindow(mainWinOtp);
    mainWin.setMaximizable(false);
    if (isPackaged) {
        const renderEntry = path.join(__dirname,'src','render', 'index.html');
        mainWin.loadFile(renderEntry);
    } else {
        mainWin.loadURL("http://localhost:3001");
    }
    return mainWin;
};