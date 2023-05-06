import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import {IUsers, Roles, users} from '../entities/users'
import {ApiError} from '../middleware/error.middleware'

const registerNewUser = (name: string, password: string): IUsers[] => {
	try {
		const hashedPassword = bcrypt.hashSync(password, 10)
		const lastId = users.at(-1)!.id
		users.push({
			id: lastId + 1,
			name: name,
			password: hashedPassword,
			role: Roles.USER,
			books: [],
		})
		return users
	} catch (error) {
		throw error
	}
}

const login = (name: string, password: string)  => {
	try {
		const user = users.filter(user => user.name === name)[0]
		const compareResult = bcrypt.compareSync(password, user.password)
		if (!compareResult) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password')
		}
		const accessToken = jwt.sign({password}, `${process.env.SECRET_JWT}`, {expiresIn: 3600})
		return {user: user.name, accessToken, role: user.role, id: user.id}
	} catch (error) {
		throw error
	}
}

export default {registerNewUser, login}