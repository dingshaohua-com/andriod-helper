import { createOtherWindow } from "../../window";
import shelljs from "shelljs";
import path from "node:path";
shelljs.config.execPath = shelljs.which("node");

const jrePath = path.resolve("src", "tools", "jre", "bin");
export const openWindow = (route, width, height) => {
  createOtherWindow(route, width, height);
};

export const execJar = (str) => {
  return new Promise((resolve) => {
    shelljs.exec(
      `java ${str}`,
      { silent: true, execPath: jrePath },
      (code, stdout, stderr) => {
        resolve({ data: stderr || stdout , dtl: {code, stdout, stderr} });
      }
    );
  });
};

export const execApkTool = (str) => {
  const apktool = path.resolve("src", "tools", "apktool_2.8.1.jar");
  const res = execJar(`${apktool} --version`)
  return res;
};


export const execShell = (str) => {
  return new Promise((resolve) => {
    shelljs.exec(
      "java -version",
      { silent: true, execPath: jrePath },
      (code, stdout, stderr) => {
        resolve({ data: stderr || stdout , dtl: {code, stdout, stderr} });
      }
    );
  });
};
