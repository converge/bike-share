const { User } = require('../models')

class AuthController {

  /*
   * Login
   * params: username, pincode
   */
  async login (req, res) {
    const { username, pincode } = req.body
    try {
      const user = await User.findOne({ where: {
        username
      }})
      if (!user) {
        return res.status(401).json({ message: 'Invalid user!' })
      }
  
      if (!await user.checkPincode(pincode)) {
        return res.status(401).json({ message: 'The pincode is incorrect!'})
      }
      return res.json({
        user,
        token: user.generateToken()
      })
    } catch (err) {
      res.json({ message: err })
    }
  }
}

module.exports = new AuthController()