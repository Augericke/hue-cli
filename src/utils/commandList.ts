import BaseCommand from "../commands/baseCommand";

const normalizedPath = require("path").join(__dirname, "../commands");

const commandList: BaseCommand[] = require("fs")
  .readdirSync(normalizedPath)
  .filter(
    (file: string) => !file.includes("baseCommand") && !file.endsWith(".map"),
  )
  .map((file: string) => {
    const command = require(`${normalizedPath}/${file}`);
    return new command();
  });

export default commandList;
