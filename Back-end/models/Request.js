module.exports = (db, type)=>{
    return db.define('request',{
        currentTime: {
            type: type.DATE,
            allowNull: false
        },
        roomType: {
            type: type.STRING,
            allowNull: false
        },
        payment: { 
            type: type.STRING,
            defaultValue: "cash",
            allowNull: false
        },
        status: {
            type: type.STRING,
            defaultValue: "pending",
            allowNull: false
        }
    },{
        timestamps: false 
    })
}