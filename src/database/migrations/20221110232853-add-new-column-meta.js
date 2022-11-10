'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'releases',
      'meta_status',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('releases');
  }
};