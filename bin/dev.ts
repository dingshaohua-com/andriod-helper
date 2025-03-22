import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

// 获取参数
const args = process.argv.slice(2);
const projectName = args[0];

// 获取都有哪些项目
const appsDir = fs
  .readdirSync(path.resolve("apps"), { withFileTypes: true }) //读取目录的内容,如果 withFileTypes 则返回文件属性详情，不仅仅是路径字符串
  .filter((it) => ![".DS_Store"].includes(it.name));

// 读取项目(package.json)的信息，追加到 apps 字段内
const apps = appsDir.map((appDir) => {
  const { name, parentPath } = appDir;
  const pkgPath = path.join(parentPath, name, "package.json");
  const pkgString = fs.readFileSync(pkgPath, "utf8"); // 如果不指定编码格式，readFileSync 会返回一个 Buffer 对象
  return { ...appDir, ...JSON.parse(pkgString) };
});

// 根据项目启动顺序排序
apps.sort((a, b) => {
  return a.startSequence - b.startSequence;
});

// 启动
if (projectName) {
  const app = apps.find(it=>it.name===projectName);
  const appPath = path.join(app.parentPath, app.name);
  spawn('npm run', ['--prefix', appPath, 'dev'], {
    stdio: 'inherit',
    shell: true,
  });
} else {
  apps.forEach((app) => {
    const appPath = path.join(app.parentPath, app.name);
    spawn("npm run", ["--prefix", appPath, "dev"], {
      stdio: "inherit",
      shell: true,
    });
    console.log(`启动项目 ${app.name} 成功`);
  });
}

// Vite 项目的启动命令（如 npm run dev）通常会导致 主线程阻塞并等待子进程退出，这是由于 Vite 的开发服务器是一个 长期运行的进程，它不会主动退出，因此 spawnSync 会一直阻塞，主线程的后续代码也不会执行。
