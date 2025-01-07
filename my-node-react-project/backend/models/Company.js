const { Model } = require("sequelize");

class Company extends Model {}

module.exports = (sequelize, DataTypes) => {
  Company.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manager: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Company",
      timestamps: true,
    }
  );

  return Company;
};
