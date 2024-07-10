const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');

const {
    getNewTickets,
    getTickets,
    getMenu,
    getTaxes,
    getTenders,
    getRevenueClasses
} = require('../controllers/pos')

const {
    authenticateIncomingRequest,
} = require('../middlewares/auth')

router.post('/subscription/pos/tickets', authenticateIncomingRequest, getNewTickets)

router.post('/pos/tickets', getTickets)
router.post('/pos/menu', getMenu)
router.post('/pos/taxes', getTaxes)
router.post('/pos/tenders', getTenders)
router.post('/pos/revenue-classes', getRevenueClasses)

module.exports = router