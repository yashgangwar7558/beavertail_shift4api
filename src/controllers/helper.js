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

exports.formatTicketToBillData = (tenantId, ticket) => {
    return {
        tenantId: tenantId, 
        billPosRef: ticket.posRef,
        billNumber: `BILL-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: ticket.customerName || 'anonymous',
        billingDate: ticket.closedAt,
        itemsOrdered: ticket.ticketItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            menuPrice: item.unitPrice/100,
            discountAmount: item.discountAmount,
            total: item.price/100,
            taxAmount: item.tax/100,
            totalPayable: (item.price + item.tax)/100
        })),
        discountAmount: ticket.totalDiscounts/100,
        total: ticket.totalItems/100,
        taxAmount: ticket.totalTax/100, 
        totalPayable: ticket.totalGrand/100 
    };
};

exports.processBill = async (billData) => {
    try {
        const response = await axios.post(`${process.env.BEAVERTAIL_HOST}/process-bill`, billData); 
        console.log('Bill processed:', response.data);
        // console.log('Bill processed');
    } catch (error) {
        console.error('Error processing bill:', error.message);
    }
}

exports.fetchAllPosTenants = async (posId) => {
    try {
        const data = {posId}
        const response = await axios.post(`${process.env.BEAVERTAIL_HOST}/get-pos-tenants`, data); 
        return response.data.posRefs
    } catch (error) {
        console.error('Error fetching pos tenants:', error.message);
    }
}

exports.fetchLastSynced = async (tenantId, posId) => {
    try {
        const data = {tenantId, posId}
        const response = await axios.post(`${process.env.BEAVERTAIL_HOST}/get-lastSynced`, data); 
        return response.data.lastSynced
    } catch (error) {
        console.error('Error fetching last synced:', error.message);
    }
}

exports.updateLastSynced = async (tenantId, posId, currentTime) => {
    try {
        const data = {tenantId, posId, lastSynced: currentTime}
        const response = await axios.post(`${process.env.BEAVERTAIL_HOST}/update-lastSynced`, data); 
        // console.log('Updated last fetched time:', response.data.lastSynced);
    } catch (error) {
        console.error('Error updating last synced time:', error.message);
    }
}