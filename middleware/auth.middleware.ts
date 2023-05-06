import {NextFunction, Request, Response} from 'express'
import * as httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import {ApiError} from './error.middleware'

declare module 'express-session' {
	interface SessionData {
		authorization: {
			accessToken: string
			user: string
		}
	}
}

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.authorization) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied')
	}
	const {accessToken, user} = req.session.authorization
	try {
		const verify = jwt.verify(accessToken, `${process.env.SECRET_JWT}`)
		next()
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied')
	}

}

export default auth