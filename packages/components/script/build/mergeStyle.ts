import { resolve, dirname } from "path";
import { globSync } from "glob";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  unlinkSync,
} from "fs";
import { distPath } from "../utils/paths";
import { series } from "gulp";
const processCssFiles = async (distType: "es" | "lib") => {
  // 匹配所有组件目录下的CSS文件
  const cssFiles = globSync(`${distPath}/dist/${distType}/src/*/*.css`);
  console.log(`处理 ${distType} 目录下的CSS文件:`, cssFiles);

  for (const cssFile of cssFiles) {
    try {
      // 读取CSS文件内容
      const cssContent = readFileSync(cssFile, "utf-8");

      // 构建目标style目录和文件路径
      const componentDir = dirname(cssFile);
      const styleDir = resolve(componentDir, "style");
      const targetFile = resolve(styleDir, "index.css");

      // 确保style目录存在
      if (!existsSync(styleDir)) {
        mkdirSync(styleDir, { recursive: true });
      }

      // 读取现有的index.css内容（如果存在）
      let existingContent = "";
      if (existsSync(targetFile)) {
        existingContent = readFileSync(targetFile, "utf-8");
      }

      // 合并CSS内容
      const mergedContent = existingContent
        ? `${existingContent}\n\n${cssContent}`
        : cssContent;

      // 写入合并后的CSS内容到目标文件
      writeFileSync(targetFile, mergedContent, "utf-8");

      // 删除原始CSS文件
      unlinkSync(cssFile);

      console.log(`处理完成 ${cssFile} -> ${targetFile}`);
    } catch (error) {
      console.error(`处理 ${cssFile} 时发生错误:`, error);
    }
  }
};

const copyUnocssStyleContent = async () => {
  // 依次处理es和lib目录
  await processCssFiles("es");
  await processCssFiles("lib");
};

const mergeStyle = () => {
  return series(async () => copyUnocssStyleContent());
};

export default mergeStyle();
