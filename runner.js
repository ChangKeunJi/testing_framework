// File Collection
// 1) Find All files ending in .test.js through a folder
// => collectFiles
// 2) Store reference to each file we find
// 3) Execute all the test files one by one

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const forbiddenDirs = ["node_modules"];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.grey(`---- ${file.shortName}`));

      const beforeEaches = [];

      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = (desc, fn) => {
        beforeEaches.forEach((func) => func());

        try {
          fn();
          console.log("✨✨✨✨", chalk.green(desc), "✨✨✨✨");
        } catch (err) {
          console.log("💥💥💥💥", chalk.red(desc), "💥💥💥💥");
          console.log("🚩", "\t", chalk.red(err.message));
        }
      };

      try {
        require(file.name);
      } catch (err) {
        console.log("💥💥💥💥", "Error Loading File", "💥💥💥💥");
        console.log("🚩", "\t", err);
      }
    }
  }

  async collectFiles(targetPath) {
    // targetPath: Folder which we want to look at and test

    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);

      const stats = await fs.promises.lstat(filepath);
      // Information about file or folder

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filepath);

        files.push(...childFiles.map((f) => path.join(file, f)));
        // Attach parent folder path before push to files
      }
    }
  }
}

module.exports = Runner;
