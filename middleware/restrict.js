const jwt = require("jsonwebtoken")
require('dotenv').config()

function restrict() {

	return async (req, res, next) => {
		const authError = {
			message: "You do not have the right clearance to access this page!",
		}
		try {
			// token is coming from the client's cookie jar, in the "Cookie" header
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			// decode the token, re-sign the payload, and check if signature is valid
			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				req.token = decoded				
				next()
			})

		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict