"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = __importDefault(require("prompt"));
const baseCommand_1 = __importDefault(require("./baseCommand"));
const rooms_1 = __importDefault(require("../services/rooms"));
const scenes_1 = __importDefault(require("../services/scenes"));
class Room extends baseCommand_1.default {
    constructor() {
        super("room", "control all lights in a specific room");
    }
    action() {
        prompt_1.default.start();
        (async () => {
            try {
                const rooms = await rooms_1.default.getRooms();
                if (rooms) {
                    // Display all available rooms
                    rooms.map((room, index) => {
                        console.log(`(${index + 1}) ${room.name}`);
                    });
                    console.log("---------------\n");
                    // Prompt user to select a specific room
                    prompt_1.default.get({
                        required: true,
                        type: "number",
                        name: "room",
                        description: "Select a number from the available rooms listed above",
                        conform: function (value) {
                            return Math.abs(value) <= rooms.length && value > 0;
                        },
                        message: "Must choose a number from the available rooms listed above",
                    }, (error, result) => {
                        if (error) {
                            return error.message;
                        }
                        const selectedRoom = rooms[result.room - 1];
                        if (selectedRoom) {
                            const availableOptions = [
                                `Turn ${!selectedRoom.state.all_on ? "on" : "off"}`,
                                "Adjust brightness",
                                "Select scene",
                            ];
                            console.log(`\nYou selected: ${selectedRoom.name} (${result.room})\n---------------`);
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
                                            description: `Adjust the brightness. Currently: ${selectedRoom.action.bri} [available range 0 - 254]`,
                                            conform: function (value) {
                                                return Math.abs(value) <= 254 && value >= 0;
                                            },
                                        },
                                    },
                                };
                                switch (result.action) {
                                    case 1: // Toggle Lights
                                        rooms_1.default.toggleRoomOn(selectedRoom.id, !selectedRoom.state.all_on);
                                        break;
                                    case 2: // Adjust Brightness
                                        prompt_1.default.get(brightnessProperty, (error, result) => {
                                            rooms_1.default.adjustRoomBrightness(selectedRoom.id, result.brightness);
                                        });
                                        break;
                                    case 3: // Select Scene
                                        const scenes = await scenes_1.default.getRoomScenes(selectedRoom.id);
                                        if (scenes) {
                                            // Display all available scenes
                                            console.log("\nAvailable Scenes\n---------------");
                                            scenes.map((scene, index) => {
                                                console.log(`(${index + 1}) ${scene.name}`);
                                            });
                                            console.log("---------------\n");
                                            // Prompt user to select a specific scene
                                            prompt_1.default.get({
                                                required: true,
                                                type: "number",
                                                name: "scene",
                                                description: "Select a number from the available scenes listed above",
                                                conform: function (value) {
                                                    return (Math.abs(value) <= scenes.length && value > 0);
                                                },
                                                message: "Must choose a number from the available scenes listed above",
                                            }, (error, result) => {
                                                if (error) {
                                                    return error.message;
                                                }
                                                const selectedScene = scenes[result.scene - 1];
                                                rooms_1.default.toggleRoomScene(selectedRoom.id, selectedScene.id);
                                            });
                                        }
                                        break;
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
        this.result = "Available Rooms \n---------------";
    }
}
module.exports = Room;
//# sourceMappingURL=room.js.map