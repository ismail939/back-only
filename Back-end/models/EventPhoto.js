module.exports = (db, type) => {
    return db.define("event_photos", {
        img: {
            type: type.TEXT,
            allowNull: false
        },
        imgName: {
            type: type.TEXT,
            allowNull: false
        }
    },{
        timestamps: false 
    });
};
