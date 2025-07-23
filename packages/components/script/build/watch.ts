import { watch } from "gulp";
import {  componentPath } from "../utils/paths";
import { execBuildTask } from './build'

const buildComponentWatch = () => {
  watch(
    [
      `${componentPath}/src/**/*`, // 监听源码
      `${componentPath}/src/**/style/**.scss`, // 监听 scss
    ],
    execBuildTask()
  )
}

export default buildComponentWatch