import {NextFunction, Request, Response} from 'express'
import httpStatus from 'http-status'
import {books} from '../entities/books'
import {ApiError} from '../middleware/error.middleware'
import bookService from '../service/book.service'

const bookController = {
	getAllBooks(req: Request, res: Response, next: NextFunction) {
		if (!books.length) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Books list is empty')
		}
		res.status(httpStatus.OK).json(books)
	},
	getBookByISBN(req: Request, res: Response, next: NextFunction) {
		const {isbn} = req.params
		const bookList = books.filter(book => book.id === +isbn)
		if (!bookList.length) {
			throw new ApiError(httpStatus.OK, 'Books not found')
		}
		res.status(httpStatus.OK).send(bookList)
	},
	getBookByAuthor(req: Request, res: Response, next: NextFunction) {
		const {author} = req.params
		const bookList = books.filter(book => book.author.toLowerCase() === author.toLowerCase())
		if (!bookList.length) {
			throw new ApiError(httpStatus.OK, 'Books not found')
		}
		res.status(httpStatus.OK).send(bookList)
	},
	getBookByTitle(req: Request, res: Response, next: NextFunction) {
		const {title} = req.params
		const bookList = books.filter(book => book.title.toLowerCase() === title.toLowerCase())
		if (!bookList.length) {
			throw new ApiError(httpStatus.OK, 'Books not found')
		}
		res.status(httpStatus.OK).send(bookList)
	},
	getReviewByISBN(req: Request, res: Response, next: NextFunction) {
		const {isbn} = req.params
		const bookList = books.filter(book => book.id === +isbn)[0]
		if (!bookList.reviews.length) {
			throw new ApiError(httpStatus.OK, 'Review not found')
		}
		res.status(httpStatus.OK).send(bookList.reviews)
	},
	addReviewByISBN(req: Request, res: Response, next: NextFunction) {
		try {
			const {isbn} = req.params
			const {text} = req.body
			const {id, user} = req.session.authorization!
			const book = bookService.addReviewToBook(+isbn, text, id, user)
			res.status(httpStatus.OK).json(book)
		} catch (error) {
			next(error)
		}
	},
	editBookByISBN(req: Request, res: Response, next: NextFunction) {
		try {
			const {isbn} = req.params
			const {text} = req.body
			const {id, user, role} = req.session.authorization!
			const book = bookService.editBookReview(+isbn, text, id, user, role)
			res.status(httpStatus.OK).json(book)
		} catch (error) {
			next(error)
		}
	},
	deleteReviewByISBN(req: Request, res: Response, next: NextFunction) {
		try {
			const {isbn} = req.params
			const {id, user, role} = req.session.authorization!
			bookService.deleteReviewByISBN(+isbn, id, role)
			res.status(httpStatus.OK).json(`Review by ${user} for Book with ISBN: ${isbn} deleted`)
		} catch (error) {
			next(error)
		}
	},
}


export default bookController