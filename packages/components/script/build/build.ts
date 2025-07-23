import delPath from "../utils/delpath";
import { src, dest, series, parallel } from "gulp";
import { distPath, componentPath } from "../utils/paths";
import less from "gulp-less";
import autoPrefixer from "gulp-autoprefixer";
import run from "../utils/run";
import gulpSass from "gulp-sass";
import SassLang from "sass";
import { readFileSync, writeFileSync } from "fs";

const sass = gulpSass(SassLang);
const removeDist = () => {
  return Promise.all([
    delPath(`${distPath}/dist/es`),
    delPath(`${distPath}/dist/lib`)
  ]);
};

const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.less`)
    .pipe(less())
    .pipe(autoPrefixer())
    .pipe(dest(`${distPath}/dist/lib/src`))
    .pipe(dest(`${distPath}/dist/es/src`));
};
const buildStyleSass = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(dest(`${distPath}/dist/lib/src`))
    .pipe(dest(`${distPath}/dist/es/src`));
};

const buildComponent = async () => {
  run("pnpm run build", componentPath);
};
const copyfile = (fileName: string) => {
  return src(`${componentPath}/${fileName}`).pipe(dest(`${distPath}/dist`));
};
const copyAndModifyPackageJson = async () => {
  const pkgPath = `${componentPath}/package.json`;
  const distPkgPath = `${distPath}/dist/package.json`;
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  pkg.name = "elementEnhance";
  writeFileSync(distPkgPath, JSON.stringify(pkg, null, 2), "utf-8");
};

export const execBuildTask = () => {
  return series(
    async () => removeDist(),
    parallel(
      //  () => buildStyle(),
      () => buildStyleSass(),
      () => buildComponent(),
      // () => copyfile("package.json"),
      // () => copyfile("README.md")
    )
  );
};
