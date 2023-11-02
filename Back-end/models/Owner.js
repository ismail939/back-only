module.exports = (db, type)=>{
    return db.define('owners', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fname: {
            type: type.STRING,
            allowNull: false
        },
        lname: {
            type: type.STRING,
            allowNull: false
        },
        username: {
            type: type.STRING,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        profilePic: {
            type: type.TEXT,
            allowNUll: true
        },
        phone: {
            type: type.STRING,
            allowNull: true
        }
    },{
        timestamps: false 
     })
}