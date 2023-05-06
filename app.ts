import express, {Request, Response, NextFunction} from 'express'
import cookieParser from 'cookie-parser'
import sessions from 'express-session'
import 'dotenv/config.js'
import {sessionsCfg} from './config/sessions'
import {ApiError, convertToApiError, handleError} from './middleware/error.middleware'
import router from './router'

const app = express()

app.set('x-powered-by', 'PL');
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

//

app.use(sessions(sessionsCfg));

//

app.use('/api', router)

//

app.use(convertToApiError)
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => handleError(err, res))

//

const PORT = process.env.PORT || 5005
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
