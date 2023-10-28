const express = require('express')
const httpStatusCode = require("./utils/httpStatusText");
const cors = require("cors");

const app = express()
app.use(express.json())

const clientRouter = require('./routes/client')
const ownerRouter = require('./routes/owner')
const roomRouter = require('./routes/room')
const reviewRouter = require('./routes/review')
const eventPhotoRouter = require('./routes/eventphoto')



app.use(cors()) //to handle the request comes from other ports
app.use('/clients', clientRouter)
app.use('/owners', ownerRouter)
app.use('/rooms', roomRouter)
app.use('/reviews', reviewRouter)
app.use('/eventphotos', eventPhotoRouter)

const db = require('./config/database')

db.authenticate()
.then(()=>{
    console.log('connection established')
}).catch((err)=>{
    console.log('connection failed', err) 
})
//app.get('/', (req, res)=>{
//    res.send('Hello there!')
//})


app.all("*", (req, res) => {
    return res.status(404).json({ status: httpStatusCode.ERROR, message: "this resource not found" })
})

//global error handler
app.use((error, req, res, next) => { 
    res.status(error.statusCode || 500).json({ status: error.statusText, message: error.message });
})

app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})