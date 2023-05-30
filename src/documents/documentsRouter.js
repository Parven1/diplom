const Router = require('express')
const router = new Router()
const controller = require('./documentsController')


router.get('/getPassport=:login', controller.getPassport)
router.get('/getMedicalInsurance=:login', controller.getMedicalInsurance)
router.get('/getVisa=:login', controller.getVisa)
//router.post('/registration=:login,:password', controller.registration)
//router.get('/login=:login,:password', controller.login)
//router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router