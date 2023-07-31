require("dotenv").config();
const envVars = process.env;
module.exports = {
  env: envVars.NODE_ENV,
  app_port: envVars.APP_PORT,
  dialect: envVars.TEST_DB_DIALECT,
  database: envVars.TEST_DB_NAME,
  port: envVars.TEST_DB_PORT,
  host: envVars.TEST_DB_HOST,
  username: envVars.TEST_DB_USERNAME,
  password: envVars.TEST_DB_PASSWORD,
  redis_host: envVars.REDIS_HOST,
  redis_port: envVars.REDIS_PORT,
  redis_password: envVars.REDIS_PASSWORD,
  jwt_private_key: envVars.JWT_PRIVATE_KEY,
};
