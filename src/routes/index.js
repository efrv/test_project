router = require('express').Router()
const controller = require('../controllers/index')

router.get('/', controller.index)

module.exports = router;
