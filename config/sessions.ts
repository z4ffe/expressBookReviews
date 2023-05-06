import 'dotenv/config.js'
import {SessionOptions} from 'express-session'

const SECRET = process.env.SECRET
const cookieExpireTime = 1000 * 60 * 60;

export const sessionsCfg: SessionOptions = {
	secret: `${SECRET}`,
	saveUninitialized: true,
	cookie: { maxAge: cookieExpireTime },
	resave: false
}