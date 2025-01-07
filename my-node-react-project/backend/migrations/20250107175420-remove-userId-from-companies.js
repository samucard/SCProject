"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rimuove il campo userId dalla tabella companies
    await queryInterface.removeColumn("Companies", "userId");
  },

  down: async (queryInterface, Sequelize) => {
    // Aggiunge nuovamente il campo userId in caso di rollback
    await queryInterface.addColumn("Companies", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
