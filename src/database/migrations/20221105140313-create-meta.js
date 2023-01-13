'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.createTable('meta', { 
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      month:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_category: {
        type: Sequelize.INTEGER,
        references:{ model: 'dp_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      value:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      used_value:{
        type: Sequelize.FLOAT,
        allowNull: true
      },
      porcent:{
        type: Sequelize.FLOAT,
        allowNull: true
      },
      status:{
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      user_id:{
        type: Sequelize.INTEGER,
        references:{ model: 'users', key: 'id' },
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
    await queryInterface.dropTable('meta');
  }
};
