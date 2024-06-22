module.exports = (db, type)=>{
    return db.define('request', {
        requestID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: type.STRING,
            defaultValue: "pending",
            allowNull: false
        },
        numberOfPersons: {
            type: type.INTEGER,
            allowNull: false
        }
    },{
        timestamps: true 
    })
}