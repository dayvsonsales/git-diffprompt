const inquirer = require("inquirer");

class Prompt {
  constructor(params) {
    this.params = params;
  }

  async start() {
    const response = await inquirer.prompt(this.params);

    return response;
  }
}

module.exports = Prompt;
