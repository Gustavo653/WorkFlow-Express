const sequelize = require("./database");

async function migrate() {
  await sequelize.sync();
}

module.exports = migrate;
