import { createMainWindow } from "./window";
import { app, BrowserWindow, dialog } from "electron";
import {registerHandlerForMainAndPreload } from "./ipc/index";

global.app = {
  
}

//  当 Electron 准备完成的时候将会被触发此钩子，这个阶段你可以创建浏览器 窗口，并且执行一些其它API
app.whenReady().then(() => {
  
  global.mainWindow = createMainWindow();
  registerHandlerForMainAndPreload();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      global.mainWindow = createMainWindow();
    }
  });
});

// windows下关闭所有窗口时退出应用（macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});