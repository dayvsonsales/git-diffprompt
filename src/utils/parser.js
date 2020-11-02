const shell = require("shelljs");

const GREP_WHITESPACES = "grep '^\\s'";
const CUT = "cut -d ' ' -f 3";

function parserStatus(status) {
  const cmd = shell.exec(`echo "${status}" | ${GREP_WHITESPACES} | ${CUT}`, {
    silent: true,
  });

  if (cmd.code == 0) {
    const files = cmd.stdout.split("\n");
    files.pop();
    return files;
  } else {
    throw new Error(cmd.stderr);
  }
}

module.exports = { parserStatus };
