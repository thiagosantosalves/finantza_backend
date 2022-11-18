'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'meta',
      'notification',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('meta');
  }
};
