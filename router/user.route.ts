import {Router} from 'express'
import userController from '../controller/userController'

const router = Router()

router.route('/login').post(userController.login)
router.route('/register').post(userController.register)
router.route('/logout').post(userController.logout)

export default router