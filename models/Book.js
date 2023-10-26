module.exports = (db, type)=>{
    return db.define('book',{
        dateTime: {
            type: type.DATE,
            allowNull: false
        },
        start: {
            type: type.DATE,
            allowNull: false
        },
        end: {
            type: type.DATE,
            allowNull: false
        },
        roomType: {
            type: type.STRING,
            allowNull: false
        },
        payment: {
            type: type.STRING,
            allowNull: false
        },
        type: {
            type: type.STRING,
            allowNull: false
        },
        status: {
            type: type.STRING,
            allowNull: false
        },
        cID: {
            type: type.INTEGER,
            primaryKey: true
        },
        rID: {
            type: type.INTEGER,
            primaryKey: true
        }
    })
}