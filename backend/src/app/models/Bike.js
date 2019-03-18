/*
 * Bike Model
 */
module.exports = (sequelize, DataTypes) => {
  const Bike = sequelize.define('Bike', {
    // id: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  })
  return Bike
}