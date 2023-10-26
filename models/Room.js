module.exports = (db, type) => {
    return db.define("rooms", {
        type: {
            type: type.STRING,
            allowNUll: false
        },
        hourPrice: {
            type: type.FLOAT,
            allowNull: false
        },
        dayPrice: {
            type: type.FLOAT,
            allowNull: false
        },
        minRoomSize: {
            type: type.INTEGER,
            allowNull: false
        },
        maxRoomSize: {
            type: type.INTEGER,
            allowNull: false
        },
        ID: {
            type: type.INTEGER,
            allowNull: false
        },
        number: {
            type: type.INTEGER,
            allowNull: false
        },
        cwID: {
            type: type.INTEGER,
            allowNull: false
        }
    });
};
