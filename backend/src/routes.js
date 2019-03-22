const routes = require('express').Router()
const AuthController = require('./app/controllers/AuthController')
const CyclistController = require('./app/controllers/CyclistController')

// Authentication routes
routes.post('/auth/login', AuthController.login)

// // Cyclist routes
routes.get('/cyclist/list_bikes', CyclistController.listBikes)
routes.get('/cyclist/bike_info', CyclistController.bikeInfo)
routes.get('/cyclist/user_status', CyclistController.userStatus)
routes.put('/cyclist/update_bike_status', CyclistController.updateBikeStatus)

module.exports = routes