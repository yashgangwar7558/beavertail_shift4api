require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const posRouter = require('./routers/pos') 
const marketplaceRouter = require('./routers/marketplace') 

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use(posRouter)
app.use(marketplaceRouter)

app.get('/', async (req, res) => {
    res.status(200).send("Welcome to Shift4 api. Server is live!")
})

app.listen(port, () => {
    console.log(`Server is live at port no. ${port}`);
})

