module.exports = (sequelize, DataTypes) => {
  const Total = sequelize.define('Total', {
    total: DataTypes.INTEGER,
    anger: DataTypes.FLOAT,
    disgust: DataTypes.FLOAT,
    fear: DataTypes.FLOAT,
    joy: DataTypes.FLOAT,
    sadness: DataTypes.FLOAT,
    analytical: DataTypes.FLOAT,
    confident: DataTypes.FLOAT,
    tentative: DataTypes.FLOAT,
    openness: DataTypes.FLOAT,
    conscientiousness: DataTypes.FLOAT,
    extraversion: DataTypes.FLOAT,
    agreeableness: DataTypes.FLOAT,
    emotional_range: DataTypes.FLOAT,
  });

  return Total
}
