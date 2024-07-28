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

router.post('/pos/tickets', async (req, res) => {
    try {
        const { locationId, fromDate, toDate } = req.body
        const result = await getTickets(locationId, fromDate, toDate)
        res.status(200).json({ success: true, tickets: result })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

router.post('/pos/menu', getMenu)
router.post('/pos/taxes', getTaxes)
router.post('/pos/tenders', getTenders)
router.post('/pos/revenue-classes', getRevenueClasses)

module.exports = router