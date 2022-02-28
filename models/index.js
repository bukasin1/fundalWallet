const dbConfig = require("../config/dbConfig");

const {DataTypes, Sequelize} = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,

  pool: {
    max: Number(process.env.DB_POOL_MAX),
    min: Number(process.env.DB_POOL_MIN), 
    acquire: process.env.DB_POOL_ACQUIRE,
    idle: process.env.DB_POOL_IDLE
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, DataTypes);
db.cards = require('./card.model')(sequelize, DataTypes);
db.wallets = require('./wallet.model')(sequelize, DataTypes)

module.exports = db;