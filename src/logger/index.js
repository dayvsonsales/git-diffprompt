const log4js = require('log4js');

const logger = log4js.getLogger('git-diffprompt');

logger.level = 'error';

module.exports = logger;
