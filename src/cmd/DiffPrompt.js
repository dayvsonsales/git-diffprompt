const inquirer = require("inquirer");
const logger = require("../logger");
const { unstagedTracked, diffTool } = require("../utils/git");
const { parserStatus } = require("../utils/parser");

class DiffPrompt {
  async run(localDirectory) {
    console.clear();

    let diffError = false;

    while (true) {
      const filesUnstagedTracked = unstagedTracked(localDirectory);

      if (filesUnstagedTracked) {
        const choices = parserStatus(filesUnstagedTracked);

        if (choices.length !== 0) {
          const { file } = await inquirer.prompt({
            name: "file",
            message: "Select a file to diff",
            type: "list",
            choices,
            loop: true,
          });

          const { commitCompare } = await inquirer.prompt({
            name: "commitCompare",
            message:
              "Set a SHA commit to compare or leave it blank to use HEAD",
            type: "input",
          });

          console.clear();
          diffError = diffTool(file, commitCompare);
        } else {
          break;
        }
      } else {
        break;
      }

      if (!diffError) {
        console.clear();
      }
    }

    logger.error(
      "You're not in a git repository or there are no unstaged tracked files"
    );
  }
}

module.exports = new DiffPrompt();
