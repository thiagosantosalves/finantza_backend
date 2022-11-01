'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.createTable('releases', { 
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
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
        references:{ model: 'rc_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      dp_category_id: {
        type: Sequelize.INTEGER,
        references:{ model: 'dp_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      account_id: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      account_origin: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      account_destiny: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      card_credit_id: {
        type: Sequelize.INTEGER,
        references:{ model: 'card_credits', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fixo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      installments: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      value_installments: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      qd_installments: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      attachment_img: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      tag: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type_payer: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      tag_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tags', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      attachment_img_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
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
    await queryInterface.dropTable('releases');
  }
};
