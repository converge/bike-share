const { Bike } = require('../models')
const { User } = require('../models')

class CyclistController {

  /*
   * List all bikes
   */
  async listBikes(req, res) {
    try {
      const bikes = await Bike.findAll()
      return res.json(bikes)
    } catch (err) {
      return res.status(401).json({ message: `Unable to load bikes list with error: ${err}` })
    }
  }

  /*
   * Rent or Return bike
   * userId should be provided for renting and should be
   * null to return the bike and make it available again
   * params: userId, bikeId
   */
  async updateBikeStatus(req, res) {
    const { userId, bikeId } = req.body.params

    // check if there is already a rent bike for this use
    if (userId !== null) {
      try {
        const bike = await Bike.count({
          where: {
            user_id: userId,
          }
        })
        // if there is already a related bike to this user
        if (bike > 0) {
          return res.status(422).json({ message: 'There is already a bike in use for this user' })
        }
      } catch (err) {
        return res.json({ message: err })
      }
    }
    let status
    // set status based on userId
    (userId !== null) ? status = 'in_use' : status = 'available'
    try {
      const bike = await Bike.update({
        status: status,
        user_id: userId
      }, {
          where: { id: bikeId }
        })
      return res.json(bike)
    } catch (err) {
      return res.json({ message: err })
    }
  }

  /*
   * Return information about the username (username, lease status)
   * params: userId
   */
  async userStatus(req, res) {
    // const { userId } = req.query
    const { userId } = req.body
    // console.log(req)
    try {
      const userStatus = await Bike.findOne({
        attributes: ['status'],
        where: {
          user_id: userId
        }
      })
      return res.json(userStatus)
    } catch (err) {
      return res.json({ message: err })
    }
  }

  /*
   * Get information from a particular bike
   * params: bikeId
   */
  async bikeInfo(req, res) {
    const { bikeId } = req.query
    try {
      const bike = await Bike.findOne({
        attributes: ['id', 'name', 'status'],
        where: {
          id: bikeId
        }
      })
      return res.json(bike)
    } catch (err) {
      return res.json({ message: err })
    }
  }
}


module.exports = new CyclistController()