import { spawnSync } from "node:child_process";
import fsExtra from 'fs-extra';


spawnSync("npx", ["tsc"], { stdio: "inherit", shell: true });
fsExtra.copySync("./src/render","./dist/render");
spawnSync("npx", ["electron-builder"], { stdio: "inherit", shell: true });