export interface IBooks<T> {
	id: number
	author: string,
	title: string,
	reviews: T
}

interface IReviews {
	userID: number
	userName: string
	text: string
}

export const books: IBooks<IReviews[]>[] = [
	{id: 1, 'author': 'Chinua Achebe', 'title': 'Things Fall Apart', 'reviews': [{userID: 1, userName: 'admin', text: 'Amazing!'}]},
	{id: 2, 'author': 'Hans Christian Andersen', 'title': 'Fairy tales', 'reviews': []},
	{id: 3, 'author': 'Dante Alighieri', 'title': 'The Divine Comedy', 'reviews': []},
	{id: 4, 'author': 'Unknown', 'title': 'The Epic Of Gilgamesh', 'reviews': []},
	{id: 5, 'author': 'Unknown', 'title': 'The Book Of Job', 'reviews': []},
	{id: 6, 'author': 'Unknown', 'title': 'One Thousand and One Nights', 'reviews': []},
	{id: 7, 'author': 'Unknown', 'title': 'Nj\u00e1l\'s Saga', 'reviews': []},
	{id: 8, 'author': 'Jane Austen', 'title': 'Pride and Prejudice', 'reviews': []},
	{id: 9, 'author': 'Honor\u00e9 de Balzac', 'title': 'Le P\u00e8re Goriot', 'reviews': []},
	{id: 10, 'author': 'Samuel Beckett', 'title': 'Molloy, Malone Dies, The Unnamable, the trilogy', 'reviews': []},
]
