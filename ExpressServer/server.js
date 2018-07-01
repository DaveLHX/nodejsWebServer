const express = require('express')
const app = express()
// to be able to connect from localhost
var cors = require('cors')
app.use(cors({origin: true, credentials: true}))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/posts', (req, res) => {
  res.json(getJson())
})
app.get('/posts/odd', (req, res) => {
  res.json(getOddPost())
})
app.get('/posts/even', (req, res) => {
  res.json(getEvenPost())
})
app.get('/posts/all', (req, res) => {
  res.json(getJson())
})

app.get('/posts/:sort', (req, res) => {
  console.log(req.params.sort)
  var fs = require('fs')
  fs.writeFile('savedParam.txt', req.params.sort, function (err) {
    if (err) {
      return console.log(err)
    }

    console.log('The file was saved!')
  })
  res.send(req.params.sort)
})
var port = process.env.PORT || 3000
app.listen(port, () => console.log('Example app listening on port: ' + port))

function getJson () {
  var fs = require('fs')
  var content = fs.readFileSync('./posts.json')
  return JSON.parse(content)
}

function isEven (n) {
  return n % 2 === 0
}

function getEvenPost () {
  var evenPosts = []
  getJson().forEach(element => {
    if (isEven(element.id)) {
      evenPosts.push(element)
    }
  })
  return evenPosts
}

function getOddPost () {
  var evenPosts = []
  getJson().forEach(element => {
    if (!isEven(element.id)) {
      evenPosts.push(element)
    }
  })
  return evenPosts
}
