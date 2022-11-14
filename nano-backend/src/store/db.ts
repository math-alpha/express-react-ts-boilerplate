import * as Sequelize from "sequelize";

import Config from "../constants";

const db = Config.dbName;
const username = Config.dbUser;
const password = Config.dbPassword;

export const sequelize = new Sequelize.Sequelize(db, username, password, {
  dialect: "postgres",
  port: Config.dbPort,
  host: Config.dbServer,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successfully established.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
