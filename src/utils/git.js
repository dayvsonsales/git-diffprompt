const shell = require('shelljs');
const logger = require('../logger');

const GIT_STATUS_NOT_STAGED_TRACKED = 'git status  --short';
const GIT_DIFFTOOL = 'git difftool';

function notStagedTracked(localDirectory) {
  let exec;

  if (!localDirectory) {
    exec = shell.exec(`${GIT_STATUS_NOT_STAGED_TRACKED}`, { silent: true });
  } else {
    exec = shell.exec(
      `cd ${localDirectory} && ${GIT_STATUS_NOT_STAGED_TRACKED}`,
      { silent: true }
    );
  }

  if (exec.code === 0) {
    return exec.stdout;
  }

  logger.error(exec.stderr);

  return;
}

function diffTool(file, commitCompare) {
  let exec;

  if (file) {
    exec = shell.exec(
      `${GIT_DIFFTOOL} --no-prompt ${commitCompare} -- ${file} > /dev/tty < /dev/tty`
    );
  } else {
    logger.error('Need to pass a file');
    return;
  }

  if (exec.code == 0) {
    return false;
  }

  logger.error(exec.stderr);
  return true;
}

module.exports = {
  notStagedTracked,
  diffTool,
};
