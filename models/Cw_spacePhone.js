module.exports = (db, type) => {
    return db.define("cw_space_phones", {
        phone: {
            type: type.STRING
        },
        cwID: {
            type: type.INTEGER,
            primaryKey: true
        },
        phoneID: {
            type: type.INTEGER,
            primaryKey: true
        }
    })
}