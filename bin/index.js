#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commandList_1 = __importDefault(require("./utils/commandList"));
const program = new commander_1.Command();
commandList_1.default.forEach((command) => {
    const commendDef = command.definition();
    const subCommand = program
        .command(commendDef.command)
        .description(commendDef.help);
    commendDef.arguments.forEach((arg, index) => {
        subCommand.argument(arg[index]);
    });
    commendDef.options.forEach((option, index) => {
        subCommand.option(option[index]);
    });
    subCommand.action(function () {
        //@ts-ignore
        command.action.apply(command, arguments);
        console.log(command.getResult());
    });
});
program.parse();
//# sourceMappingURL=index.js.map