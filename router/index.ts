import {Router} from 'express'
import userRoute from './user.route'

const router = Router()

interface IRoutes {
	path: string,
	route: Router
}

const routes: IRoutes[] = [
	{
		path: '/user',
		route: userRoute
	},
]

routes.forEach(route => router.use(route.path, route.route))

export default router