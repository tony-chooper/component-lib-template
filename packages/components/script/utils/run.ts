import { spawn } from "child_process";
export default async (command:string, path:string) => {
  const [cmd, ...args] = command.split(" ");
  return new Promise((resolve, reject) => {
    const app = spawn(cmd, args, {
      cwd: path, //执行命令的路径
      stdio: "inherit", //输出共享给父进程
      shell: true, //mac不需要开启，windows下git base需要开启支持
    });
    app.on("close", resolve);
  });
};
