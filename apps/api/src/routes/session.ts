import express from 'express'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import * as middleware from './middleware.ts'

const router = express.Router()

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
	throw new TypeError('ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be set')
}

const AUTH_TIMEOUT = '5m'
const REFRESH_TIMEOUT = '30d'

interface AuthTokens {
	success: true
	access: string
	refresh: string
}

function getAuthTokens(): AuthTokens | null {
	try {
		const access = jwt.sign({ sessionId: randomUUID() }, ACCESS_TOKEN_SECRET!, {
			expiresIn: AUTH_TIMEOUT,
		})

		const refresh = jwt.sign({ sessionId: randomUUID() }, REFRESH_TOKEN_SECRET!, {
			expiresIn: REFRESH_TIMEOUT,
		})

		return { success: true, access, refresh }
	} catch (err) {
		console.error(err)
		return null
	}
}

router.get('/session/start', (_req, res) => {
	const tokens = getAuthTokens()

	if (!tokens) {
		return res.status(500).json({ success: false })
	}
	return res.json(tokens)
})

router.get('/session/refresh', middleware.hasAuthToken, (_req, res) => {
	// TODO: not implemented in the original
	return res.status(501).json({ success: false })
})

export default router
