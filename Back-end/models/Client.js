module.exports = (db, type) => {
    return db.define('clients', {
        clientID: {
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
            allowNull: false
        },
        email: {
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
        phone: {
            type: type.TEXT,
            allowNull: false
        },
        role: {
            type: type.STRING,
            defaultValue: 'client',
            readOnly: true
        }
    }, {
        timestamps: false
    })
}