const request = require('supertest')
const app = require('../../src/app')
const { Bike } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('API integration tests', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('should not list all bikes (without authentication)', async () => {
    const response = await request(app).get('/cyclist/list_bikes').send({})
    expect(response.status).toBe(401)
  })

  it('should not mark a bike as returned(available again) (without authentication)', async () => {
    const response = await request(app).put('/cyclist/update_bike_status').send({
      params: {
        userId: null,
        bikeId: 1
      }
    })
    expect(response.status).toBe(401)
  })

  it('should not return user status (without authentication)', async () => {
    const response = await request(app).get('/cyclist/user_status')
    expect(response.status).toBe(401)
  })
})