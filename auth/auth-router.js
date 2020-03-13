const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")
const { sessions, restrict } = require("../middleware/restrict")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!user || !passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
// create a new session for user and give server a way to remember the user
// on a login req we get `Authorization	0.029106852949511097` in the res header
// `Set-cookies` with return a token in res.header
		// const authToken = Math.random()
		// sessions[authToken] = user.id

		//
		//res.setHeader("Authorization", AuthToken)
		//
		// res.header("Set-Cookie", `token=${authToken}; path=/`)
		// 
		req.session.user = user
		//this will do all the 'Set-cookie' from the middleware express-session we set up in index.js, but now cookie is `token=s%3AZ8XEFMmb75quSiwkObQSXBvLfAPbP6RT.3x8sf1TELQWfdDowF8HwvFnLd0YX5kQw5nNOjp18DQQ; Path=/; HttpOnly`
		
		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout", restrict(), (req, res, next) => {
	// destroy the session here
	res.end()
})

module.exports = router