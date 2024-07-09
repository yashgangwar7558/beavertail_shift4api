const express = require('express')
const router = express.Router()

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
const fetchTicketsHourly = async () => {
    try {
        const fromDate = lastToDate;
        const toDate = new Date().toISOString();

        const tickets = await getTickets(fromDate, toDate);
        console.log('Fetched tickets:', tickets);

        lastToDate = toDate;
    } catch (err) {
        console.error('Error in scheduled ticket fetch:', err.message);
    }
}

router.post('/pos/menu', getMenu)
router.post('/pos/taxes', getTaxes)
router.post('/pos/tenders', getTenders)
router.post('/pos/revenue-classes', getRevenueClasses)

module.exports = router