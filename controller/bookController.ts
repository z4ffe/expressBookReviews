import {NextFunction, Request, Response} from 'express'

const bookController = {
	getAllBooks(req: Request, res: Response, next: NextFunction) {
		res.send('ALL')
	}
}

export default bookController