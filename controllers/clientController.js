
const {Client} = require('../models/modelIndex')


module.exports ={
    get: async (req, res, next)=>{
        const clients = await Client.findAll()
        return res.json(clients) 
    }
    ,
    getOne: async (req, res, next)=>{
        const client = await Client.findAll({
            where: {
                username: req.params.username
            }
        })
        return res.json(client) 
    },
    create: async (req, res, next)=>{
        const newClient=await Client.create(req.body)
        return res.json(newClient)
    },
    update: async (req, res, next)=>{
        await Client.update(req.body, {
            where: {
                username: req.params.username
            }
        })
        const ourClient=await Client.findAll({ // don't touch
            where: {
                username: req.params.username
            }
        })
        return res.json(ourClient)
    }
    ,  
    delete: async (req, res, next)=>{
        await Client.destroy({
            where: {
                username: req.params.username
            }
        })
        return res.json({message: 'deleted successfully'})
    }
} 