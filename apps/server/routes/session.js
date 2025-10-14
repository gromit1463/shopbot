const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')

const AUTH_TIMEOUT = '5m'
const REFRESH_TIMEOUT = '30d'

function getAuthTokens() {
	try {
		const token = jwt.sign(
			{
				sessionId: crypto.randomUUID(),
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: AUTH_TIMEOUT,
			}
		)

		const refresh = jwt.sign(
			{
				sessionId: crypto.randomUUID(),
			},
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: REFRESH_TIMEOUT,
			}
		)

		return {
			success: true,
			access: token,
			refresh: refresh,
		}
	} catch (err) {
		console.error(err)
		return false
	}
}

router.get('/session/start', function (req, res, next) {
	try {
		const tokens = getAuthTokens()

		if (tokens) {
			res.json(tokens)
		} else {
			res.status(500).json({
				success: false
			})
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({
			success: false
		})
	} finally {
		return next()
	}
})

router.get('/session/refresh', middleware.hasAuthToken, function (req, res, next) {
	try {

	} catch (err) {
		console.error(err)
		res.status(500).json({
			success: false
		})
	} finally {
		return next()
	}
})

module.exports = router;
