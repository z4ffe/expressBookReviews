import {Router} from 'express'

const router = Router()

router.route('/login')
	.post((req, res) => {
		res.send('works')
	})

router.route('/register')
	.post((req, res) => {
		res.send('works')
	})

export default router