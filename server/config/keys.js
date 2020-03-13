module.exports = {
  env: process.env.ENVIRONMENT || 'development',
  storageName: process.env.STORAGE_NAME || 'storage',
  backendHost: process.env.BACKEND_HOST || 'http://localhost:3000/',
  dbHost: process.env.DBHOST,
  dbPort: process.env.DBPORT,
  dbName: process.env.DBNAME,
  dbUsername: process.env.DBUSERNAME,
  dbPassword: process.env.DBPASSWORD,
  emailUser: process.env.EMAILUSER,
  passwordemailUser: process.env.EMAILPASSWORD
};
