const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session)
const db = require('./data/configs')
require('dotenv').config()

const usersRouter = require('./API/users/users-routers')
const departmentRouter = require('./API/departments/departments-routers')
const projectRouter = require('./API/projects/projects-router')
const taskRouter = require('./API/tasks/tasks-router')

const app = express()
app.set('trust proxy', 1)

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(cookieParser())  


app.use('/users/', usersRouter)
app.use('/department/', departmentRouter)
app.use('/project/', projectRouter)
app.use('/task/', taskRouter)


module.exports = app