require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const connectToMongoDB = require('./db/conn')
const posRouter = require('./routers/pos')
const marketplaceRouter = require('./routers/marketplace')
const { fetchTicketsForMissedDuration, fetchTicketsHourly } = require('./controllers/fetchLiveTickets')
const { fetchAllPosTenants } = require('./controllers/helper')

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

// app.use(posRouter)
// app.use(marketplaceRouter)

// app.get('/', async (req, res) => {
//     res.status(200).send("Welcome to Shift4 api. Server is live!")
// })

// app.listen(port, () => {
//     console.log(`Server is live at port no. ${port}`);
//     const locationId = '6740'
//     const tenantId = '6686b472dacd2ac64371cd4c'
//     fetchTicketsForMissedDuration(tenantId, locationId).then(() => {
//         setInterval(() => fetchTicketsHourly(tenantId, locationId), 20 * 1000);
//         fetchTicketsHourly(tenantId, locationId);
//     });
// })

connectToMongoDB()
    .then(() => {
        app.use(posRouter)
        app.use(marketplaceRouter)

        app.get('/', async (req, res) => {
            res.status(200).send("Welcome to shift4api. Server is live!")
        })

        app.listen(port, async () => {
            console.log(`Server is live at port no. ${port}`);
            try {
                const posId = '6686b472dacd2ac64371ce9r'
                const tenants = await fetchAllPosTenants(posId);
                tenants.forEach(({ tenantId, posId, identifier, lastSynced }) => {
                    fetchTicketsForMissedDuration(tenantId, posId, identifier, lastSynced).then(() => {
                        setInterval(() => fetchTicketsHourly(tenantId, posId, identifier), 3600000);
                        fetchTicketsHourly(tenantId, posId, identifier);
                    });
                });
            } catch (error) {
                console.error('Error initializing ticket fetching:', error.message);
            }
        });
    })
    .catch((err) => {
        console.error("shift4api server not live!")
        console.error("Failed to connect to database:", err.message)
        process.exit(1);
    })
