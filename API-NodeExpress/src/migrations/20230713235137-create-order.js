'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      openingDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      closingDate: {
        type: Sequelize.DATE
      },
      rating: {
        type: Sequelize.INTEGER
      },
      priorityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Priorities',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      requesterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      agentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      supportGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SupportGroups',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
