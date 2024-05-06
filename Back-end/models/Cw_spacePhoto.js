module.exports = (db, type) => {
    return db.define("cw_space_photos", {
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
    })
} 