'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Totals', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        total: Sequelize.INTEGER,
        anger: Sequelize.FLOAT,
        disgust: Sequelize.FLOAT,
        fear: Sequelize.FLOAT,
        joy: Sequelize.FLOAT,
        sadness: Sequelize.FLOAT,
        analytical: Sequelize.FLOAT,
        confident: Sequelize.FLOAT,
        tentative: Sequelize.FLOAT,
        openness: Sequelize.FLOAT,
        conscientiousness: Sequelize.FLOAT,
        extraversion: Sequelize.FLOAT,
        agreeableness: Sequelize.FLOAT,
        emotional_range: Sequelize.FLOAT,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Total')
  }
};
