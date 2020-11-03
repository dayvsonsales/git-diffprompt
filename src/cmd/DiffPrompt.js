const logger = require('../logger');
const { notStagedTracked, diffTool } = require('../utils/git');
const { parserStatus } = require('../utils/parser');
const Prompt = require('../builder/Prompt');

class DiffPrompt {
  async run(localDirectory) {
    console.clear();

    this.diffError = false;

    while (true) {
      const filesNotStagedTracked = notStagedTracked(localDirectory);

      if (filesNotStagedTracked) {
        const choices = parserStatus(filesNotStagedTracked);

        if (choices.length !== 0) {
          const { file } = await new Prompt({
            name: 'file',
            message: 'Select a file to diff',
            type: 'list',
            choices,
            loop: true,
          }).start();

          const { commitCompare } = await new Prompt({
            name: 'commitCompare',
            message:
              'Set a SHA commit to compare or leave it blank to use HEAD',
            type: 'input',
          }).start();

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
      "You're not in a git repository or there are not staged tracked files"
    );
  }
}

module.exports = new DiffPrompt();
