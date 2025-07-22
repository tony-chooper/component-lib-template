import prompts from "prompts";
import gitClone from "./gilClone.js";
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import { readFile } from "fs/promises";

const pkg = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);

//配置命令参数
const optionDefinitions = [
  { name: "version", alias: "v", type: Boolean },
  { name: "help", alias: "h", type: Boolean },
];

//帮助命令
const helpSections = [
  {
    header: "custom-template",
    content: "一个快速生成项目的脚手架",
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
const promptsOptions = [
  {
    type: "text",
    name: "name",
    message: "请输入项目名称",
  },
  {
    type: "select", //单选
    name: "template",
    message: "请选择一个模板",
    choices: [
      { title: "vue3-template", value: 1 },
      { title: "element-plus-enhance", value: 2 },
      { title: "yto-engine", value: 3 },
    ],
  },
];
const options = commandLineArgs(optionDefinitions);
const remoteList = {
  1: "https://git.yto.net.cn/XiAnCenter/XiAn_yto_t/template/template-vue3.git",
  2: "https://git.yto.net.cn/XiAnCenter/XiAn_yto_t/public_resource/element-plus-enhance.git",
  3: "https://git.yto.net.cn/XiAnCenter/XiAn_yto_t/software-development-kit/yto-engine.git",
};
const createTemplate = async () => {
  const { name, template } = await prompts(promptsOptions);
  console.log("createTemplate---", name, template);
  if (!name || !template) return;
  gitClone(`direct:${remoteList[template]}`, name, {
    clone: true,
  });
};

const runOptions = () => {
  if (options.version) {
    console.log(`v${pkg.version}`);
    return;
  }
  if (options.help) {
    console.log(commandLineUsage(helpSections));
    return;
  }
  createTemplate();
};

runOptions();
