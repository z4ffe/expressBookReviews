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
		password: '$2b$10$OrR4q2bIqZGszifyhx6/wu.z3iuPWJAkmRfkhVNtX8rNpI6V/.KK6', //pwd123
		role: Roles.ADMIN,
		books: []
	},
	{
		id: 2,
		name: 'moderator',
		password: '$2b$10$OrR4q2bIqZGszifyhx6/wu.z3iuPWJAkmRfkhVNtX8rNpI6V/.KK6', //pwd123
		role: Roles.MODERATOR,
		books: []
	},
	{
		id: 3,
		name: 'user',
		password: '$2b$10$OrR4q2bIqZGszifyhx6/wu.z3iuPWJAkmRfkhVNtX8rNpI6V/.KK6', //pwd123
		role: Roles.USER,
		books: []
	}
]
