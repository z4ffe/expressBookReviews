import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import {IUsers, users} from '../entities/users'
import {ApiError} from '../middleware/error.middleware'

const registerNewUser = (name: string, password: string): IUsers[] => {
	try {
		const hashedPassword = bcrypt.hashSync(password, 10)
		const lastId = users.at(-1)!.id
		users.push({
			id: lastId + 1,
			name: name,
			password: hashedPassword,
			books: [],
		})
		return users
	} catch (error) {
		throw error
	}

}

const login = (name: string, password: string): string => {
	try {
		const user = users.filter(user => user.name === name)[0]
		const compareResult = bcrypt.compareSync(password, user.password)
		if (!compareResult) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password')
		}
		return user.name
	} catch (error) {
		throw error
	}
}

export default {registerNewUser, login}