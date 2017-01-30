/* eslint-disable no-console */
const dotenv = require('dotenv')

// Load environment variables from .env file
// need to do this before initializing other modules (e.g. debug)
dotenv.load()

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieSession = require('cookie-session')

const app = express()

/*
These settings are from the original intake index.js.
We'll need to parse through and figure out which we want to use.

// production middleware
if (app.get('env') === 'production') {
  // redirect http requests to https
  // use trustProtoHeader: true when behind load balancer/reverse proxy
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
  app.set('trust proxy', 1)

  // production error handler
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.use(helmet())

app.use(compression())
app.use(methodOverride('_method'))
*/

// Are we actually using these?
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'html')

// We are actually using these:
app.set('port', process.env.PORT)

app.use(logger('combined'))

app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000,
  overwrite: true,
  signed: false,
  httpOnly: false,
}))

app.use(express.static('public'))
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/public/index.html`)
})

const sms = require('./controller/sms/sms')
const web = require('./controller/web')

// SMS route
app.post('/sms', sms.dispatcher)

// web app routes
app.post('/submit', web.submit)

// Listen for HTTP requests
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
