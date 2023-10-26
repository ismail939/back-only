module.exports = (db, type) => {
    return db.define("cwspacePhones", {
        phone: {
            type: type.INTEGER
        },
        cwID: {
            type: type.INTEGER
        },
    });
};
