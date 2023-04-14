'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instalments_releases', { 
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      rc_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      dp_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      card_credit_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      paying_account_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      meta_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      meta: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      amount_instalemts: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      remaining_amount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('instalments_releases');
  }
};
