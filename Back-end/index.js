const express = require('express')
const httpStatusCode = require("./utils/httpStatusText");
const {checkReminders} = require("./utils/reminders")
const cors = require("cors");
const app = express()
app.use(express.json())
require("dotenv").config();

const bookRouter = require("./routes/book");
const clientRouter = require('./routes/client')
const cw_spaceRouter = require("./routes/cw_space");
const cw_spacePhotoRouter = require('./routes/cw_spacePhoto');
const eventRouter = require("./routes/event");
const ownerRouter = require("./routes/owner");
const roomRouter = require("./routes/room");
const requestRouter = require("./routes/request");
const reviewRouter = require("./routes/review");
const offerRouter = require('./routes/offer')
const moderatorRouter = require("./routes/moderator");
const favouriteRouter = require("./routes/favourite")

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors()) //to handle the request comes from other ports
app.use("/books", bookRouter);
app.use("/cw_spaces", cw_spaceRouter);
app.use("/cw_spacePhotos", cw_spacePhotoRouter);
app.use("/events", eventRouter);
app.use("/clients", clientRouter);
app.use("/owners", ownerRouter);
app.use("/rooms", roomRouter);
app.use("/requests", requestRouter);
app.use("/reviews", reviewRouter);
app.use('/offers', offerRouter);
app.use("/moderators", moderatorRouter);
app.use("/favourites", favouriteRouter);


const db = require('./config/database');

db.authenticate()
.then(()=>{
    console.log('connection established')
}).catch((err)=>{
    console.log('connection failed', err) 
})

setInterval(checkReminders, 40000)

app.all("*", (req, res) => {
    return res.status(404).json({ status: httpStatusCode.ERROR, message: "this resource not found" })
})

//global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode||500).json({ status: error.statusText || httpStatusCode.FAIL, message: error.message });
})

app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})