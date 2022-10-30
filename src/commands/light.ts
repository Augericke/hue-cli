import BaseCommand from "./baseCommand";

class Light extends BaseCommand {
  constructor() {
    super("light", "Control an individual light");
  }

  action() {
    this.result = "todo: light";
  }
}

module.exports = Light;
