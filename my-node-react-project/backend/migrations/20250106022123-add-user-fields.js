"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "birthDate", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "residence", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "firstName");
    await queryInterface.removeColumn("Users", "lastName");
    await queryInterface.removeColumn("Users", "birthDate");
    await queryInterface.removeColumn("Users", "residence");
  },
};
