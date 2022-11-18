'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'releases',
      'meta', 
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
