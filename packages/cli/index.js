#! /usr/bin/env node

import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import { readFile } from "fs/promises";

const pkg = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);

//配置命令参数
// const optionDefinitions = [{ name: "version", alias: "v", type: Boolean }];
// const options = commandLineArgs(optionDefinitions);
// if (options.version) {
//   console.log(`v${pkg.version}`);
// }

const helpSections = [
  {
    header: "create-custom-components",
    content: "一个快速生成组件库搭建环境的脚手架",
  },
  {
    header: "Options",
    optionList: [
      {
        name: "version",
        alias: "v",
        typeLabel: "{underline boolean}",
        description: "版本号",
      },
      {
        name: "help",
        alias: "h",
        typeLabel: "{underline boolean}",
        description: "帮助",
      },
    ],
  },
];
const options = commandLineUsage(helpSections);
console.log(options);

// if (options.help) {
// console.log(commandLineUsage(helpSections));
// return;
// }
