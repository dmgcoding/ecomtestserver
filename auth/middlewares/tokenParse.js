const jwt = require('jsonwebtoken')
const Response = require('./../../models/apiResModel')

module.exports = (req,res,next)=>{
    if(req.header('token')){
        const [b,token] = req.header('token').split(' ')
        if(b !== 'Bearer'){
            res.status(500).send(Response('error parsing token',true,500,{e: e.message}))
        }else{
            try {
                req.user = jwt.decode(token, process.env.SECRET)
                next()
            } catch (e) {
                res.status(500).send(Response('error parsing token',true,500,{e: e.message}))
                console.log('token parse middleware: ', e)
                throw e
            }
        }
    }else{
        next()
    }
}