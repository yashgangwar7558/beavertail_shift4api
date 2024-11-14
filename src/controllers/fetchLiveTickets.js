const fs = require('fs');
const path = require('path');
const { getTickets } = require('./pos')
const { processBill, formatTicketToBillData, fetchLastSynced, updateLastSynced } = require('./helper')

exports.fetchTicketsForMissedDuration = async (tenantId, posId, locationId, lastSynced) => {
    try {
        const lastFetchTime = lastSynced || new Date(0).toISOString()
        const currentTime = new Date().toISOString();

        const tickets = await getTickets(locationId, lastFetchTime, currentTime);
        // console.log('Fetched tickets for missed duration:', tickets);

        if (tickets.results.length > 0) {
            for (const ticket of tickets.results) {
                const billData = formatTicketToBillData(tenantId, ticket);
                await processBill(billData);
            }
        }
        else {
            console.log('No missed duration tickets to process');
        }

        await updateLastSynced(tenantId, posId, currentTime);
    } catch (err) {
        console.error('Error fetching tickets for missed duration:', err.message);
    }
};

exports.fetchTicketsHourly = async (tenantId, posId, locationId) => {
    try {
        const lastFetchTime = await fetchLastSynced(tenantId, posId)
        const currentTime = new Date().toISOString();

        const tickets = await getTickets(locationId, lastFetchTime, currentTime);
        // console.log('Fetched hourly tickets:', tickets);

        if (tickets.results.length > 0) {
            for (const ticket of tickets.results) {
                const billData = formatTicketToBillData(tenantId, ticket);
                await processBill(billData);
            }
        } 
        else {
            console.log('No new tickets to process');
        }

        await updateLastSynced(tenantId, posId, currentTime)
    } catch (err) {
        console.error('Error in scheduled ticket fetch:', err.message);
    }
}