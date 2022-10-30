import BaseCommand from "./baseCommand";

class Connect extends BaseCommand {
  constructor() {
    super("connect", "Initial setup to connect cli to hue philips bridge");
  }

  action() {
    this.result = "connected";
  }
}

module.exports = Connect;
