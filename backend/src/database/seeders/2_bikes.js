'use strict';
const faker = require('faker')
const bikeNames = [
  'Trek Madonne', 'Specialized Roubaix', 'Trek SL5', 'Trek City Bike',
  'BMC SLR 05', 'Specialized Venge']

module.exports = {
  /*
   * Create Users accounts (users table)
   */
  up: (queryInterface, Sequelize) => {

    const bikes = []
    for (let i = 0; i < 10; i++) {
      bikes.push({
        // user_id: faker.random.number({ 'min': 2, 'max':  4}),
        user_id: 2,
        name: bikeNames[Math.floor(Math.random() * bikeNames.length)],
        status: 'available',
        created_at: faker.date.past(),
        updated_at: faker.date.past()
      })
    }

    return queryInterface.bulkInsert('bikes', bikes, {})
  },

  /*
   * Undo Users account creation (users table)
   */
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bikes', [{
    }])
  }
};
