const express = require('express')
const router = express.Router()

const TicketBasket = require('../../models/TicketBasket')

// TICKET BASKET ROUTES

// get all baskets
router.get('/', (req, res) => {
    return new TicketBasket().fetchAll().then(baskets => {
        res.json({ baskets })
    })
})

// get ticket basket 
router.get('/:sessionId', (req, res) => {
    return new TicketBasket().where('session_id', req.params.sessionId).fetchAll().then( basket => {
        res.json({ basket: basket.serialize() })
    }).catch( err => {
        res.status(500).send(err)
    } )
})  

// add ticket item
router.post('/:ticket_id', (req, res) => {
    new TicketBasket({
        'ticketId': req.params.ticket_id,
        'session_id': req.body.sessionId
    })
    .save()
    res.status(200).send('success')
    
})

// edit ticket 
router.put('/:id', (req, res) => {
    return new TicketBasket().where('id', req.params.id).fetch().then(ticket => {
        if (ticket) 
            Object.keys(ticket).map((key, value) => {
                tickets.set(key, req.body[key])
            })
            return ticket.save()
    }).then(ticket => {
        res.status(200).send('success')
    }).catch(err => {
        res.status(500).send('Error: ' + err)
    })
})

router.delete('/:id', (req, res) => {
    return new TicketBasket().where('id', req.params.id).fetch().then(tb => {
        if (tb) 
            tb.destroy()
    }).then(tb => {
        res.status('success')
    }).catch(err => {
        res.status(500).send('err: ' + err)
    })
})

module.exports = router