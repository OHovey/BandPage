var path = require('path')

let configuration = {
    migrationsDir: path.resolve(__dirname, 'migrations'), // This is the directory that should contain your SQL migrations.
    host: 'localhost', // Database host
    port: 3306, // Database port
    db: 'bandpage', // Database name
    user: 'root', // Database username
    password: 'Europa11flash29kino', // Database password
    adapter: 'mysql', // Database adapter: pg, mysql
    // Parameters are optional. If you provide them then any occurrences of the parameter (i.e. FOO) in the SQL scripts will be replaced by the value (i.e. bar).
    // parameters: {
    //     "FOO": "bar"
    // },
    minMigrationTime: new Date('2018-01-01').getTime() // Optional. Skip migrations before this before this time.
};

require('sql-migrations').run(configuration)
require('sql-migrations').migrate(configuration)
require('sql-migrations').rollback(configuration)