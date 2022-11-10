'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
    'releases',
    'meta_id',
    {
      type: Sequelize.SMALLINT,
      allowNull: true,
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
