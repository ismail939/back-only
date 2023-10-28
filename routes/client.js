const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientController')


router.route('/clients').get(controller.get)
.post(controller.create)

router.route('/clients/:username').get(controller.getOne)
.patch(controller.update)
.delete(controller.delete)

module.exports = router

