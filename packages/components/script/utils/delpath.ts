import fs from "fs";
import { resolve } from "path";
import { distPath } from "./paths";

const stayFile = ["package.json", "README.md"];

const delPath = async (path:string) => {
  console.log("delPath", path);
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    console.log("delPath", files);
    files.forEach(async (file) => {
      let curPath = resolve(path, file);
      if (fs.statSync(curPath).isDirectory()) {
        if (file != "node_modules") await delPath(curPath);
      } else {
        if (!stayFile.includes(file)) {
          fs.unlinkSync(curPath);
        }
      }
    });
    if (path != `${distPath}/dist`) fs.rmdirSync(path);
  }
};

export default delPath;
