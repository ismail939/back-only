const express = require('express')

const app = express()
const clientRouter = require('./routes/client')



app.use(express.json())
app.use('/', clientRouter)
const db = require('./config/database')

db.authenticate()
.then(()=>{
    console.log('connection established')
}).catch((err)=>{
    console.log('connection failed', err) 
})
app.get('/', (req, res)=>{
    res.send('Hello there!')
})

app.all('*',(req, res)=>{
    res.status(404).json({error: 'the file requested doesn\'t exist '})
})
app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})