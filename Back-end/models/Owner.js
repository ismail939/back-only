module.exports = (db, type)=>{
    return db.define('owners', {
        ownerID: {
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
        img: {
            type: type.TEXT,
            allowNUll: true,
            defaultValue: "https://res.cloudinary.com/duagfqdca/image/upload/v1719042316/default_photo_bi2sce.jpg"
        },
        imgName: {
            type: type.TEXT,
            allowNUll: true
        },
        phone: {
            type: type.STRING,
            allowNull: false
        },
        role: {
            type: type.STRING,
            defaultValue: 'owner',
            readOnly: true
        },
        verified: {
            type: type.BOOLEAN,
            allowNUll: false,
            defaultValue: false
        },
        verificationCode: {
            type: type.STRING,
            allowNUll: true
        }
    },{
        timestamps: false 
    })
}