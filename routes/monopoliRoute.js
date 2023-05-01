const router = require('express').Router()
const monopoliController = require('../controllers/monopoliController')
const Monopoli = new monopoliController()

router
    .get('/api/monopoli', Monopoli.getAllData)
    .post('/api/monopoli', Monopoli.pusherTrigger)

module.exports = router