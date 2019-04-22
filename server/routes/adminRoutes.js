const express = require('express')
const router = express.Router()
const uuidv1 = require('uuid/v1')

const Product = require('../../models/Product')
const Ticket = require('../../models/Ticket')
const ProductBasket = require('../../models/Basket')
const TicketBasket = require('../../models/TicketBasket')

router.use((req, res, next) => {
    return new AdminSession().where('sessionId', req.body.sessionId).fetch().then(session => {
        if (session) next()
        else login(req, res, next)
    })
})

// admin login
function login(req, res) {
    try {
        return new LoginSession({
            username: req.body.username,
            password: req.body.password
        }).then(loginSession => {
            res.status(200).send('logged in')
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

// get all tickets
router.get('/tickets/:sessionId', (req, res) => {
    return new Ticket().fetchAll().then(tickets => {
        res.json({ items: tickets.serialize() })
    }).catch(err => {
        res.status(500).send(err)
    })
})

module.exports = router