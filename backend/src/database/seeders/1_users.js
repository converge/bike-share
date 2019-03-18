'use strict';
const faker = require('faker')
const { User } = require('../../app/models')
// TODO: hardcore credentials for development only
const adminUserName = 'admin'
const defaultPassword = 'test#123'

module.exports = {
  /*
   * Create Users accounts (users table)
   */
  up: (queryInterface, Sequelize) => {
    let users = []
    // create admin
    users.push({
      id: 1,
      username: adminUserName,
      pincode: defaultPassword,
      created_at: faker.date.past(),
      updated_at: faker.date.past()
    })

    // create random users
    for (let i = 2; i < 5; i++) {
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
