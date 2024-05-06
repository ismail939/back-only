module.exports = (db, type) => {
    return db.define('register', {
        registerID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        payment: {
            type: type.STRING,
            defaultValue: 'cash',
            allowNull: false
        },
        totalCost: {
            type: type.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: true
    })
}