"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiosProvider_1 = __importDefault(require("../utils/axiosProvider"));
const getLights = async () => {
    /*
      ------------
      Returns a complete list of all lights connected to associated bridge
    */
    try {
        const { data } = await axiosProvider_1.default.get("/lights");
        const lightKeys = Object.keys(data);
        const lights = Object.values(data).map((light, index) => {
            light["id"] = lightKeys[index];
            return light;
        });
        return lights;
    }
    catch (error) {
        console.error(error);
    }
};
const getLight = async (id) => {
    /*
      id - id of light as returned by getLights()
      ------------
      Returns individual light determined by selected id
    */
    try {
        const { data } = await axiosProvider_1.default.get(`/lights/${id}`);
        return data;
    }
    catch (error) {
        console.error(error);
    }
};
const toggleLightOn = async (id, turnOn) => {
    /*
      id - id of light as returned by getLights()
      turnOn - boolean on whether light should be turned on or off
      ------------
      Turn light on or off
    */
    try {
        const body = { on: turnOn };
        const response = await axiosProvider_1.default.put(`/lights/${id}/state/`, body);
        return response;
    }
    catch (error) {
        console.error(error);
    }
};
// Adjust lights brightness (0 - 254)
const adjustLightBrightness = async (id, bri, bri_inc) => {
    /*
      id - id of light as returned by getLights()
      bri - sets brightness to a specific value (0 - 254)
      bri_inc - amount brightness can be incremented (-254 - 254). Exceeding the range will result in the light either turning on or off.
      ------------
      Adjust a lights brightness setting
    */
    try {
        const body = { on: true, bri_inc, bri };
        const response = await axiosProvider_1.default.put(`/lights/${id}/state/`, body);
        return response;
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = {
    getLights,
    getLight,
    toggleLightOn,
    adjustLightBrightness,
};
//# sourceMappingURL=lights.js.map