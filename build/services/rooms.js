"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiosProvider_1 = __importDefault(require("../utils/axiosProvider"));
const getRooms = async () => {
    /*
      ------------
      Returns a complete list of all rooms connected to associated bridge
    */
    try {
        const { data } = await axiosProvider_1.default.get("/groups");
        const groupKeys = Object.keys(data);
        const groups = Object.values(data).map((room, index) => {
            room["id"] = groupKeys[index];
            return room;
        });
        const rooms = groups.filter((group) => group.type === "Room");
        return rooms;
    }
    catch (error) {
        console.error(error);
    }
};
const getRoom = async (id) => {
    /*
      id - id of room as returned by getRooms()
      ------------
      Returns individual room determined by selected id
    */
    try {
        const { data } = await axiosProvider_1.default.get(`/groups/${id}`);
        return data;
    }
    catch (error) {
        console.error(error);
    }
};
const toggleRoomOn = async (id, turnOn) => {
    /*
      id - id of room as returned by getRooms()
      turnOn - boolean on whether all light in a room should be turned on or off
      ------------
      Turn all lights in a room either on or off
    */
    try {
        const body = { on: turnOn };
        const response = await axiosProvider_1.default.put(`/groups/${id}/action/`, body);
        return response;
    }
    catch (error) {
        console.error(error);
    }
};
const toggleRoomScene = async (id, scene) => {
    try {
        const body = { on: true, scene };
        const response = await axiosProvider_1.default.put(`/groups/${id}/action/`, body);
        return response;
    }
    catch (error) {
        console.error(error);
    }
};
// Adjust room brightness (0 - 254)
const adjustRoomBrightness = async (id, bri, bri_inc) => {
    /*
      id - id of room as returned by getRooms()
      bri - sets brightness to a specific value (0 - 254)
      bri_inc - amount brightness can be incremented (-254 - 254). Exceeding the range will result in the light either turning on or off.
      ------------
      Adjust brightness of all lights in a room
    */
    try {
        const body = { on: true, bri_inc, bri };
        const response = await axiosProvider_1.default.put(`/groups/${id}/action/`, body);
        return response;
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = {
    getRooms,
    getRoom,
    toggleRoomOn,
    toggleRoomScene,
    adjustRoomBrightness,
};
//# sourceMappingURL=rooms.js.map