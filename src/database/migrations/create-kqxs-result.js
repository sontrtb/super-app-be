'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KqxsResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      specialPrize: {
        type: Sequelize.STRING,
      },
      firstPrize: {
        type: Sequelize.STRING,
      },
      secondPrize: {
        type: Sequelize.STRING,
      },
      thirdPrize: {
        type: Sequelize.STRING,
      },
      fourthPrize: {
        type: Sequelize.STRING,
      },
      fifthPrize: {
        type: Sequelize.STRING,
      },
      sixthPrize: {
        type: Sequelize.STRING,
      },
      ticketCodes: {
        type: Sequelize.STRING,
      },
      seventhPrize: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('KqxsResults');
  },
};
