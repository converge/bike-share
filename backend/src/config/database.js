require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
module.exports = {
  // (OR) is necessary here because sequelize db:migrate doesnt read .env files
  database: process.env.DB_NAME || 'node_bike',
  // if not set, use postgres
  dialect: process.env.DB_DIALECT || 'sqlite',
  // SQLite DB for tests
  storage: process.env.STORAGE || './__tests__/database.sqlite',
  logging: false,
  // logging: console.log,
  define: {
    // auto update created and modified fields with timestamps
    timestamps: true,
    // underline entity name
    underscored: true,
    // underline for fields also
    underscoredAll: true,
  }
}