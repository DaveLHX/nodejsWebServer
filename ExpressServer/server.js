const express = require('express')
const compression = require('compression')
const app = express()
const postsFile = './Data/posts.json'
const photosFile = './Data/photos.json'
const logFile = './Logs/log.txt'
const port = process.env.PORT || 3000
// to be able to connect from localhost
var cors = require('cors')
app.use(cors({origin: true, credentials: true}))

/*
stats for photos.json (5000 records)
The file localy is 1071 KB.
on my local instance:
before compress:793 KB and 0.609 ms
after  compress:125 KB and 0.340 ms

*/
app.use(compression())

app.get('/', (req, res) => {
  log(req)
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  res.send('Hello ' + ip + ' from port ' + port + '!!!')
})

app.get('/posts', (req, res) => {
  log(req)
  res.json(getPosts())
})
app.get('/posts/odd', (req, res) => {
  log(req)
  res.json(getOddPost())
})
app.get('/posts/even', (req, res) => {
  log(req)
  res.json(getEvenPost())
})
app.get('/posts/all', (req, res) => {
  log(req)
  res.json(getPosts())
})
app.get('/logs', (req, res) => {
  log(req)
  res.end(getLogs())
})
app.get('/photos', (req, res) => {
  log(req)
  console.log(req)
  res.json(getPhotos())
})

app.get('/posts/:sort', (req, res) => {
  log(req)
  res.send(req.params.sort)
})

function log (req) {
  var fs = require('fs')
  var datetime = '[' + new Date() + '] '
  // req.params.sort
  fs.appendFile(logFile, datetime + req.url + '\n', function (err) {
    if (err) {
      return console.log(err)
    }
  })
}

app.listen(port, () => console.log('Example app listening on port: ' + port))

function getPosts () {
  var fs = require('fs')

  try {
    var content = fs.readFileSync(postsFile)
    return JSON.parse(content)
  } catch (err) {
    return 'Could not load data.'
  }
}

function getPhotos () {
  var fs = require('fs')

  try {
    var content = fs.readFileSync(photosFile)
    return JSON.parse(content)
  } catch (err) {
    return 'Could not load data.'
  }
}

function getLogs () {
  var fs = require('fs')
  try {
    return fs.readFileSync(logFile)
  } catch (err) {
    return 'Could not log file.'
  }
}

function isEven (n) {
  return n % 2 === 0
}

function getEvenPost () {
  var evenPosts = []
  getPosts().forEach(element => {
    if (isEven(element.id)) {
      evenPosts.push(element)
    }
  })
  return evenPosts
}

function getOddPost () {
  var posts = []
  getPosts().forEach(element => {
    if (!isEven(element.id)) {
      posts.push(element)
    }
  })
  return posts
}
