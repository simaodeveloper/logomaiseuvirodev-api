const dotenv = require('dotenv')

dotenv.config({ path: './config/.env.development' })

const express = require('express')

const authRoutes = require('./routes/auth')
const { DBConnect } = require('./infrastructure/db')

const errorHandler = require('./middlewares/errors')

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/v1/auth', authRoutes)

// errors
app.use(errorHandler)

// start
DBConnect()
  .then(() => {
    console.log('[MONGODB] connected!')
    app.listen(3000, () => console.log('[APP] running! http://localhost:3000'))
  })
  .catch(err => console.log(err))
