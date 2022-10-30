class BaseCommand {
  command: string;
  help: string;
  arguments: any[];
  options: any[];
  result: string | string[];

  constructor(
    name: string,
    descr: string,
    args: any[] = [],
    options: any[] = [],
  ) {
    this.command = name;
    this.help = descr;
    this.arguments = args;
    this.options = options;
    this.result = "";
  }

  getResult() {
    return this.result;
  }

  definition() {
    return {
      command: this.command,
      help: this.help,
      arguments: this.arguments,
      options: this.options,
    };
  }

  action(...args: any[]): any {
    throw Error("This method needs to be implemented by each specific command");
  }
}

export default BaseCommand;
