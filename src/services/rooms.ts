import api from "../utils/axiosProvider";

interface Room {
  id?: string;
  name: string;
  lights: string[];
  sensors: string[];
  type: string;
  state: {
    all_on: boolean;
    any_on: boolean;
  };
  action: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: "none" | "colorloop";
    xy: [number, number];
    ct: number;
    alert: string;
    colormode: string;
  };
  // ...
}

const getRooms = async () => {
  /* 
    ------------
    Returns a complete list of all rooms connected to associated bridge
  */

  try {
    const { data } = await api.get<Record<string, Room>>("/groups");
    const groupKeys = Object.keys(data);
    const groups = Object.values(data).map((room, index) => {
      room["id"] = groupKeys[index];

      return room;
    });

    const rooms = groups.filter((group) => group.type === "Room");
    return rooms;
  } catch (error) {
    console.error(error);
  }
};

const getRoom = async (id: string) => {
  /*
    id - id of room as returned by getRooms()
    ------------
    Returns individual room determined by selected id
  */

  try {
    const { data } = await api.get<Room>(`/groups/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const toggleRoomOn = async (id: string, turnOn: boolean) => {
  /* 
    id - id of room as returned by getRooms()
    turnOn - boolean on whether all light in a room should be turned on or off
    ------------
    Turn all lights in a room either on or off
  */

  try {
    const body = { on: turnOn };
    const response = await api.put(`/groups/${id}/action/`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const toggleRoomScene = async (id: string, scene: string) => {
  try {
    const body = { on: true, scene };
    const response = await api.put(`/groups/${id}/action/`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Adjust room brightness (0 - 254)
const adjustRoomBrightness = async (
  id: string,
  bri?: number,
  bri_inc?: number,
) => {
  /* 
    id - id of room as returned by getRooms()
    bri - sets brightness to a specific value (0 - 254)
    bri_inc - amount brightness can be incremented (-254 - 254). Exceeding the range will result in the light either turning on or off.
    ------------
    Adjust brightness of all lights in a room
  */

  try {
    const body = { on: true, bri_inc, bri };
    const response = await api.put(`/groups/${id}/action/`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getRooms,
  getRoom,
  toggleRoomOn,
  toggleRoomScene,
  adjustRoomBrightness,
};
