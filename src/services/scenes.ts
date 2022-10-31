import api from "../utils/axiosProvider";

interface Scene {
  id?: string;
  name: string;
  type: string;
  group: string;
  lights: string[];
  //
}

const getGroupScenes = async () => {
  /* 
    ------------
    Returns a complete list of all user created group scenes connected to associated bridge
  */

  try {
    const { data } = await api.get<Record<string, Scene>>("/scenes");
    const sceneKeys = Object.keys(data);
    const scenes = Object.values(data).map((scene, index) => {
      scene["id"] = sceneKeys[index];

      return scene;
    });

    const groupScenes = scenes.filter(
      (scene) =>
        scene.type === "GroupScene" && !scene.name.includes("storageScene"),
    );

    return groupScenes;
  } catch (error) {
    console.error(error);
  }
};

const getRoomScenes = async (roomId: number) => {
  /* 
    roomId - id of room that scenes belong to
    ------------
    Returns individual light determined by selected id
  */

  try {
    const { data } = await api.get<Record<string, Scene>>("/scenes");
    const sceneKeys = Object.keys(data);
    const scenes = Object.values(data).map((scene, index) => {
      scene["id"] = sceneKeys[index];

      return scene;
    });

    const groupScenes = scenes.filter(
      (scene) =>
        scene.type === "GroupScene" &&
        !scene.name.includes("storageScene") &&
        scene.group === roomId.toString(),
    );

    return groupScenes;
  } catch (error) {
    console.error(error);
  }
};

export default [getGroupScenes, getRoomScenes];
