import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config.js'
import router from './router'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

//

app.use('/api', router)

//

const PORT = process.env.PORT || 5005
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
