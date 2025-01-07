const { Sequelize, DataTypes, Op } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("node_react_database", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Connessione al database riuscita"))
  .catch((err) => console.error("Errore di connessione:", err));

const User = require(path.join(__dirname, "", "User"))(
  sequelize,
  DataTypes
);
const Company = require(path.join(__dirname, "", "Company"))(
  sequelize,
  DataTypes
);

Company.hasMany(User, { foreignKey: "companyId", as: "users" });
User.belongsTo(Company, { foreignKey: "companyId", as: "company" });

module.exports = { sequelize, DataTypes, Op, User, Company };
