var express = require('express')
var proxy = require('express-http-proxy')
var bodyParser = require('body-parser')
var app = express()

const PORT = 3000

let db = []

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
app.post('/track', function (req, res) {
  const body = JSON.parse(req.body)

  db.push({
    type: body.blockType,
    formId: body.formId,
    sessionId: body.sessionId,
    blockRef: body.blockRef,
    timestamp: new Date().getTime()
  })

  res.end()
})

app.listen(PORT, function () {
  console.log(`Started on PORT ${PORT}`)
})
