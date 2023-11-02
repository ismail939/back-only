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
            allowNull: true
        }
    },{
        timestamps: false 
    })
}