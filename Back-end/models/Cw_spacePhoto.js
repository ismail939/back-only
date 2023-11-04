module.exports = (db, type) => {
    return db.define("cw_space_photos", {
        photo: {
            type: type.STRING,
            allowNull: false
        }
    },{
        timestamps: false 
    })
} 