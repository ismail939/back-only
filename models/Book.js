module.exports = (db, type)=>{
    return db.define('books',{
        dateTime: {
            type: type.DATE
        },
        start: {
            type: type.DATE
        },
        end: {
            type: type.DATE
        },
        roomType: {
            type: type.STRING
        },
        payment: {
            type: type.STRING
        },
        type: {
            type: type.STRING
        },
        status: {
            type: type.STRING
        },
        cID: {
            type: type.INTEGER
        },
        rID: {
            type: type.INTEGER
        }
    })
}