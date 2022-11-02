"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const conf_1 = __importDefault(require("./conf"));
const internalIp = conf_1.default.get("internalIpAddress");
const cliUser = conf_1.default.get("cliUser");
const api = axios_1.default.create({
    baseURL: `http://${internalIp}/api/${cliUser}`,
});
exports.default = api;
//# sourceMappingURL=axiosProvider.js.map