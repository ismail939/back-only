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
        amenities: {
            type: type.STRING,
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
            allowNull: false
        },
        noOfReviews: {
            type: type.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        img: {
            type: type.TEXT,
            allowNull: true
        },
        imgName: {
            type: type.TEXT,
            allowNull: false
        },
        home: {
            type: type.STRING,
            allowNull: true
        },
        discoverType: {
            type: type.STRING,
            allowNull: true
        },
        internetQualityRate: {
            type: type.FLOAT,
            defaultValue: 0
        },
        costRate: {
            type: type.FLOAT,
            defaultValue: 0
        },
        atmosphereRate: {
            type: type.FLOAT,
            defaultValue: 0
        },
        staffRate: {
            type: type.FLOAT,
            defaultValue: 0
        },
        privacyRate: {
            type: type.FLOAT,
            defaultValue: 0
        },
        designRate: {
            type: type.FLOAT,
            defaultValue: 0
        },
        lat: {
            type: type.FLOAT,
            allowNull: true
        },
        lng: {
            type: type.FLOAT,
            allowNull: true
        }
    },{
        timestamps: false 
    })
}