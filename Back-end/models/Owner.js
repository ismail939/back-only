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
            allowNUll: true
        },
        imgName: {
            type: type.TEXT,
            allowNUll: true,
            defaultValue: "https://graduation-project-cw-spaces.onrender.com/images/default.png"
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