const Router = require('express')
const router = new Router()
const controller = require('./requestsController')


router.get('/addPassportRequest=:login,:passportNumber,:surname,:name,:nationality,:dateOfBirth,:sex,:dateOfIssue,:dateOfExpiry,:identificationNumber,:placeOfBirth,:authority', controller.addPassportRequest)
router.get('/getPassportRequest',controller.getPassportRequest)
router.get('/setPassportFlag=:id',controller.setPassportRequest)
//router.post('/registration=:login,:password', controller.registration)
//router.get('/login=:login,:password', controller.login)
//router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router