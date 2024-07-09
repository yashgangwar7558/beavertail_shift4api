const express = require('express')
const router = express.Router()

const {
    receivedInstallationRequest,
} = require('../controllers/marketplace')

const {
    authenticateIncomingRequest,
} = require('../middlewares/auth')

router.post('/app/s4/install', authenticateIncomingRequest, receivedInstallationRequest)

module.exports = router