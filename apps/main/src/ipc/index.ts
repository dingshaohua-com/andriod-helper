// 此文件不需要动
import path from "node:path";
import { readdirSync } from "node:fs";
import { ipcMain } from "electron";
import importSync from "import-sync";

export const getIcpMainHandler = () => {
  let allHandler = {};
  const dirs = readdirSync(path.join(__dirname, "handlers"), "utf8");
  for (const file of dirs) {
    const filePath = path.join(__dirname, "handlers", file);
    const handlersTemp = importSync(filePath);
    let handlers = {};
    for (const key in handlersTemp) {
      const handler = handlersTemp[key];
      let handlerType = Object.prototype.toString.call(handler);
      const match = handlerType.match(/^\[object (\w+)\]$/);
      handlerType = match[1];
      handlers[key] = {
        key,
        type: handlerType,
        val: handler,
      };
    }
    allHandler = {
      ...allHandler,
      ...handlers,
    };
  }
  return allHandler;
};

// 主进程中定义（注册） ipcMain.handle方法
export const registerHandlerForIcpMain = () => {
  const ipcMainHandlers = getIcpMainHandler();
  for (const key in ipcMainHandlers) {
    const handler = ipcMainHandlers[key];
    if (handler.type.indexOf("Function")>-1) {
      ipcMain.handle(key, (event, ...params) => handler.val(...params));
    }
  }
};

// 渲染进程定义（注册） ipcMain.handle方法
export const registerHandlerForPreload = () => {
  const ipcMainHandlers = getIcpMainHandler();
  return Object.values(ipcMainHandlers);
};

// 以上两个方法的汇总
export const registerHandlerForMainAndPreload = () => {
  registerHandlerForIcpMain();
  ipcMain.on("getIcpHandler", (event, data) => {
    const res = registerHandlerForPreload();
    event.returnValue = JSON.stringify(res);
  });
};
