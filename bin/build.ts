
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const projectName = args[0];
if (projectName === "main") {
    fs.rmSync("dist", { recursive: true, force: true });
    const webPath = path.resolve("apps", "web");
    const mainPath = path.resolve("apps", "main");
    spawnSync("npm run", ["--prefix", webPath, "build"], { stdio: "inherit", shell: true });
    spawn("npm run", ["--prefix", mainPath, "build"], { stdio: "inherit", shell: true });
} else if (projectName === "website") {
    const projectPath = path.resolve("src", "apps", projectName);
    spawn("npm run", ["--prefix", projectPath, "build"], {
        stdio: "inherit",
        shell: true,
    });
} else {
    console.log("Invalid project name");
}
