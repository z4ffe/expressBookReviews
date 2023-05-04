import express from 'express'
import session from 'express-session'
import 'dotenv/config.js'
const customer_routes = require('./router/auth_users').authenticated
const genl_routes = require('./router/general').general

const app = express()

app.use(express.json())

app.use('/customer', session({secret: 'fingerprint_customer', resave: true, saveUninitialized: true}))

app.use('/customer/auth/*', function auth(req: any, res, next) {
//Write the authenication mechanism here
})

app.use('/customer', customer_routes)

app.use('/', genl_routes)

//

const PORT = process.env.PORT || 5005

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
