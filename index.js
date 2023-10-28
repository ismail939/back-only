const express = require('express')
const httpStatusCode = require("./utils/httpStatusText");
const cors = require("cors");

const app = express()
app.use(express.json())

const bookRouter = require("./routes/book");
const clientRouter = require('./routes/client')
const cw_spaceRouter = require('./routes/cw_space')
const cw_spacePhoneRouter = require("./routes/cw_spacePhone");
const eventRouter = require("./routes/event")
const subscribeRouter = require("./routes/subscribe");




app.use(cors()) //to handle the request comes from other ports
app.use("/book", bookRouter);
app.use("/clients", clientRouter);
app.use("/cw_spaces", cw_spaceRouter);
app.use("/cw_spacePhone", cw_spacePhoneRouter);
app.use("/events", eventRouter);
app.use("/subscribe", subscribeRouter);

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