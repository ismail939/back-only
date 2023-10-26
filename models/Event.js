module.exports = (db, type)=>{
    return db.define("events", {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        start: {
            type: type.DATE,
            allowNull: false,
        },
        end: {
            type: type.DATE,
            allowNull: false,
        },
        price: {
            type: type.FLOAT,
            allowNull: true,
        },
        capacity: {
            type: type.INTEGER,
            allowNull: false,
        },
        maxCapacity: {
            type: type.INTEGER,
            allowNull: false,
        },
        description: {
            type: type.TEXT,
            allowNull: false
        }
    })
}