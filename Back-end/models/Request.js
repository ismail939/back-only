module.exports = (db, type)=>{
    return db.define('request',{
        status: {
            type: type.STRING,
            defaultValue: "pending",
            allowNull: false
        }
    },{
        timestamps: true 
    })
}