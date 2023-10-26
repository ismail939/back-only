module.exports = (db, type)=>{
    return db.define('cwspaces', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        address: {
            type: type.TEXT
        },
        fbPage: {
            type: type.TEXT
        },
        openingTime: {
            type: type.TIME
        },
        closingTime: {
            type: type.TIME
        },
        description: {
            type: type.TEXT
        },
        rate: {
            type: type.FLOAT
        },
        oID: {
            type: type.INTEGER
            // foriegn key
        }
    })
}