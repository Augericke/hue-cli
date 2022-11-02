#! /usr/bin/env node
import { Command } from "commander";
import commandList from "./utils/commandList";

const program = new Command();

commandList.forEach((command) => {
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
