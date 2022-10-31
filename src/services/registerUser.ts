import config from "../utils/conf";

const registerCliUser = async () => {
  console.log(config.get("internalIpAddress"));
};

registerCliUser();
