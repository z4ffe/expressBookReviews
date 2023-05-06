import 'express-session'

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
			user: string
		}
	}
}