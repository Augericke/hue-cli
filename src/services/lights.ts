import api from "../utils/axiosProvider";

interface Light {
  state: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: [number, number];
    ct: number;
    colormode: string;
    reachable: true;
  };
  type: string;
  name: string;
  modelid: string;
  // ...
}

const getLights = async () => {
  /* 
    ------------
    Returns a complete list of all lights connected to associated bridge
  */

  try {
    const { data } = await api.get<Light[]>("/lights");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getLight = async (id: number) => {
  /* 
    id - id of light as returned by getLights()
    ------------
    Returns individual light determined by selected id
  */

  try {
    const { data } = await api.get<Light>(`/lights/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const toggleLightOn = async (id: number, turnOn: boolean) => {
  /* 
    id - id of light as returned by getLights()
    turnOn - boolean on whether light should be turned on or off
    ------------
    Turn light on or off
  */

  try {
    const body = { on: turnOn };
    const response = await api.put(`/lights/${id}/state/`, body);
    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
  }
};

// Adjust lights brightness (0 - 254)
const adjustLightBrightness = async (
  id: number,
  bri_inc?: number,
  bri?: number,
) => {
  /* 
    id - id of light as returned by getLights()
    bri_inc - amount brightness can be incremented (-254 - 254). Exceeding the range will result in the light either turning on or off.
    bri - sets brightness to a specific value (0 - 254)
    ------------
    Turn light on or off
  */

  try {
    const body = { bri_inc, bri };
    const response = await api.put(`/lights/${id}/state/`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// TODO: add service for changing color

export default {
  getLights,
  getLight,
  toggleLightOn,
  adjustLightBrightness,
};
