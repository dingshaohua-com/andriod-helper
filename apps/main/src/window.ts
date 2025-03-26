import path from "node:path";
import { app, BrowserWindow, nativeImage } from "electron";
import parseUrl from "./utils/parseurl";

const { isPackaged } = app;
const webDevServer = "http://localhost:3001";
export const createMainWindow = () => {
  // 创建主应用窗口
  const mainWinOtp: any = {
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    resizable: false,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, isPackaged ? "preload.js" : "preload.ts"),
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
    const renderEntry = path.join(__dirname, "src", "render", "index.html");
    mainWin.loadFile(renderEntry);
  } else {
    mainWin.loadURL(webDevServer);
  }
  return mainWin;
};

export const createOtherWindow = (route, width = 600, height = 400) => {
  const mainWin = global.app.mainWindow;
  //   const parentBounds = mainWin.getBounds();
  //   const x = Math.round(parentBounds.x + (parentBounds.width - 400) / 2); // 假设子窗口宽度为400
  //   const y = Math.round(parentBounds.y + (parentBounds.height - 300) / 2); // 假设子窗口高度为300
  // 创建关于应用窗口
  const winOtp = {
    x: 400,
    y: 400,
    parent: mainWin,
    // modal: true,
    width,
    height,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, isPackaged ? "preload.js" : "preload.ts"),
    },
    backgroundColor: "#fff",
    icon: nativeImage.createEmpty(),
    autoHideMenuBar: true, // 子窗口不需要在要完整的父窗口的菜单栏
    // frame: false, // 隐藏标题栏
    // title: "关于",
  };
  const win = new BrowserWindow(winOtp);
  //   win.setMinimizable(false); // 隐藏窗口的最小化按钮
  //   win.setMaximizable(false); // 隐藏窗口的最大化按钮

  const { isAbsPath } = parseUrl(route);
  if (isAbsPath) {
    win.loadURL(route);
  } else {
    if (app.isPackaged) {
      const entryPath = path.resolve(
        __dirname,
        "..",
        "src",
        "web",
        "index.html"
      );
      win.loadFile(entryPath, { hash: route });
    } else {
      // win.loadURL(webDevServer + "/#" + route); // hash router
      win.loadURL(webDevServer + route); // history router
    }
  }

  return win;
};
