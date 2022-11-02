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
                            const availableOptions = [
                                `Turn ${!selectedLight.state.on ? "on" : "off"}`,
                                "Adjust brightness",
                            ];
                            console.log(`You selected: ${selectedLight.name} (${selectedLight.id})\n---------------`);
                            // Display all options
                            availableOptions.map((option, index) => {
                                console.log(`(${index + 1}) ${option}`);
                            });
                            console.log("---------------\n");
                            prompt_1.default.get({
                                required: true,
                                type: "number",
                                name: "action",
                                description: "Select a number from the available actions listed above",
                                conform: function (value) {
                                    return (Math.abs(value) <= availableOptions.length && value > 0);
                                },
                                message: "Must choose a number from the available options listed above",
                            }, async (error, result) => {
                                if (error) {
                                    return error.message;
                                }
                                const brightnessProperty = {
                                    properties: {
                                        brightness: {
                                            required: false,
                                            type: "number",
                                            name: "brightness",
                                            description: `Adjust the brightness. Currently: ${selectedLight.state.bri} [available range 0 - 254]`,
                                            conform: function (value) {
                                                return Math.abs(value) <= 254 && value >= 0;
                                            },
                                        },
                                    },
                                };
                                switch (result.action) {
                                    case 1: // Toggle Light
                                        lights_1.default.toggleLightOn(selectedLight.id, !selectedLight.state.on);
                                        break;
                                    case 2: // Adjust Brightness
                                        prompt_1.default.get(brightnessProperty, (error, result) => {
                                            lights_1.default.adjustLightBrightness(selectedLight.id, result.brightness);
                                        });
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