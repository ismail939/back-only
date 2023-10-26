module.exports = (db, type) => {
    return db.define("subscribe", {
        start: {
            type: type.DATEONLY,
            allowNull: false
        },
        end: {
            type: type.DATEONLY,
            allowNull: false
        },
        type: {
            type: type.STRING,
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
