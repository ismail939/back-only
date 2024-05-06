module.exports = (db, type) => {
    return db.define("moderators", {
        moderatorID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.TEXT,
            allowNull: false
        },
        img: {
            type: type.TEXT,
            allowNUll: true
        },
        imgName: {
            type: type.TEXT,
            allowNUll: true,
            defaultValue: "http://localhost:4000/images/default.png"
        },
        role: {
            type: type.STRING,
            defaultValue: 'moderator',
            readOnly: true
        }
    },{
        timestamps: false 
    })
}