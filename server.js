const app = require('express')()
const fs = require('fs')

app.set('view engine', 'ejs')
app.set("views", __dirname); // Set ejs relative path to this file

app.get('/*', function(req, res) {
  const ejsPath = 'views/pages' // Path relative to this file

  // Add index if url end with /
  if (req.originalUrl.substr(req.originalUrl.length - 1) === '/') {
    req.originalUrl += 'index'
  }
  console.log(ejsPath + req.originalUrl + '.ejs')
  fs.stat( ejsPath + req.originalUrl + '.ejs', function(stat) {
    if (stat) {
      // Handle 404 not found (-4058: ENOENT)
      if (stat.errno === -4058) {
        res.render(ejsPath + '/404.ejs')
      }
      return
    }
    const options = {} // Whatever variable you want to access from .ejs file

    res.render(ejsPath + req.originalUrl + '.ejs', options)
  })
})

app.listen(8080)