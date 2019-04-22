const express = require('express')
const router = express.Router()

const Ticket = require('../../models/Ticket')

// OTHER TICKET ROUTES

// get all tickets
router.get('/', (req, res) => {
    return new Ticket().fetchAll().then((tickets) => {
        res.json({ tickets: tickets.serialize() })
    })
})

//get individual ticket 
router.get('/:ticket_id', (req, res) => {
    return new Ticket().where('id', req.params.ticket_id).fetchAll().then( ticket => {
        res.json({ ticket: ticket.serialize() })
    }).catch((err) => {
        reject (err)
    })
})

// create ticket 
router.post('/', (req, res) => {
    new Ticket({
        gig: req.body.gig,
        venue: req.body.venue,
        sold: false,
        exp_data: req.body.exp_date,

    }).save()
    res.status(200).send('success')
})

// update ticket once sold 
router.put('/:id', (req, res) => {
    return new Ticket().where('id', req.params.id).fetch().then((ticket) => {
        if (ticket)
            Object.keys(req.body).map((key, value) => {
                ticket.set(key, req.body[key])
            })
            return ticket.save()
    }).then((ticket) => {
        res.status(200).send('success')
    }).catch((err) => {
        res.status(500).json({ err })
    })
})

// delete ticket
router.delete('/:id', (req, res) => {
    return new Ticket().where('id', req.params.id).fetch().then((ticket) => {
        if (ticket)
            ticket.destroy().then((ticket) => {
                res.status(200).send('ticket deleted from database')
            }).catch((err) => {
                res.status(500).send(err)
            })
    })
})

module.exports = router