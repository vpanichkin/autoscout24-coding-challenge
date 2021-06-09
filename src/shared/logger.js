const winston = require('winston');
const { format } = winston;
const { logPath } = require('../config.js')(process.env.NODE_ENV);

const logger = winston.createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: `${logPath}/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${logPath}/combined.log` }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

winston.add(logger);

module.exports = logger;
