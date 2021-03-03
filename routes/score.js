const express = require('express')
const controller = require('../controllers/score')
const passport = require('passport')
const router = express.Router()

http://localhost:5000/api/auth/score
router.get('/', passport.authenticate('jwt', { session: false }), controller.scoreGet)

router.patch('/', passport.authenticate('jwt', { session: false }), controller.scoreUpdate)


module.exports = router