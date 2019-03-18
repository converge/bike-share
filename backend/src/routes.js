const routes = require('express').Router()
const AuthController = require('./app/controllers/AuthController')
const AdminController = require('./app/controllers/AdminController')
const CyclistController = require('./app/controllers/CyclistController')

// Authentication routes
routes.post('/auth/login', AuthController.login)

// // Admin routes
routes.get('/admin/list_bikes', AdminController.listBikes)

// // Cyclist routes
routes.get('/cyclist/list_bikes', CyclistController.listBikes)
routes.put('/cyclist/rent_bike', CyclistController.rentBike)
routes.put('/cyclist/return_bike', CyclistController.returnBike)

module.exports = routes