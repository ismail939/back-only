module.exports = (db, type)=>{
    return db.define("events", {
        eventID: {
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
            allowNull: false,
        },
        capacity: {
            type: type.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        maxCapacity: {
            type: type.INTEGER,
            allowNull: false,
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        home: {
            type: type.STRING,
            allowNull: true
        }
    },{
        timestamps: false 
    })
}