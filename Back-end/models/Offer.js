module.exports = (db, type)=>{
    return db.define("offers", {
        offerID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
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
        }
    },{
        timestamps: false 
    })
}