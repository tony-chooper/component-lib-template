import { createApp } from "vue";
import App from "./App.vue";
import 'amfe-flexible'
import "virtual:uno.css";
import "./style.scss"
const app = createApp(App);
// app.use(YtoCustom);
app.mount("#app");
