import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

const { ACCESS_TOKEN_SECRET } = process.env
if (!ACCESS_TOKEN_SECRET) {
	throw new TypeError('Environment variable ACCESS_TOKEN_SECRET is not set')
}

export function hasAuthToken(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization

	if (!token) {
		return res.status(403).json({ success: false })
	}

	try {
		const decoded = jwt.verify(token.replace(/^Bearer\s+/, ''), ACCESS_TOKEN_SECRET)
		if (decoded) {
			return next()
		}
		return res.status(401).json({ success: false })
	} catch (err) {
		if (!(err instanceof jwt.TokenExpiredError)) {
			console.error(err)
		}
		return res.status(401).json({ success: false })
	}
}