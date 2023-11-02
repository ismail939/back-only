const Sequelize = require('sequelize')
const db = require('../config/database')

const BookModel = require('./Book')
const ClientModel = require("./Client")
const Cw_spaceModel = require("./Cw_space")
const Cw_spacePhoneModel = require("./Cw_spacePhone");
const EventModel = require("./Event")
const EventPhotoModel = require("./EventPhoto");
const OfferModel = require("./Offer");
const OwnerModel = require("./Owner") 
const ReviewModel = require("./Review")
const RoomModel = require("./Room")
const SubscribeModel = require("./Subscribe")



// create model
const Book = BookModel(db, Sequelize)
const Client = ClientModel(db, Sequelize)
const Cw_space = Cw_spaceModel(db, Sequelize)
const Cw_spacePhone = Cw_spacePhoneModel(db, Sequelize)
const Event = EventModel(db, Sequelize)
const EventPhoto = EventPhotoModel(db, Sequelize)
const Offer = OfferModel(db, Sequelize);
const Owner = OwnerModel(db, Sequelize)
const Review = ReviewModel(db, Sequelize)
const Room = RoomModel(db, Sequelize)
const Subscribe = SubscribeModel(db, Sequelize)


// relationship
// owner & cw-space (1 -> 1)
Owner.belongsTo(Cw_space)
Cw_space.belongsTo(Owner)

// client & room (1 -> many) through book
Client.belongsToMany(Room, { through: Book, as : "client1" })
Room.belongsToMany(Client, { through: Book, as: "room" });

// client & cw-space (many -> many) through review
Client.belongsToMany(Cw_space, { through: Review, as: "client2" });
Cw_space.belongsToMany(Client, { through: Review, as: "cwSpace1" });

// client & cw-space (many -> many) through subscribe
Client.belongsToMany(Cw_space, { through: Subscribe, as: "client3" });
Cw_space.belongsToMany(Client, { through: Subscribe, as : "cwSpace2" });

// cw-space & room (1 -> many)
Cw_space.hasMany(Room)
Room.belongsTo(Cw_space)

// cw-space & cw-space phones (1-> many)
Cw_space.hasMany(Cw_spacePhone)
Cw_spacePhone.belongsTo(Cw_space)

// cw-space & event (1 -> many)
Cw_space.hasMany(Event)
Event.belongsTo(Cw_space)

// cw-space & offer (1 -> many)
Cw_space.hasMany(Offer)
Offer.belongsTo(Cw_space)

// event & event photos (1-> many)
Event.hasMany(EventPhoto)
EventPhoto.belongsTo(Event)



/// generate tables
db.sync({force: false}).then(()=>{
    console.log('Tables created')
})

module.exports = {
    Book,
    Client,
    Cw_space,
    Cw_spacePhone,
    Event,
    EventPhoto,
    Owner,
    Review,
    Room,
    Subscribe,
}