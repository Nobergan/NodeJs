db.createUser( // Initialize the creation of a new database user
    {
        user: 'user', // Username to be used for connecting to the database
        pwd: 'user', // Password for the specified user
        roles: [ // Array of roles and permissions assigned to the user
            {
                role: 'readWrite', // Permission level: allows both reading and writing data
                db: 'nodejs-express-db' // Name of the specific database this user has access to
            }
        ]
    }
)