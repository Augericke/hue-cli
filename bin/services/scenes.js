"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiosProvider_1 = __importDefault(require("../utils/axiosProvider"));
const getGroupScenes = async () => {
    /*
      ------------
      Returns a complete list of all user created group scenes connected to associated bridge
    */
    try {
        const { data } = await axiosProvider_1.default.get("/scenes");
        const sceneKeys = Object.keys(data);
        const scenes = Object.values(data).map((scene, index) => {
            scene["id"] = sceneKeys[index];
            return scene;
        });
        const groupScenes = scenes.filter((scene) => scene.type === "GroupScene" && !scene.name.includes("storageScene"));
        return groupScenes;
    }
    catch (error) {
        console.error(error);
    }
};
const getRoomScenes = async (roomId) => {
    /*
      roomId - id of room that scenes belong to
      ------------
      Returns all scenes for selected room
    */
    try {
        const { data } = await axiosProvider_1.default.get("/scenes");
        const sceneKeys = Object.keys(data);
        const scenes = Object.values(data).map((scene, index) => {
            scene["id"] = sceneKeys[index];
            return scene;
        });
        const groupScenes = scenes.filter((scene) => scene.type === "GroupScene" &&
            !scene.name.includes("storageScene") &&
            scene.group === roomId.toString());
        return groupScenes;
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = {
    getGroupScenes,
    getRoomScenes,
};
//# sourceMappingURL=scenes.js.map