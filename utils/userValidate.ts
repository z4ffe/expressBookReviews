import {users} from '../entities/users'

type UserValidate = {
	userExist: boolean
	userValidation: boolean
}

export const userValidate = (name: string, password: string): UserValidate => {
	const userExist = !!users.filter(user => user.name === name)[0]
	const userValidation = !name || !password || password.length < 4 || name.length < 2
	return {userExist, userValidation}
}