module.exports = (db, type)=>{
    return db.define('book',{
        bookingTime: {
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
        totalCost: {
            type: type.FLOAT,
            allowNull: false
        }
    },{
        timestamps: false 
    })
}