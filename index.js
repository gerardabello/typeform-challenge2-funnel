var express = require('express')
var proxy = require('express-http-proxy')
var bodyParser = require('body-parser')
var app = express()

/*
 {
 sessionId: {timeStart: int, timeEnd: int, lastSeenBlockRef: string}
 }
 */
let db = {}

app.use(bodyParser.text())

app.use('/form', proxy('localhost:8080'))

app.get('/data', function (req, res) {
  res.send(JSON.stringify(db))
})

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

app.listen(3000, function () {
  console.log('Started on PORT 3000')
})
