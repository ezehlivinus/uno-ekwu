import app from './index';

const { PORT } = require('./config/env');
const { logger } = require('./config/logging');

const port = PORT || 3001;

const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

module.exports.server = server;
