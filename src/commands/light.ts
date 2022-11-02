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
                const availableOptions = [
                  `Turn ${!selectedLight.state.on ? "on" : "off"}`,
                  "Adjust brightness",
                ];

                console.log(
                  `You selected: ${selectedLight.name} (${selectedLight.id})\n---------------`,
                );

                // Display all options
                availableOptions.map((option, index) => {
                  console.log(`(${index + 1}) ${option}`);
                });
                console.log("---------------\n");

                prompt.get(
                  {
                    required: true,
                    type: "number",
                    name: "action",
                    description:
                      "Select a number from the available actions listed above",
                    conform: function (value: number) {
                      return (
                        Math.abs(value) <= availableOptions.length && value > 0
                      );
                    },
                    message:
                      "Must choose a number from the available options listed above",
                  },
                  async (error, result) => {
                    if (error) {
                      return error.message;
                    }

                    const brightnessProperty: prompt.Schema = {
                      properties: {
                        brightness: {
                          required: false,
                          type: "number",
                          name: "brightness",
                          description: `Adjust the brightness. Currently: ${selectedLight.state.bri} [available range 0 - 254]`,
                          conform: function (value: number) {
                            return Math.abs(value) <= 254 && value >= 0;
                          },
                        },
                      },
                    };

                    switch (result.action) {
                      case 1: // Toggle Light
                        lightService.toggleLightOn(
                          selectedLight.id!,
                          !selectedLight.state.on,
                        );
                        break;
                      case 2: // Adjust Brightness
                        prompt.get(brightnessProperty, (error, result) => {
                          lightService.adjustLightBrightness(
                            selectedLight.id!,
                            result.brightness as number,
                          );
                        });
                    }
                  },
                );
              }
            },
          );
        }
      } catch (error) {
        return error;
      }
    })();
    this.result = "Available Lights \n----------------";
  }
}

module.exports = Light;
