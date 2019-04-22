const express = require('express')
const router = express.Router()
const uuidv1 = require('uuid/v1')

const Basket = require('../../models/Basket')
// const session = require('../../models/Session')

//get all in basket 
router.get('/:session_id', (req, res) => {

    return new Basket().where('session_id', req.params.session_id).fetchAll().then( (basket) => {

        // if (basket == null || undefined) res.status(200).send('empty basket')

        res.json({ basket: basket.serialize() })

    })
})

// return all baskets
router.get('/', (req, res) => {
    return new Basket().fetchAll().then( basket => {
        res.json({ baskets: basket })
    })
})

// create new item in basket 
router.post('/', (req, res) => {

    try {
    
        return new Basket({
            product_id: req.body.product_id,
            session_id: req.body.session_id
        }).save().then((basket) => {
            res.status(200).json({
                basket: basket
            })  
        })
    } catch(err) {
        console.log(err)
        console.log('hi')
    }

    // check if session exists
})

// delete basket item 
router.delete('/', (req, res) => {
    
    // check id session exists 
    if (!req.session.user) 
        res.send('session expired')

    return new Basket().where({ 
        'session_id': req.session.user,
        'product_id':req.body.product_id
    }).then(basket => {
        basket.destroy().then( () => {
            res.send(`basket item deleted`)
        })
    }).catch(err => {
        res.status(500).send(`err: ${err}`)
    })
})

module.exports = router
