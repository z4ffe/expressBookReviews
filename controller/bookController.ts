import {NextFunction, Request, Response} from 'express'
import {books} from '../entities/books'

const bookController = {
	getAllBooks(req: Request, res: Response, next: NextFunction) {
		res.json(books)
	}
}

export default bookController