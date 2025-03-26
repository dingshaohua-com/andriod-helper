const { contextBridge, ipcRenderer } = require("electron");

if (!window.electronApi) {
  // 获取主进程里的ipcMainHandlers
  let ipcMainHandlers = ipcRenderer.sendSync("getIcpHandler");
  ipcMainHandlers = JSON.parse(ipcMainHandlers);

  console.log('ipcMainHandlers', ipcMainHandlers);
  

  // 注入到渲染进程的electronApi对象中
  const electronAPIContent = {
    // onUsbChange: (callback) =>
    //   ipcRenderer.on("usbChange", (_event, value) => callback(value)),
  };
  ipcMainHandlers.forEach((handler) => {
    if (handler.type.indexOf("Function")>-1) { // Function or AsyncFunction
      electronAPIContent[handler.key] = function () {
        // @ts-ignore
        return ipcRenderer.invoke(handler.key, ...arguments);
      };
    } else {
      electronAPIContent[handler.key] = handler.val;
    }
  });

  contextBridge.exposeInMainWorld("$electron", electronAPIContent);
}
