import * as express from 'express'
import bookController from '../controller/bookController'
import auth from '../middleware/AuthMiddleware'

const router = express.Router()

router.route('').get(auth, bookController.getAllBooks)


export default router