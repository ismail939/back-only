module.exports = (db, type) => {
    return db.define("cw_space_phones", {
        phone: {
            type: type.STRING,
            allowNull: false
        }
    },{
        timestamps: false 
    })
} 