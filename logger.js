const {createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({ stack:true}),
        format.json()
    ),
    transports: [
        new transports.Console()
    ],
    exitOnError:false
});

logger.defaultMeta = { service: 'portfolio'}

module.exports = logger;