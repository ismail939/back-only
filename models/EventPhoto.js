module.exports = (db, type) => {
    return db.define("event_photos", {
        photo: {
            type: type.TEXT('tiny')
        },
        eID: {
        type: type.INTEGER,
        primaryKey: true,
        },
        photoID: {
            type: type.INTEGER,
            primaryKey: true
        }
    });
};
