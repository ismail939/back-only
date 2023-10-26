const Sequelize = require('sequelize')
const db = require('../config/database')

const BookModel = require('./Book')
const ClientModel = require("./Client")
const CwspaceModel = require("./Cwspace")
const CwspacePhoneModel = require("./CwspacePhone");
const EventModel = require("./Event")
const EventPhotoModel = require("./EventPhoto");
const OwnerModel = require("./Owner")
const ReviewModel = require("./Client")
const RoomModel = require("./Room")
const SubscribeModel = require("./Client")



// create model
const Book = BookModel(db, Sequelize)
const Client = ClientModel(db, Sequelize)
const Cwspace = CwspaceModel(db, Sequelize)
const CwspacePhone = CwspacePhoneModel(db, Sequelize)
const Event = EventModel(db, Sequelize)
const EventPhoto = EventPhotoModel(db, Sequelize)
const Owner = OwnerModel(db, Sequelize)
const Review = ReviewModel(db, Sequelize)
const Room = RoomModel(db, Sequelize)
const Subscribe = SubscribeModel(db, Sequelize)



/// generate tables
db.sync({force: false}).then(()=>{
    console.log('Tables created')
})

module.exports = {
    Client
}