'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('card_credit_releases', { 
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      statuscard: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pay: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      limit_card: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      invoice_amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      closes_day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      wins_day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_card_credit: {
        type: Sequelize.INTEGER,
        references: { model: 'card_credits', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      id_account: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('card_credit_releases');
  }
};
