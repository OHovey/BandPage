const bookshelf = require('../database/db')

const TicketHolder = bookshelf.Model.extend({
    tableName: 'ticket_holders'
})

module.exports = TicketHolder