const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/posts', (req, res) => {
  var posts = JSON.parse(getJson())
  res.json(posts)
})
function getJson () {
  var fs = require('fs')
  var content = fs.readFileSync('./posts.json')
  return content
}
app.listen(3000, () => console.log('Example app listening on port 3000!'))
