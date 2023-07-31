const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config");

const db = {};

// connect to postgres
const sequelizeOptions = {
  dialect: config.dialect,
  port: config.port,
  host: config.host,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  logging: false,
  minifyAliases: true,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  sequelizeOptions
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
