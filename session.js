exports.session = session({
    name: 'session',
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1800000,
        sameSite: true,
        secure: false
    }
})