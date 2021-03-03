const express = require('express')
const mongoose = require('mongoose')
const password = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const scoreRoutes = require('./routes/score')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.url,keys.connectionParams)
    .then( () => {
        console.log('Connected to database')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(password.initialize())
require('./middleware/passport')(password)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())


app.use('/api/auth', authRoutes)
app.use('/api/score', scoreRoutes)


module.exports = app