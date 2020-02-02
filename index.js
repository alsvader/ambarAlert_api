import server from './server';
import db from './server/config/db';
import logger from './server/config/logger';

const PORT = process.env.PORT || 5000;

const eraseDatabaseOnSync = true;

db.sync({ force: eraseDatabaseOnSync }).then(async () => {
  server.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
});
