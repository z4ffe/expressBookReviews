import {NextFunction, Request, Response} from 'express'
import * as httpStatus from 'http-status'

class ApiError extends Error {
	public statusCode: number
	public constructor(statusCode: number, message: string) {
		super()
		this.statusCode = statusCode
		this.message = message
	}
}

const convertToApiError = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
	let error = err
	if (!(err instanceof ApiError)) {
		const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
		const message = error.message || httpStatus[statusCode].toString()
		error = new ApiError(statusCode, message)
	}
	next(error)
}

const handleError = (err: ApiError, res: Response) => {
	const {statusCode, message} = err
	res.status(statusCode).json({
		status: 'error',
		statusCode,
		message,
	})
}

export {ApiError, handleError, convertToApiError}