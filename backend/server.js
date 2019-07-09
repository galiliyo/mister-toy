const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const port = process.env.PORT || 3000;



app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cookieParser());

app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        // path: '/'
    }
}))

const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));

const toyRoute = require('./api/toy.routes');
// const userRoute = require('./api/user.routes')

app.use('/api/toy', toyRoute)
// app.use('/api/user', userRoute)

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))