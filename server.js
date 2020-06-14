const braintree = require('braintree')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 // port for Heroku deployment

/*serve static files from the folder /public */
app.use(express.static(__dirname + '/public'))


/* start listening on the port */
app.listen(port, () => console.log(`Braintree demo app is listening on port ${port}!`))