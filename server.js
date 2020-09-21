// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const port = 3000

//enable trust proxy to get the leftmost entry in X-Forwarded-For header, i.e. the client's address
app.enable('trust proxy')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/whoami/', (req, res) => {
  //res.json(req.header('User-Agent'))
  const ip = req.ip
  const acceptLanguage = req.header('Accept-Language')
  const software = req.header('User-Agent')

  res.json({ ipaddress: ip, language: acceptLanguage, software: software })
  //res.json(req.headers.host)
})

// your first API endpoint... 
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' })
})

const listener = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

/*
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
*/