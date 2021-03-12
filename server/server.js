const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan') // is this a white angel? why do we use this and not express logger?

const auth = require('./src/services/auth')
const page = require('./src/services/page')

const app = express()
const port = 8000 //set port here

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => res.send('Yearbook server is running!'))

//Making this distinction since some routes do not need auth. For example, viewing canvas. Also readability.
app.use('/auth',auth)

//All no-authorize access 
app.use('/page',page);

// app on port 8000 for now. Let me know if you want me to change it.
app.listen(port, () => console.log(`Yearbook app listening at http://localhost:${port}`))