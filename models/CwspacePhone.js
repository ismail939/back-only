module.exports = (db, type) => {
    return db.define("cwspace_phones", {
        phone: {
            type: type.INTEGER
        },
        cwID: {
            type: type.INTEGER
        },
    });
};
