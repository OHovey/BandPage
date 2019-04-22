const express = require('express')
const app = express()
var session = require('express-session')
const validator = require('express-validator')
const cookieParser = require('cookie-parser')
app.set('trust_proxy', 1) 

//stripe setup 
let stripe = require('stripe')('sk_test_q1bXj9i1sRP6EmZxUs3f2vhG')

// declare middleware 
let bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// parse application json data 
app.use(bodyParser.json())
// parse application/x-www-form-url-encoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
// app.use(express.session({ store: sessionStore, secret: 'my cat 2' }))

app.use(session({
    name: 'sid',
    secret: 's3cret',
    credentials: true,
    saveUninitialized: true,
    resave: false
}))

// express validator 
app.use(validator())

// db connection
const db = require('./database/db')
app.set('bookshelf', db)

// API Setup 
app.use('/api/basket', require('./server/routes/basketRoutes'))
app.use('/api/ticketBasket', require('./server/routes/ticketBasketRoutes'))
app.use('/api/tickets', require('./server/routes/ticketRoutes'))
app.use('/api/gigs', require('./server/routes/gigDetailRoutes'))
app.use('/api/products', require('./server/routes/merchendiseRoutes'))
app.use('/api/ticket_holders', require('./server/routes/TicketHolderRoutes'))
app.use('/api/admin', require('./server/routes/adminRoutes'))
app.get('/session', (req, res) => {
    req.session.save()
    res.send(req.sessionID)
})

if (process.env.NODE_ENV === 'production') {

    // static folder 
    app.use(express.static(__dirname, "/server/public/"))

    // Handle SPA 
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/server/public/index.html'))
}

const port = process.env.PORT || 3000 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})