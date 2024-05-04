module.exports = (db, type)=>{
    return db.define("offers", {
        offerID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
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
        img: {
            type: type.TEXT,
            allowNull: false
        },
        imgName: {
            type: type.TEXT,
            allowNull: false
        },
        home: {
            type: type.STRING,
            allowNull: true
        }
    },{
        timestamps: false 
    })
}