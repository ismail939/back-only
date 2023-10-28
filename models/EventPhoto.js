module.exports = (db, type) => {
    return db.define("event_photos", {
        photo: {
            type: type.TEXT('tiny')
        }
    },{
        timestamps: false 
     });
};
