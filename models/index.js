const Sequelize = require('sequelize')
const db = require('../config/database')

//const BookModel = require('./Book')
const ClientModel = require("./Client")
const CwspaceModel = require("./Cwspace")
const CwspacePhoneModel = require("./CwspacePhone");
const EventModel = require("./Event")
const EventPhotoModel = require("./EventPhoto");
const OwnerModel = require("./Owner")
//const ReviewModel = require("./Client")
const RoomModel = require("./Room")
//const SubscribeModel = require("./Client")



// create model
const Client = ClientModel(db, Sequelize)


/// generate tables
db.sync({force: false}).then(()=>{
    console.log('Tables created')
})

module.exports = {
    Client
}