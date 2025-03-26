import shelljs from "shelljs";
import path from "node:path";

shelljs.config.execPath = shelljs.which("node");
const apktool = path.resolve("src", "tools", "apktool_2.8.1.jar");
const javaPath = path.resolve("src", "tools", "jre", "bin", "java");
export const execJar = (str) => {
  const shellScript = `${javaPath} ${str}`;
  return new Promise((resolve) => {
    shelljs.exec(shellScript, { silent: true }, (code, stdout, stderr) => {
      resolve({ data: stderr || stdout, dtl: { code, stdout, stderr } });
    });
  });
};

export const execApkTool = (str) => {
  const res = execJar(`-jar ${apktool} ${str}`);
  return res;
};

export const execShell = (str) => {
  return new Promise((resolve) => {
    shelljs.exec(str, { silent: true }, (code, stdout, stderr) => {
      resolve({ data: stderr || stdout, dtl: { code, stdout, stderr } });
    });
  });
};
