import {NextFunction, Request, Response} from 'express'
import * as httpStatus from 'http-status'
import {ApiError} from './error.middleware'

const auth = (req: Request, res: Response, next: NextFunction) => {
		if (req.session!.user) {
			next()
		} else {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied')
		}
}

export default auth