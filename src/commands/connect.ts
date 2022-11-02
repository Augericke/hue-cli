import prompt from "prompt";
import config from "../utils/conf";
import BaseCommand from "./baseCommand";
import setInternalAddress from "../services/internalAddress";
import userService from "../services/user";

class Connect extends BaseCommand {
  constructor() {
    super("connect", "initial setup to connect to your hue philips bridge");
  }

  action() {
    prompt.start();

    (async () => {
      try {
        prompt.get(
          {
            required: true,
            name: "internalIp",
            description:
              "Are you connected to the same wifi address as your bridge? (y/n)",
            pattern: /^[YNyn]+$/,
            message: "Either y or n",
          },
          async function (error, result) {
            if (error) {
              return error.message;
            }

            const normalizedResult = (
              result.internalIp as string
            ).toLocaleLowerCase();

            if (normalizedResult === "n") {
              console.log(
                "Connect to the same wifi address as your bridge and try again.",
              );
            }

            if (normalizedResult === "y") {
              await setInternalAddress();
              if (config.get("internalIpAddress")) {
                prompt.get(
                  {
                    required: true,
                    name: "user",
                    description:
                      "I have hit the connect button on the light bridge (within 20 seconds ago) and am ready to begin the connection (y/n)",
                    pattern: /^[YNyn]+$/,
                    message: "Either y or n",
                  },
                  async function (error, result) {
                    if (error) {
                      return error.message;
                    }

                    const normalizedResult = (
                      result.user as string
                    ).toLocaleLowerCase();

                    if (normalizedResult === "n") {
                      ("Hit the connection button and try connecting again.");
                    }

                    if (normalizedResult === "y") {
                      let triesCounter = 0;
                      let connected = false;
                      while (triesCounter < 4 && !connected) {
                        console.log(
                          `Attempting connection ${
                            triesCounter === 0 ? "" : `(${triesCounter})`
                          } `,
                        );
                        try {
                          const response = await userService.createUser();
                          if (!response?.error) {
                            connected = true;
                            console.log(
                              "Successfully linked cli with your hue bridge! ",
                            );
                            break;
                          } else {
                          }
                        } catch (err) {
                          console.log(err);
                        }

                        // Sleep for 3 seconds and then increment
                        await new Promise((resolve) =>
                          setTimeout(resolve, 3000),
                        );

                        triesCounter++;

                        if (triesCounter === 4) {
                          console.error(
                            "Unable to link cli with bridge. Make sure you are on the same wifi and have clicked the connect button atop the bridge within 20 seconds of trying to connect.",
                          );
                        }
                      }
                    }
                  },
                );
              }
            }
          },
        );
      } catch (error) {}
    })();

    this.result = "";
  }
}

module.exports = Connect;
