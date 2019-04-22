const express = require('express')
const router = express.Router()

const TicketHolder = require('../../models/TicketHolder')

// get all ticket holders
router.get('/', (req, res) => {
    return new TicketHolder().fetchAll().then((ticketHolders) => {
        res.json({ ticketHolders: ticketHolders.serialize() })
    }).catch((err) => {
        res.status(500).send('could not retrieve ticket holders from database')
    })
})

// create ticketHolder 
router.post('/', (req, res) => {
    return new TicketHolder({
        name: req.body.name,
        ticket_id: req.body.ticket_id,
        gig_id: req.body.gig_id,
        bought_on: req.body.bought_on,
        email: req.body.email
    }).save().then((ticket) => {
        res.status(200).send('success')
    })
})


// delete TicketHolder
router.delete('/:id', (req, res) => {
    return new TicketHolder().where('id', req.params.id).fetch().then((ticketHolder) => {
        if (ticketHolder)
            ticketHolder.destroy().then((ticketHolder) => {
                res.send('sucess')
            }).catch((err) => {
                res.status(500).send(`err: ${err}`)
            }
        )
    })
})

module.exports = router