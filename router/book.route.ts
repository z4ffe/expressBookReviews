import * as express from 'express'
import bookController from '../controller/book.controller'
import auth from '../middleware/auth.middleware'

const router = express.Router()

router.route('/').get(bookController.getAllBooks)
router.route(('/isbn/:isbn')).get(bookController.getBookByISBN)
router.route(('/author/:author')).get(bookController.getBooksByAuthor)
router.route(('/title/:title')).get(bookController.getBookByTitle)
router.route(('/review/:isbn'))
	.get(bookController.getReviewByISBN)
	.post(auth, bookController.addReviewByISBN)
	.patch(auth, bookController.editBookByISBN)
	.delete(auth, bookController.deleteReviewByISBN)


export default router