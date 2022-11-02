"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizedPath = require("path").join(__dirname, "../commands");
const commandList = require("fs")
    .readdirSync(normalizedPath)
    .filter((file) => !file.includes("baseCommand") && !file.endsWith(".map"))
    .map((file) => {
    const command = require(`${normalizedPath}/${file}`);
    return new command();
});
exports.default = commandList;
//# sourceMappingURL=commandList.js.map