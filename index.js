const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")
const session = require('express-session')
const server = express()
const port = process.env.PORT || 5000
const KnexSessionStore = require('connect-session-knex')(session) //call funciton right after import
const dbConfig = require('./database/config')

server.use(cors())
server.use(helmet())
server.use(express.json())

//make higher order>>>>>>>>>>>
server.use(session({
	name: "token", //name our cookie, hides our tech stack (keeps hackers from knowing how to exploit)
	resave: false, // avoid recreating sessions that have not changed
	saveUninitialized: false, // GDPR or CCPA(in Cali) law against setting cookies automaticlly
	secret: "keep it secret, keep it safe", // cryptographiclly sign the cookie
	cookie: {
		httpOnly: true, // disallow JS from reading our cookies contents
		maxAge: 15 *100, // expire the cookie after 15 seconds
	},
	store: new KnexSessionStore({
		createTable: true, // if session table doesn't exist, creat automatically,
		knex: dbConfig, //config instance of knex
	}),
}))
server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
