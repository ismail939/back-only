module.exports = (db, type)=>{
    return db.define('events', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            
        },
        description: {
            type: type.TEXT
        },
        start: {
            type: type.DATE
        },
        end: {
            type: type.DATE
        },
        price: {
            type: type.FLOAT
        },
        capacity: {
            type: type.INTEGER
        },
        maxCapacity: {
            type: type.INTEGER
        },
        cwID: {

        }
    })
}