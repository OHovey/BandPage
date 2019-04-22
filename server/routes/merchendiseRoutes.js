const express = require('express')
const router = express.Router()

const Product = require('../../models/Product')

// get all products 
router.get('/', (req, res) => {
    return new Product().fetchAll().then((products) => {
       res.json({ products: products.serialize() })
    })
})

// get single product 
router.get('/:product_id', (req, res) => {
    return new Product().where('id', req.params.product_id).fetch().then( product => {
        res.json({ product: product })
    })
})

// create product 
router.post('/', (req, res) => {
    return new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        quntity: req.body.quantity
    }).save().then((product) => {
        res.status(200).send(`successfully created product: ${product}`)
    }).catch((err) => {
        res.status(400).send(`err: ${err}`)
    })
})

// update product
router.put('/:id', (req, res) => {
    return new Product().where('id', req.params.id).fetch().then((product) => {
        if (product)
            Object.keys(req.body).map((key, values) => {
                product.set(key, req.body[key])
            })
            return product.save()
    }).then((product) => {
        res.status(200).send(`successfully updated: ${product.name}`)
    }).catch((err) => {
        res.status(500).send(`err: ${err}`)
    })
})

// delete product 
router.delete('/:id', (req, res) => {
    return new Product().where('id', req.params.id).fetch().then((product) => {
        if (product)
            product.destroy().then((product) => {
                res.status(200).send(`successfully deleted: ${product.name}`)
            }).catch((err) => {
                res.status(500).send(`err: ${err}`)
            })
    })
})

module.exports = router