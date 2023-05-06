export interface IUsers {
	id: number,
	name: string
	password: string
	role: 'admin' | 'user'
	books: number[]
}

export const users: IUsers[] = [
	{
		id: 1,
		name: 'admin',
		password: '$2b$10$OrR4q2bIqZGszifyhx6/wu.z3iuPWJAkmRfkhVNtX8rNpI6V/.KK6',
		role: 'admin',
		books: []
	}
]
