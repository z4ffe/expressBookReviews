interface IUsers {
	id: number,
	name: string
	password: string
	books: number[]
}

const users: IUsers[] = [
	{
		id: 1,
		name: 'admin',
		password: 'pwd123',
		books: []
	}
]

