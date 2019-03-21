const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Bike = require('./Bike')

/*
 * User Model
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    pincode: DataTypes.STRING,
  },
    {
      hooks: {
        beforeSave: async user => {
          if (user.pincode) {
            user.pincode = await bcrypt.hash(user.pincode, 8)
          }
        }
      }
    })

  // function, because we need access to "this" object
  User.prototype.checkPincode = function (pincode) {
    return bcrypt.compare(pincode, this.pincode)
  }

  // generate JSON Web Token
  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id, username: this.username }, process.env.APP_SECRET)
  }

  return User
}