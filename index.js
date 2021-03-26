#!/usr/bin/env node
//: Permission to run this file in anywhere
//: Setting command line in bin and npm link

//! Game Plan
// 1) File Collection
// 2) Test Environment Setup
// 3) Test File Execution
// 4) Report Results

const Runner = require("./runner");
const runner = new Runner();

const run = async () => {
  await runner.collectFiles(process.cwd());
  //   console.log(runner.testFiles);
  runner.runTests();
};

run();
