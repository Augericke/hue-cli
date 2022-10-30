import BaseCommand from "./baseCommand";

class Room extends BaseCommand {
  constructor() {
    super("room", "Control lights on the room level");
  }

  action() {
    this.result = "todo: room";
  }
}

module.exports = Room;
