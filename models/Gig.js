const bookshelf = require('../database/db')

const Gig = bookshelf.Model.extend({
    tableName: 'gigs'
})

module.exports = Gig