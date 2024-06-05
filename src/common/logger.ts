import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Minimum logging level (e.g., 'debug', 'error')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({
        level,
        message,
        timestamp,
      }) => {
        return `${timestamp} [${level}] ${message}`;
      }
    )
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export { logger };
