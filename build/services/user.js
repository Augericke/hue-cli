"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const conf_1 = __importDefault(require("../utils/conf"));
const internalIp = conf_1.default.get("internalIpAddress");
const userApi = axios_1.default.create({
    baseURL: `http://${internalIp}`,
});
const createUser = async (name) => {
    try {
        const body = { devicetype: `hue-cli#${name || "user"}` };
        const { data } = await userApi.post("/api", body);
        let response;
        if (Object.keys(data[0])[0] === "error") {
            response = {
                error: true,
                errorDescription: data[0].error.description,
            };
            return response;
        }
        response = {
            error: false,
            username: data[0].success.username,
        };
        // Save user locally
        conf_1.default.set("cliUser", response.username);
        return response;
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = {
    createUser,
};
//# sourceMappingURL=user.js.map