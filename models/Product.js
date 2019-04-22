const bookshelf = require('../database/db')

const Product = bookshelf.Model.extend({
    tableName: 'products'
})

module.exports = Product