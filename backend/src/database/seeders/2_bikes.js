'use strict';
const faker = require('faker')
const bikeNames = [
  'Trek Madonne', 'Specialized Roubaix', 'Trek SL5', 'Trek City Bike',
  'BMC SLR 05', 'Specialized Venge', 'Cannondale SystemSix', 'Look 795',
  'Gigant Defy', '3T Strada Due', 'Colnago C64']

module.exports = {
  /*
   * Create Users accounts (users table)
   */
  up: (queryInterface, Sequelize) => {

    const bikes = []
    for (let i = 1; i <= 10; i++) {
      bikes.push({
        // user_id: faker.random.number({ 'min': 2, 'max':  4}),
        // user_id: 2,
        name: bikeNames[i],
        status: 'available',
        // generate random location making sure they're close
        // 50.119571, 8.637512
        latitude: (Math.random() * (50.110571 - 50.119571) + 50.119571).toFixed(6),
        longitude: (Math.random() * (8.628512 - 8.637512) + 8.637512).toFixed(6),
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
