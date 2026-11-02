import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import indexRouter from './src/routes/index.js'
import sessionRouter from './src/routes/session.js'
import barcodeRouter from './src/routes/barcode.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/', barcodeRouter)
app.use('/', sessionRouter)

// catch 404 and forward to error handler
// (re-add `import createError from 'http-errors'` and the dependency to use this)
// app.use(function (req, res, next) {
// 	next(createError(404))
// })

// error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message
// 	res.locals.error = req.app.get('env') === 'development' ? err : {}
// 	console.error(err)
// })

export default app
