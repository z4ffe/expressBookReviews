import {NextFunction, Request, Response} from 'express'
import * as httpStatus from 'http-status'

const auth = (req: Request, res: Response, next: NextFunction) => {
		if (req.session!.user) {
			next()
		} else {
			res.status(httpStatus.BAD_REQUEST).send('You are not logged in')
		}
}

export default auth