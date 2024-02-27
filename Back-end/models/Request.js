module.exports = (db, type)=>{
    return db.define('request',{
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