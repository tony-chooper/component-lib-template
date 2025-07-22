import run from "../utils/run";
import { cliPath } from "../utils/paths";
import { series } from "gulp";
export const publishCli = async () => {
  run("release-it", `${cliPath}/cli`);
};
export default series(async () => publishCli());
