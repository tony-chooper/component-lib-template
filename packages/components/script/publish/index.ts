import run from "../utils/run";
import { distPath } from "../utils/paths";
import { series } from "gulp";
export const publishComponent = async () => {
  run("release-it --npm.tag=latest --npm.skipChecks --preRelease=beta", `${distPath}/dist`);
};
export default series(async () => publishComponent());
