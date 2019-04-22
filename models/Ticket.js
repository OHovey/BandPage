const bookshelf = require('../database/db')

const Ticket = bookshelf.Model.extend({
    tableName: 'tickets'
})

module.exports = Ticket 