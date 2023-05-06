import 'express-session'
import {Roles} from './entities/users'

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string
			SECRET: string
			SECRET_JWT: string
		}
	}
}

declare module 'express-session' {
	interface SessionData {
		authorization: {
			accessToken: string
			id: number
			user: string
			role: Roles
		}
	}
}