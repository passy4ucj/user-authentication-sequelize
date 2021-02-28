const express = require('express')
const dotenv = require('dotenv')
const { sequelize } = require('./models')


// Creating an express app
const app = express()

// Initializing dotenv
dotenv.config()

// Using JSON parser
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})



const PORT = process.env.PORT || 5000
// App Listener
app.listen(PORT, async () => {
    console.log(`App Listening on PORT ${PORT}`)
    await sequelize.authenticate()
    console.log('Database Connected!')
});