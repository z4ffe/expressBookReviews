import "express-session"

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		PORT: string
		SECRET: string
	}
}

declare module 'express-session' {
	interface SessionData {
		user: string
	}
}