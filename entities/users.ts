export enum Roles {
	'ADMIN' = 'admin',
	'MODERATOR' = 'moderator',
	'USER' = 'user'
}

export interface IUsers {
	id: number,
	name: string
	password: string
	role: Roles
	books: number[]
}

export const users: IUsers[] = [
	{
		id: 1,
		name: 'admin',
		password: '$2b$10$OrR4q2bIqZGszifyhx6/wu.z3iuPWJAkmRfkhVNtX8rNpI6V/.KK6',
		role: Roles.ADMIN,
		books: []
	}
]
