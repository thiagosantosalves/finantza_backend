'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'card_credits',
      'id_institution', 
      {
        type: Sequelize.SMALLINT,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('card_credits');
  }
};
