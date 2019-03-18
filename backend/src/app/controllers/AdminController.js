const { Bike } = require('../models')

class AdminController {

  /*
   * List all bikes
   */
  async listBikes (req, res) {
    try {
      const bikes = await Bike.findAll()
      return res.json(bikes)
    } catch (err) {
      return res.status(401).json({ message: 'Unable to load bikes list' })
    }
  }

}

module.exports = new AdminController()