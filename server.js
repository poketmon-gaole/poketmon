const express = require('express')
const serverStatic = require('serve-static')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const distDir = __dirname + "/dist/";

// SERVES FILES from our dist directory which now contains out index.html
app.use('/', serverStatic(path.join(__dirname, '/dist')))
app.use(express.static(distDir));
app.listen(port)
console.log('Listening on port:' + port)
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port port!`))