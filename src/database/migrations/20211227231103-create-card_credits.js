'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.createTable('card_credits', { 
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
      },
      institution:{
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      wins_day: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },    
      is_filed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      user_id:{
        type: Sequelize.INTEGER,
        references:{ model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      account_id:{
        type: Sequelize.INTEGER,
        references:{ model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }, 
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('card_credits');
  }
};
