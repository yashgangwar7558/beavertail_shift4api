const CryptoJS = require('crypto-js')
const axios = require('axios');
require('dotenv').config()
const {generateSignature, makeApiRequest} = require('./helper')

exports.getNewTickets = async (req, res) => {
    try {
        console.log(req.body)
        res.status(200).send('Request received and validated')
    } catch (err) {
        console.error('Error getting updated/created tickets ref:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

exports.getTickets = async (locationId, fromDate, toDate) => {
    try {
        const requestMethod = 'GET';
        const requestPath = `/pos/v2/${locationId}/tickets`
        const postData = {}

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = generateSignature(requestMethod, requestPath, postData, timestamp)

        const url = `${process.env.SHIFT_HOST}${requestPath}?filter={"dateTimeFrom":"${fromDate}", "dateTimeTo":"${toDate}"}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-key': process.env.CLIENT_ID,
            'x-signature': signature,
            'x-timestamp': timestamp
        }

        const result = await makeApiRequest(url, headers)
        return result
    } catch (err) {
        console.error('Error getting tickets from POS:', err.message);
    }
}

exports.getMenu = async (req, res) => {
    try {
        const { locationId } = req.body

        const requestMethod = 'GET';
        const requestPath = `/pos/v2/${locationId}/menu`
        const postData = {}

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = generateSignature(requestMethod, requestPath, postData, timestamp)

        const url = `${process.env.SHIFT_HOST}${requestPath}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-key': process.env.CLIENT_ID,
            'x-signature': signature,
            'x-timestamp': timestamp
        }

        const result = await makeApiRequest(url, headers)

        res.status(200).json({ success: true, menu: result })
    } catch (err) {
        console.error('Error getting menu from POS:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

exports.getTaxes = async (req, res) => {
    try {
        const { locationId } = req.body

        const requestMethod = 'GET';
        const requestPath = `/pos/v2/${locationId}/taxes`
        const postData = {}

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = generateSignature(requestMethod, requestPath, postData, timestamp)

        const url = `${process.env.SHIFT_HOST}${requestPath}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-key': process.env.CLIENT_ID,
            'x-signature': signature,
            'x-timestamp': timestamp
        }

        const result = await makeApiRequest(url, headers)

        res.status(200).json({ success: true, taxes: result })
    } catch (err) {
        console.error('Error getting taxes from POS:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

exports.getTenders = async (req, res) => {
    try {
        const { locationId } = req.body

        const requestMethod = 'GET';
        const requestPath = `/pos/v2/${locationId}/tenders`
        const postData = {}

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = generateSignature(requestMethod, requestPath, postData, timestamp)

        const url = `${process.env.SHIFT_HOST}${requestPath}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-key': process.env.CLIENT_ID,
            'x-signature': signature,
            'x-timestamp': timestamp
        }

        const result = await makeApiRequest(url, headers)

        res.status(200).json({ success: true, tenders: result })
    } catch (err) {
        console.error('Error getting tenders from POS:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

exports.getRevenueClasses = async (req, res) => {
    try {
        const { locationId } = req.body

        const requestMethod = 'GET';
        const requestPath = `/pos/v2/${locationId}/revenue-classes`
        const postData = {}

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = generateSignature(requestMethod, requestPath, postData, timestamp)

        const url = `${process.env.SHIFT_HOST}${requestPath}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-key': process.env.CLIENT_ID,
            'x-signature': signature,
            'x-timestamp': timestamp
        }

        const result = await makeApiRequest(url, headers)

        res.status(200).json({ success: true, revenueClasses: result })
    } catch (err) {
        console.error('Error getting revenue classes from POS:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}