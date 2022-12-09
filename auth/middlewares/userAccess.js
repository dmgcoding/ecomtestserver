const Response = require('./../../models/apiResModel')

module.exports = (req,res,next)=>{
    if(req.user === null ){
        res.status(400).send(Response("permission not granted",true,400,{}))
    }else if(req.user === undefined){
        res.status(400).send(Response("permission not granted",true,400,{}))
    }else{
        next()
    }
}