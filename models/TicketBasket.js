const bookshelf = require('../database/db')

const TicketBasket = bookshelf.Model.extend({
    tableName: 'TicketBasket'
})

module.exports = TicketBasket 