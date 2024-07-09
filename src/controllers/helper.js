require('dotenv').config();
const axios = require('axios');
const CryptoJS = require('crypto-js')

exports.generateSignature = (method, path, data, timestamp) => {
    try {
        const requestData = Object.keys(data).length > 0 ? JSON.stringify(data) : ''
        const combinedString = process.env.CLIENT_ID + method + path + requestData + timestamp;
        const digest = CryptoJS.HmacSHA256(combinedString, process.env.CLIENT_SECRET);
        return CryptoJS.enc.Hex.stringify(digest);
    } catch (error) {
        throw new Error('Error generating signature: ' + error.message);
    }
}

exports.makeApiRequest = async (url, headers) => {
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error making API request: ' + error.message);
    }
}