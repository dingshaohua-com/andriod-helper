import { createOtherWindow } from "../../window";
import { clipboard } from "electron";

export const openWindow = (route, width, height) => {
  createOtherWindow(route, width, height);
};

export const copyToClipboard = (text) => {
  // 打开关于页面
  // 设置剪贴板内容为 'Example Text'
  clipboard.writeText(text);
};