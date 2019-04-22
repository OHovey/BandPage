const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Europa11flash29kino',
        database: 'bandpage',
    },
    debug: true,
    migrations: {
        tableName: 'migrations'
    }
})

module.exports = knex