module.exports = (db, type)=>{
    return db.define('book',{
        start: {
            type: type.DATE,
            allowNull: false
        },
        end: {
            type: type.DATE,
            allowNull: false
        },
        payment: {  
            type: type.STRING,
            defaultValue: 'cash',
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
        timestamps: true 
    })
}