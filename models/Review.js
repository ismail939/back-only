module.exports = (db, type) => {
    return db.define('review', {
        rate: {
            type: type.INTEGER,
            allowNull: false
        },
        dateTime: {
            type: type.DATE,
            allowNull: false
        },
        body: {
            type: type.TEXT,
            allowNull: false
        },
        cID: {
            type: type.INTEGER,
            primaryKey: true
        },
        cwID: {
            type: type.INTEGER,
            primaryKey: true
        }
    })
}