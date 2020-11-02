const shell = require("shelljs");

const GIT_STATUS_UNSTAGED_TRACKED = "git status  --short";
const GIT_DIFFTOOL = "git difftool";

function unstagedTracked(localDirectory) {
  let exec;

  if (!localDirectory) {
    exec = shell.exec(`${GIT_STATUS_UNSTAGED_TRACKED}`, { silent: true });
  } else {
    exec = shell.exec(
      `cd ${localDirectory} && ${GIT_STATUS_UNSTAGED_TRACKED}`,
      { silent: true }
    );
  }

  if (exec.code == 0) {
    return exec.stdout;
  } else {
    throw new Error("Filed to execute git command");
  }
}

function diffTool(file, commitCompare) {
  let exec;

  if (file) {
    exec = shell.exec(
      `${GIT_DIFFTOOL} --no-prompt ${commitCompare} -- ${file} > /dev/tty < /dev/tty`
    );
  } else {
    throw new Error("Need to pass a file");
  }

  if (exec.code == 0) {
    return exec.stdout;
  } else {
    return;
  }
}

module.exports = {
  unstagedTracked,
  diffTool,
};
