import path from 'path';
import winston from 'winston';
import keys from './keys';

const logErrorPath = path.resolve(__dirname, '../logs/error.log');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: logErrorPath,
      level: 'error'
    })
  ]
});

if (keys.env === 'development') {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

export default logger;
