const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors());

const toysRoutes = require('./api/ToyRoutes')
app.use('/api/toys',toysRoutes) 


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
