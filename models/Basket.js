const bookshelf = require('../database/db')

const Basket = bookshelf.Model.extend({
    tableName: 'basket'
})

module.exports = Basket