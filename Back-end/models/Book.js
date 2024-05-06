module.exports = (db, type) => {
    return db.define('book', {
        bookID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        start: {
            type: type.DATE,
            allowNull: false
        },
        end: {
            type: type.DATE,
            allowNull: false
        },
        payment: {
            type: type.STRING,
            defaultValue: 'cash',
            allowNull: false
        },
        totalCost: {
            type: type.FLOAT,
            allowNull: false
        },
        status: {
            type: type.STRING,
            allowNull: false,
            defaultValue: 'unpaid',
        }
    }, {
        timestamps: true
    })
}