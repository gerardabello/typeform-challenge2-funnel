var express = require('express')
var proxy = require('express-http-proxy')
var bodyParser = require('body-parser')
var app = express()

const PORT = 3000

/*
 {
  sessionId: {timeStart: int, timeEnd: int, lastSeenBlockRef: string}
 }
 */
let db = {}

app.use(bodyParser.text())

// FORM ENDPOINT (redirect to stkv)
app.use('/form', proxy('http://localhost:8080'))
app.use(
  '/index.js',
  proxy('localhost:8080', {
    proxyReqPathResolver: function (req) {
      return '/index.js'
    }
  })
)

// DATA ENDPOINT
app.get('/data', function (req, res) {
  res.send(JSON.stringify(db))
})

// TRACKING ENDPOINTS
app.post('/load', function (req, res) {
  const body = JSON.parse(req.body)
  const sessionId = body.sessionId

  db[sessionId] = { timeStart: new Date().getTime() }

  res.end()
})

app.post('/unload', function (req, res) {
  const body = JSON.parse(req.body)
  const sessionId = body.sessionId

  if (!db[sessionId]) {
    return
  }

  db[sessionId] = Object.assign({}, db[sessionId], {
    timeEnd: new Date().getTime(),
    lastSeenBlockRef: body.lastSeenBlockRef
  })

  res.end()
})

app.post('/submit', function (req, res) {
  const body = JSON.parse(req.body)
  const sessionId = body.sessionId

  if (!db[sessionId]) {
    console.log('Unknown sessionId ' + sessionId)
    return
  }

  db[sessionId] = Object.assign({}, db[sessionId], {
    timeEnd: new Date().getTime(),
    lastSeenBlockRef: 'submit'
  })
  res.end()
})

app.listen(PORT, function () {
  console.log(`Started on PORT ${PORT}`)
})
