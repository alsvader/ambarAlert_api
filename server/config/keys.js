module.exports = {
  env: process.env.ENVIRONMENT || 'development',
  dbHost: process.env.DBHOST,
  dbPort: process.env.DBPORT,
  dbName: process.env.DBNAME,
  dbUsername: process.env.DBUSERNAME,
  dbPassword: process.env.DBPASSWORD
};
