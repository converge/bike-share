const { Bike } = require('../models')

class CyclistController {

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

  /*
   * Rent a bike
   * params: userId, bikeId
   */
  async rentBike (req, res) {
    const { userId, bikeId} = req.body
    try {
      const bikeToRent = await Bike.update({
        status: 'in_use',
        user_id: userId
      }, {
        where: { id: bikeId }
      })
      return res.json(bikeToRent)
    } catch (err) {
      return res.json({ message: err })
    }
  }

  /*
   * Return a bike and set as available again
   * params: userId, bikeId
   */
  async returnBike (req, res) {
    const { userId, bikeId } = req.body
    try {
      const bikeToReturn = await Bike.update({
        id: bikeId,
        user_id: null,
        status: 'available',
      }, {
        where: { user_id: userId }
      })
      return res.json(bikeToReturn)
    } catch (err) {
      return res.json({ message: err })
    }
  }
}

module.exports = new CyclistController()