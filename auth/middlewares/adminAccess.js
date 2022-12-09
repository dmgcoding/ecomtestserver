const Response = require('./../../models/apiResModel')

module.exports = (req,res,next)=>{
    if(req.user !== null){
        if(req.user.userLevel>3){
            next()
        }else{
            res.status(400).send(Response("permission not granted",true,400,{}))
        }
    }else{
        res.status(400).send(Response("permission not granted",true,400,{}))
    }
}