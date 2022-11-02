import axios from "axios";
import config from "../utils/conf";

interface CreateUserResponse {
  error: boolean;
  errorDescription?: string | undefined;
  username?: string | undefined;
}

const internalIp = config.get("internalIpAddress");
const userApi = axios.create({
  baseURL: `http://${internalIp}`,
});

const createUser = async (name?: string) => {
  try {
    const body = { devicetype: `hue-cli#${name || "user"}` };
    const { data } = await userApi.post("/api", body);

    let response: CreateUserResponse;
    if (Object.keys(data[0])[0] === "error") {
      response = {
        error: true,
        errorDescription: data[0].error.description,
      };
      return response;
    }

    response = {
      error: false,
      username: data[0].success.username,
    };

    // Save user locally
    config.set("cliUser", response.username);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  createUser,
};
