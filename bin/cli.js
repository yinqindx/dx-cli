#!/usr/bin/env node
const args = process.argv.slice(1, 2);
const { Plop, run } = require("plop");
const argv = require("minimist")(args);
const path = require("path");

const DXCONFIG_PATH = path.join(__dirname, "../src/index.js");
const command = process.argv.slice(2, 3)[0];

const GENERATOR_COMMAND = ['component', 'page']

if (GENERATOR_COMMAND.includes(command)) {
  Plop.launch(
    {
      cwd: argv.cwd,
      configPath: DXCONFIG_PATH,
      require: argv.require,
      completion: argv.completion,
    },
    run
  );
}
