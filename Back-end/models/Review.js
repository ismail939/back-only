module.exports = (db, type) => {
    return db.define('review', {
        totalRate: {
            type: type.INTEGER,
            allowNull: false
        },
        body: {
            type: type.TEXT,
            allowNull: false
        }
    },{
        timestamps: true 
    })
}