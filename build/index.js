"use strict";
var Command = require("commander").Command;
var program = new Command();
program
    .name("string-util")
    .description("CLI to some JavaScript string utilities")
    .version("0.8.0");
program
    .command("split")
    .description("Split a string into substrings and display as an array")
    .argument("<string>", "string to split")
    .option("--first", "display just the first substring")
    .option("-s, --separator <char>", "separator character", ",")
    .action(function (str, options) {
    var limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
});
program.parse();
//# sourceMappingURL=index.js.map