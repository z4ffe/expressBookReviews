import {NextFunction, Request, Response} from 'express'
import * as httpStatus from 'http-status'
import * as jwt from 'jsonwebtoken'
import {Roles} from '../entities/users'
import {ApiError} from './error.middleware'

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.authorization) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied')
	}
	const {accessToken, user} = req.session.authorization
	try {
		jwt.verify(accessToken, `${process.env.SECRET_JWT}`)
		next()
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated')
	}
}

export default auth