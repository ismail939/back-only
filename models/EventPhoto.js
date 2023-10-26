module.exports = (db, type) => {
    return db.define("eventPhotos", {
        photo: {
            type: type.TEXT,
            allowNull: false
        },
            eID: {
            type: type.INTEGER
        }
    });
};
