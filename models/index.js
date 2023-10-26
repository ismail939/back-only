const Sequelize = require('sequelize')
const db = require('../config/database')
const ClientModel = require('./Client')


// create model
const Client = ClientModel(db, Sequelize)


/// generate tables
db.sync({force: false}).then(()=>{
    console.log('Tables created')
})

module.exports = {
    Client
}