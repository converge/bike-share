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
    // explicit declaration of the FK
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.User,
        key: 'id'
      }
    },
    status: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  })
  // create ForeignKey constraint
  Bike.associate = (models) => {
    Bike.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'cascade' })
  }

  return Bike
}
