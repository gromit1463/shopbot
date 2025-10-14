
function hasAuthToken(req, res, next) {
	const jwt = require('jsonwebtoken')
	const token = req.headers['authorization'] || null

	if (!token) {
		res.status(403).json({
			success: false
		})
	} else {
		try {
			const decoded = jwt.verify(token.replace(/^Bearer\s+/, ''), process.env.ACCESS_TOKEN_SECRET)
			if (decoded) {
				return next()
			} else {
				res.status(401)
			}
		} catch (err) {
			if (err.message !== 'jwt expired') {
				console.error(err)
			}
			res.status(401).json({
				success: false
			})
		}
	}
}
exports.hasAuthToken = hasAuthToken
