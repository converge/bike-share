const request = require('supertest')
const app = require('../../src/app')
const { Bike } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('API integration tests', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('should list all bikes (without authentication)', async () => {
    const response = await request(app).get('/cyclist/list_bikes')
    expect(response.status).toBe(200)
  })

  it('should mark a bike as returned(available again) (without authentication)', async () => {
    const response = await request(app).put('/cyclist/update_bike_status').send({
      params: {
        userId: null,
        bikeId: 1
      }
    })
    expect(response.status).toBe(200)
  })

  it('(admin) should list all bikes', async () => {
    const response = await request(app).get('/admin/list_bikes')
    expect(response.status).toBe(200)
  })

  it('should return user status', async () => {
    const response = await request(app).get('/cyclist/user_status')
    expect(response.status).toBe(200)
  })
})