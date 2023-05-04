const cookieExpireTime = 1000 * 60 * 60;

export const sessionsCfg = {
	secret: "secret",
	saveUninitialized: true,
	cookie: { maxAge: cookieExpireTime },
	resave: false
}