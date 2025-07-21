import delPath from "../utils/delpath";
import { series, parallel, src, dest } from "gulp";
import { distPath, componentPath } from "../utils/paths";
import less from "gulp-less";
import autoPrefixer from "gulp-autoprefixer";
import run from "../utils/run";
import gulpSass from 'gulp-sass'
import SassLang from 'sass'

const sass = gulpSass(SassLang)
const removeDist = () => {
  return delPath(`${distPath}/dist`);
};

const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.less`)
    .pipe(less())
    .pipe(autoPrefixer())
    .pipe(dest(`${distPath}/dist/lib/src`))
    .pipe(dest(`${distPath}/dist/es/src`));
};
export const buildStyleSass = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
  .pipe(sass())
  .pipe(autoPrefixer())
  .pipe(dest(`${distPath}/dist/lib/src`))
  .pipe(dest(`${distPath}/dist/es/src`));
};

const buildComponent = async () => {
  run("pnpm run build", componentPath);
};
const copyfile = (fileName:string) => {
  return src(`${componentPath}/${fileName}`).pipe(dest(`${distPath}/dist`))
}
export default series(
  async () => removeDist(),
  parallel(
    //  () => buildStyle(),
     () => buildStyleSass(),
     () => buildComponent(),
     () => copyfile('package.json'),
     () => copyfile('README.md')
  )
);
