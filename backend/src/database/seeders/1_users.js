'use strict';
const faker = require('faker')
const { User } = require('../../app/models')
// hardcode password for development only
const defaultPassword = 'test#123'

module.exports = {
  /*
   * Create Users accounts (users table)
   */
  up: (queryInterface, Sequelize) => {
    let users = []
    // create random users
    for (let i = 1; i < 5; i++) {
      users.push({
        id: i,
        username: faker.internet.userName(),
        pincode: defaultPassword,
        created_at: faker.date.past(),
        updated_at: faker.date.past()
      })
    }
    // validate/individualHooks enable User model to be used on user creation
    return User.bulkCreate(users, {
      validate: true,
      individualHooks: true,
    })
  },

  /*
   * Undo Users account creation (users table)
   */
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', [{
    }])
  }
};
