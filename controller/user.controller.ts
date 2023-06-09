import {Request, Response, NextFunction} from 'express'
import {Roles} from '../entities/users'
import {ApiError} from '../middleware/error.middleware'
import userService from '../service/user.service'
import httpStatus from 'http-status'
import {userValidate} from '../utils/userValidate'

const userController = {
	login(req: Request, res: Response, next: NextFunction) {
		try {
			const {name, password} = req.body
			const {userExist} = userValidate(name, password)
			if (req.session.authorization) {
				throw new ApiError(httpStatus.BAD_REQUEST, 'Already logged in')
			}
			if (!userExist) {
				throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
			}
			const {accessToken, user, role, id} = userService.login(name, password)
			if (!accessToken || !user) {
				throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password')
			}
			req.session.authorization = {accessToken, user, role, id}
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
				throw new ApiError(httpStatus.BAD_REQUEST, 'User and password must be longer than 4 chars')
			}
			if (userExist) {
				throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist')
			}
			const newUser = userService.registerNewUser(name, password)
			res.status(httpStatus.OK).send(newUser)
		} catch (error) {
			next(error)
		}
	},
	logout(req: Request, res: Response, next: NextFunction) {
		try {
			req.session.destroy((error) => next(error))
			res.status(httpStatus.OK).send('Logout successful')
		} catch (error) {
			next(error)
		}
	},
}

declare module 'express-session' {
	interface SessionData {
		authorization: {
			accessToken: string
			id: number
			user: string
			role: Roles
		}
	}
}

export default userController
