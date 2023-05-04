import {Request, Response, NextFunction} from 'express'
import userService from '../service/user.service'
import httpStatus from 'http-status'
import {userValidate} from '../utils/userValidate'

const userController = {
	login(req: Request, res: Response, next: NextFunction) {
		try {
			const {name, password} = req.body
			const {userValidation, userExist} = userValidate(name, password)
			if (req.session!.user) {
				return res.status(httpStatus.OK).send('Already logged in')
			}
			if (!userExist) {
				return res.status(httpStatus.NOT_FOUND).send('User not found')
			}
			const loginStatus = userService.login(name, password)
			if (!loginStatus) {
				res.status(httpStatus.BAD_REQUEST).send('Wrong password')
			}
			req.session!.user = loginStatus
			res.status(httpStatus.OK).send('Logged in')
		} catch (error) {
			next(error)
		}
	},

	register(req: Request, res: Response, next: NextFunction) {
		try {
			const {name, password} = req.body
			const {userValidation, userExist} = userValidate(name, password)
			if (userValidation) {
				return res.status(httpStatus.BAD_REQUEST).send('User and/or password not provided')
			}
			if (userExist) {
				return res.status(httpStatus.BAD_REQUEST).send('User already exist')
			}
			const newUser = userService.registerNewUser(name, password)
			res.status(200).send(newUser)
		} catch (error) {
			next(error)
		}
	},
}

export default userController