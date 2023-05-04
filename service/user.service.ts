import httpStatus from 'http-status'
import {IUsers, users} from '../entities/users'
import {ApiError} from '../middleware/error.middleware'

const registerNewUser = (name: string, password: string): IUsers[] => {
	try {
		const lastId = users.at(-1)!.id
		users.push({
			id: lastId + 1,
			name: name,
			password: password,
			books: [],
		})
		return users
	} catch (error) {
		throw error
	}

}

const login = (name: string, password: string): string | undefined => {
	try {
		const user = users.filter(user => user.name === name)[0]
		if (password !== user.password) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password')
		}
		return user.name
	} catch (error) {
		throw error
	}
}

export default {registerNewUser, login}