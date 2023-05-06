import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import {IUsers, users} from '../entities/users'
import {ApiError} from '../middleware/error.middleware'

const registerNewUser = async (name: string, password: string): Promise<IUsers> => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		const lastId = users.at(-1)!.id
		users.push({
			id: lastId + 1,
			name: name,
			password: hashedPassword,
			books: [],
		})
		return users.at(-1) as IUsers
	} catch (error) {
		throw error
	}

}

const login = async (name: string, password: string): Promise<string> => {
	try {
		const user = users.filter(user => user.name === name)[0]
		const compareResult = await bcrypt.compare(password, user.password)
		if (!compareResult) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password')
		}
		return user.name
	} catch (error) {
		throw error
	}
}

export default {registerNewUser, login}