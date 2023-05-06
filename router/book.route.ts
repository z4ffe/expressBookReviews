import * as express from 'express'
import bookController from '../controller/book.controller'
import auth from '../middleware/auth.middleware'

const router = express.Router()

router.route('').get(auth, bookController.getAllBooks)


export default router