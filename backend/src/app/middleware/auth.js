const jwt = require('jsonwebtoken')
const { promisify } = require('util')

// checks for authentication before move to the next function
module.exports = async (req, res, next) => {
  // collect jwt token from header
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    req.userId = decoded.id
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }
}