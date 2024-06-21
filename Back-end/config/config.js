require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: 3306,
        dialect: process.env.DIALECT,
        logging: false
    },
    production: {
        username: 'sql7715262',  
        password: 'cvFwSqEIEI',
        database: 'sql7715262',
        dialect: process.env.DIALECT, 
        logging: false,
        host: 'sql7.freemysqlhosting.net'
    }
}