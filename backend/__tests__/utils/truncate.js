const { sequelize } = require('../../src/app/models')

module.exports = () => {
  // iterate over all models set, 
  // key = name of models
  // destroy data
  // encapsulate async call (Promise.all)
  return Promise.all(Object.keys(sequelize.models).map(key => {
    // return a promise
    return sequelize.models[key].destroy({ truncate: true, force: true })
  }))
}