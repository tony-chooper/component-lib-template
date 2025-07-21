import prompts from "prompts";
import gitClone from "./gilClone.js";

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
      { title: "kitty-ui", value: 1 },
      { title: "easyest", value: 2 },
    ],
  },
];
const remoteList = {
  1: "https://git.yto.net.cn/XiAnCenter/XiAn_yto_t/data-platform/alert-pc.git",
  2: "https://github.com/qddidi/easyest.git",
};
const getUserInfo = async () => {
  const { name, template } = await prompts(promptsOptions);
  console.log("getUserInfo---", name, template);
  if (!name || !template) return;
  gitClone(`direct:${remoteList[template]}`, name, {
    clone: true,
  });
};
getUserInfo();
