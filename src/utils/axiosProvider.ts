import axios from "axios";
import config from "./conf";

const internalIp = config.get("internalIpAddress");
const cliUser = config.get("cliUser");

const api = axios.create({
  baseURL: `http://${internalIp}/api/${cliUser}`,
});

export default api;
