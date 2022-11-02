"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = __importDefault(require("prompt"));
const conf_1 = __importDefault(require("../utils/conf"));
const baseCommand_1 = __importDefault(require("./baseCommand"));
const internalAddress_1 = __importDefault(require("../services/internalAddress"));
const user_1 = __importDefault(require("../services/user"));
class Connect extends baseCommand_1.default {
    constructor() {
        super("connect", "initial setup to connect to your hue philips bridge");
    }
    action() {
        prompt_1.default.start();
        (async () => {
            try {
                prompt_1.default.get({
                    required: true,
                    name: "internalIp",
                    description: "Are you connected to the same wifi address as your bridge? (y/n)",
                    pattern: /^[YNyn]+$/,
                    message: "Either y or n",
                }, async function (error, result) {
                    if (error) {
                        return error.message;
                    }
                    const normalizedResult = result.internalIp.toLocaleLowerCase();
                    if (normalizedResult === "n") {
                        console.log("Connect to the same wifi address as your bridge and try again.");
                    }
                    if (normalizedResult === "y") {
                        await (0, internalAddress_1.default)();
                        if (conf_1.default.get("internalIpAddress")) {
                            prompt_1.default.get({
                                required: true,
                                name: "user",
                                description: "I have hit the connect button on the light bridge (within 20 seconds ago) and am ready to begin the connection (y/n)",
                                pattern: /^[YNyn]+$/,
                                message: "Either y or n",
                            }, async function (error, result) {
                                if (error) {
                                    return error.message;
                                }
                                const normalizedResult = result.user.toLocaleLowerCase();
                                if (normalizedResult === "n") {
                                    ("Hit the connection button and try connecting again.");
                                }
                                if (normalizedResult === "y") {
                                    let triesCounter = 0;
                                    let connected = false;
                                    while (triesCounter < 4 && !connected) {
                                        console.log(`Attempting connection ${triesCounter === 0 ? "" : `(${triesCounter})`} `);
                                        try {
                                            const response = await user_1.default.createUser();
                                            if (!(response === null || response === void 0 ? void 0 : response.error)) {
                                                connected = true;
                                                console.log("Successfully linked cli with your hue bridge! ");
                                                break;
                                            }
                                            else {
                                            }
                                        }
                                        catch (err) {
                                            console.log(err);
                                        }
                                        // Sleep for 3 seconds and then increment
                                        await new Promise((resolve) => setTimeout(resolve, 3000));
                                        triesCounter++;
                                        if (triesCounter === 4) {
                                            console.error("Unable to link cli with bridge. Make sure you are on the same wifi and have clicked the connect button atop the bridge within 20 seconds of trying to connect.");
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
            catch (error) { }
        })();
        this.result = "";
    }
}
module.exports = Connect;
//# sourceMappingURL=connect.js.map