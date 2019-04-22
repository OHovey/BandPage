const express = require('express')
const router = express.Router()

const Gig = require('../../models/Gig')

// get all gigs
router.get('/', (req, res) => {
    return new Gig().fetchAll().then((gigs) => {
        res.json({ gigs: gigs.serialize() })
    })
})

// create gig 
router.post('/', (req, res) => {
    return new Gig({ 
        title: req.body.title,
        venue: req.body.venue, 
        date: req.body.date,
        bands: req.body.bands
    }).save().then((gig) => {
        res.status(200).send(`successfully created gig: ${gig.title}`)
    }).catch( err => {
        res.status(500).send(`err: ${err}`)
    })
})

// update gig 
router.put('/:id', (req, res) => {
    return new Gig().where('id', req.params.id).fetch().then((gig) => {
        if (gig)
            Object.keys(req.body).map((key, value) => {
                gig.set(key, req.body[key])
            })
            return gig.save()
    }).then((gig) => {
        res.status(200).send(`successully updated ${gig.title}`)
    }).catch((err) => {
        res.status(500).send(`err: ${err}`)
    })
})

// delete gig 
router.delete('/:id', (req, res) => {
    return new Gig().where('id', req.params.id).fetch().then((gig) => {
        if (gig)
            gig.destroy().then((gig) => {
                res.status(200).send(`successfully deleted gig: ${gig.title}`)
            }).catch((err) => {
                res.status(500).send(`err: ${err}`)
            })
    })
})

module.exports = router