const Router = require('express')
const router = new Router()
const controller = require('./authController')


router.get('/registration=:login,:password', controller.registration)
router.get('/login=:login,:password', controller.login)
router.get('/getall', controller.getall)
//router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router