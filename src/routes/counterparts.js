router = require('express').Router()
const controller = require('../controllers/counterparts')
const validator = require('../validators/counterparts')

router.route('/').get(controller.getAll)
router.route('/').post(validator.createItems, controller.createItems)
router.route('/').patch(validator.updateItems, controller.updateItems)
router.route('/').delete(validator.deleteItem, controller.deleteItem)

module.exports = router;
