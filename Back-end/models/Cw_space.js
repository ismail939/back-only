module.exports = (db, type)=>{
    return db.define('cw_spaces', {
        cwID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: true
        },
        address: {
            type: type.TEXT,
            allowNull: false
        },
        fbPage: {
            type: type.TEXT,
            allowNull: true
        },
        phone: {
            type: type.STRING,
            allowNull: false
        },
        openingTime: {
            type: type.TIME,
            allowNull: false
        },
        closingTime: {
            type: type.TIME,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        rate: {
            type: type.FLOAT,
            defaultValue: 0,
            allowNull: true
        },
        noOfReviews: {
            type: type.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        mainPhoto: {
            type: type.TEXT,
            allowNull: true
        },
        home: {
            type: type.STRING,
            allowNull: true
        },
        discoverType: {
            type: type.STRING,
            allowNull: true
        }
    },{
        timestamps: false 
    })
}