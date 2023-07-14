'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Priorities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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

    const priorities = ['Baixa', 'Média', 'Alta', 'Urgente'];

    for (const priorityName of priorities) {
      await queryInterface.bulkInsert('Priorities', [
        {
          name: priorityName,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Priorities');
  }
};
