const request = require('supertest')
const app = require('../../src/app')
const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('Authentication', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      username: 'jp',
      pincode: '123'
    })

    const response = await request(app).post('/auth/login').send({
      username: user.username,
      pincode: '123'
    })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await User.create({
      username: 'jp',
      pincode: '123'
    })

    const response = await request(app).post('/auth/login').send({
      username: user.username,
      // wrong password
      pincode: '123<---'
    })

    expect(response.status).toBe(401)
  })

  it('should return a JWT when authenticated', async () => {
    const user = await User.create({
      username: 'jp',
      pincode: '123'
    })

    const response = await request(app).post('/auth/login').send({
      username: user.username,
      pincode: '123'
    })

    expect(response.body).toHaveProperty('token')
  })
})