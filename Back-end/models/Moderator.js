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
        profilePic: {
            type: type.TEXT,
            allowNUll: true
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