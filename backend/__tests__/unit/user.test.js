const { User } = require('../../src/app/models')
const bcrypt = require('bcryptjs')
const truncate = require('../utils/truncate')

describe('User', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('it should encrypt username pincode', async () => {
    const user = await User.create({
      username: 'jp@ok.com',
      pincode: '123'
    })

    const compareHash = await bcrypt.compare('123', user.pincode) 
    console.log(compareHash)

    expect(compareHash).toBe(true)
  })
})