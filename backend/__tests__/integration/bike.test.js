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

  it('should mark a bike as rent by given user (without authentication)', async () => {
    const response = await request(app).put('/cyclist/rent_bike').send({
      userId: 2,
      bikeId: 1
    })
    expect(response.status).toBe(200)
  })

  it('should mark a bike as returned(available again) (without authentication)', async () => {
    const response = await request(app).put('/cyclist/return_bike').send({
      userId: 2,
      bikeId: 1
    })
    expect(response.status).toBe(200)
  })

  it(' (admin) should list all bikes', async () => {
    const response = await request(app).get('/admin/list_bikes')
    expect(response.status).toBe(200)
  })
})