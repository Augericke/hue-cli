"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = __importDefault(require("prompt"));
const baseCommand_1 = __importDefault(require("./baseCommand"));
const lights_1 = __importDefault(require("../services/lights"));
class Light extends baseCommand_1.default {
    constructor() {
        super("light", "control an individual light");
    }
    action() {
        prompt_1.default.start();
        (async () => {
            try {
                const lights = await lights_1.default.getLights();
                if (lights) {
                    // Display all available lights
                    lights.map((light) => {
                        console.log(`(${light.id}) ${light.name}`);
                    });
                    console.log("----------------\n");
                    // Prompt user to select a specific light
                    prompt_1.default.get({
                        required: true,
                        type: "number",
                        name: "light",
                        description: "Select a number from the available lights listed above",
                        conform: function (value) {
                            return Math.abs(value) <= lights.length && value > 0;
                        },
                        message: "Must choose a number from the available lights listed above",
                    }, (error, result) => {
                        if (error) {
                            return error.message;
                        }
                        const selectedLight = lights.find((light) => light.id == result.light);
                        if (selectedLight) {
                            console.log(`You selected: ${selectedLight.name} (${selectedLight.id})`);
                            // Prompt user to toggle light on or off
                            prompt_1.default.get([
                                {
                                    required: false,
                                    name: "toggle",
                                    description: `Do you want to turn this light ${selectedLight.state.on ? "off" : "on"}? (y/n)`,
                                    pattern: /^[YNyn]+$/,
                                    message: "Either y or n",
                                },
                                {
                                    required: false,
                                    type: "number",
                                    name: "brightness",
                                    description: `Do you want to adjust the brightness? Currently: ${selectedLight.state.bri} [available range 0 - 254]`,
                                    conform: function (value) {
                                        return Math.abs(value) <= 254 && value >= 0;
                                    },
                                    // Only prompt if change in state results in the light being on
                                    ask: function () {
                                        var _a, _b;
                                        return ((((_a = prompt_1.default
                                            .history("toggle")) === null || _a === void 0 ? void 0 : _a.value.toLocaleLowerCase()) === "y" &&
                                            !selectedLight.state.on) ||
                                            (((_b = prompt_1.default
                                                .history("toggle")) === null || _b === void 0 ? void 0 : _b.value.toLocaleLowerCase()) === "n" &&
                                                selectedLight.state.on));
                                    },
                                    message: "Brightness value must be between 0-254",
                                },
                            ], function (error, result) {
                                if (error) {
                                    return error.message;
                                }
                                const shouldToggle = result.toggle.toLocaleLowerCase() === "y";
                                // Toggle light state if changed
                                if (shouldToggle) {
                                    lights_1.default.toggleLightOn(selectedLight.id, !selectedLight.state.on);
                                }
                                // Toggle light brightness if provided
                                if (result.brightness) {
                                    lights_1.default.adjustLightBrightness(selectedLight.id, result.brightness);
                                }
                            });
                        }
                    });
                }
            }
            catch (error) {
                return error;
            }
        })();
        this.result = "Available Lights \n----------------";
    }
}
module.exports = Light;
//# sourceMappingURL=light.js.map