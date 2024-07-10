const fs = require('fs');
const path = require('path');
const {getTickets} = require('./pos')

const LAST_FETCH_TIME_FILE = path.join(__dirname, 'lastFetchTime.txt');

const readLastFetchTime = () => {
    if (fs.existsSync(LAST_FETCH_TIME_FILE)) {
        const lastFetchTime = fs.readFileSync(LAST_FETCH_TIME_FILE, 'utf-8');
        return new Date(lastFetchTime).toISOString();
    }
    return new Date(Date.now() - 60 * 60 * 1000).toISOString();
};

const writeLastFetchTime = (time) => {
    fs.writeFileSync(LAST_FETCH_TIME_FILE, time);
};

exports.fetchTicketsForMissedDuration = async (locationId) => {
    try {
        const lastFetchTime = readLastFetchTime();
        const currentTime = new Date().toISOString();

        const tickets = await getTickets(locationId, lastFetchTime, currentTime);
        console.log('Fetched tickets for missed duration:', tickets);

        writeLastFetchTime(currentTime);
    } catch (err) {
        console.error('Error fetching tickets for missed duration:', err.message);
    }
};

exports.fetchTicketsHourly = async (locationId) => {
    try {
        const lastFetchTime = readLastFetchTime();
        const currentTime = new Date().toISOString();

        const tickets = await getTickets(locationId, lastFetchTime, currentTime);
        console.log('Fetched tickets:', tickets);

        writeLastFetchTime(currentTime);
    } catch (err) {
        console.error('Error in scheduled ticket fetch:', err.message);
    }
};