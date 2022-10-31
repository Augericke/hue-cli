import prompt from "prompt";
import BaseCommand from "./baseCommand";
import lightService from "../services/lights";

class Light extends BaseCommand {
  constructor() {
    super("light", "control an individual light");
  }

  action() {
    prompt.start();

    (async () => {
      try {
        const lights = await lightService.getLights();

        if (lights) {
          // Display all available lights
          lights.map((light) => {
            console.log(`(${light.id}) ${light.name}`);
          });
          console.log("----------------\n");

          // Prompt user to select a specific light
          prompt.get(
            {
              required: true,
              type: "number",
              name: "light",
              description:
                "Select a number from the available lights listed above",
              conform: function (value: number) {
                return Math.abs(value) <= lights.length && value > 0;
              },
              message:
                "Must choose a number from the available lights listed above",
            },
            (error, result) => {
              if (error) {
                return error.message;
              }

              const selectedLight = lights.find(
                (light) => light.id == result.light,
              );

              if (selectedLight) {
                console.log(
                  `You selected: ${selectedLight.name} (${selectedLight.id})`,
                );

                // Prompt user to toggle light on or off
                prompt.get(
                  [
                    {
                      required: false,
                      name: "toggle",
                      description: `Do you want to turn this light ${
                        selectedLight.state.on ? "off" : "on"
                      }? (y/n)`,
                      pattern: /^[YNyn]+$/,
                      message: "Either y or n",
                    },
                    {
                      required: false,
                      type: "number",
                      name: "brightness",
                      description: `Do you want to adjust the brightness (currently: ${selectedLight.state.bri}) [available range 0 - 254]`,
                      conform: function (value: number) {
                        return Math.abs(value) <= 254 && value >= 0;
                      },
                      // Only prompt if change in state results in the light being on
                      ask: function () {
                        return (
                          (prompt
                            .history("toggle")
                            ?.value.toLocaleLowerCase() === "y" &&
                            !selectedLight.state.on) ||
                          (prompt
                            .history("toggle")
                            ?.value.toLocaleLowerCase() === "n" &&
                            selectedLight.state.on)
                        );
                      },
                      message: "Brightness value must be between 0-254",
                    },
                  ],
                  function (error, result) {
                    if (error) {
                      return error.message;
                    }

                    const shouldToggle =
                      (result.toggle as string).toLocaleLowerCase() === "y";

                    // Toggle light state if changed
                    if (shouldToggle) {
                      lightService.toggleLightOn(
                        parseInt(selectedLight.id!),
                        !selectedLight.state.on,
                      );
                    }

                    // Toggle light brightness if provided
                    if (result.brightness) {
                      lightService.adjustLightBrightness(
                        parseInt(selectedLight.id!),
                        parseInt(result.brightness as string),
                      );
                    }
                  },
                );
              }
            },
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
    this.result = "Available lights \n----------------";
  }
}

module.exports = Light;
