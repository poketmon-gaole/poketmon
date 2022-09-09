const express = require('express')
const serverStatic = require('serve-static')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
// console.log('Listening on port:' + port)
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port port!`))