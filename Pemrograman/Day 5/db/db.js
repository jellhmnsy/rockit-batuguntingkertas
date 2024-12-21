const { Pool } = require("pg");

//Create a connection pool
    // const pool= new Pool({
    //     user: "postgres",
    //     host: "localhost",
    //     database: "odp-bsi",
    //     password: "123",
    //     port: 5432
    // })
    const pool= new Pool({
        user: "postgres",
        host: "localhost",
        database: "walled-db",
        password: "123",
        port: 5432
    })

module.exports = pool;