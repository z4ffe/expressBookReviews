import httpStatus from 'http-status'
import {books} from '../entities/books'
import {Roles} from '../entities/users'
import {ApiError} from '../middleware/error.middleware'

const addReviewToBook = (isbn: number, text: string, id: number, name: string) => {
	const book = books.filter(book => book.id === isbn)[0]
	if (!book) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Book with this ISBN not found')
	}
	const userReviews = book.reviews.filter(review => review.userID === id)[0]
	if (userReviews) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'You already added review for this book')
	}
	book.reviews.push({
		userID: id,
		userName: name,
		text: text
	})
	const booksList = books.filter(book => book.id !== isbn)
	return book
}

const editBookReview = (isbn: number, text: string, id: number, name: string, role: Roles) => {
	const book = books.filter(book => book.id === isbn)[0]
	const review= book.reviews.filter(review => review.userID === id)[0]
	if ((!book || !review) && !(role === Roles.ADMIN || role === Roles.MODERATOR)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Book with this ISBN/UserID not found')
	}
	review.text = text
	return book
}

const deleteReviewByISBN = (isbn: number, id: number, role: Roles) => {
	const book = books.filter(book => book.id === isbn)[0]
	const bookIndex = books.indexOf(book)
	const review= book.reviews.filter(review => review.userID === id)[0]
	if (review || role === Roles.ADMIN) {
		return book.reviews = book.reviews.slice(bookIndex, 1)
	} else {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong')
	}
}

export default {addReviewToBook, editBookReview, deleteReviewByISBN}
