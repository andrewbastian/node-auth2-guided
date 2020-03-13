const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")

const sessions ={}

function restrict() {
	const authError = {
		message: "Invalid credentials",
	}
	
	return async (req, res, next) => {
		console.log(req.headers)
		try {
			// const { username, password } = req.headers
			// if (!username || !password) {
			// 	return res.status(401).json(authError)
			// }

			// const user = await Users.findBy({ username }).first()
			// if (!user) {
			// 	return res.status(401).json(authError)
			// }

			// const passwordValid = await bcrypt.compare(password, user.password)
			// if (!passwordValid) {
			// 	return res.status(401).json(authError)
			// }

			// const { authorization } = req.headers
			// if (!sessions[authorization]) {
			// 	return res.status(401).json(authError)
			// }
			// 
			//manual method >>>>>>>>>>>>>>>
			   // const { cookie } =req.headers
			   // if (!cookie) {
			   // 	return res.status(401).json(authError)
			   // }

			   // const authToken = cookie.replace("token=", "")
			   // if (!sessions[authToken]) {
			   // 	return res.status(401).json(authError)
			   // }
			   //<<<<<<<<<<<<<<<<<<<<<<
			   if (!req.sessions || !req.session.user){
			   	return res.status(401).json(authError)
			   }

			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
	sessions,
}