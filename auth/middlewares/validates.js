const Response = require('./../../models/apiResModel')

module.exports.validateAddUser = (req,res,next)=>{
    if(req.body.name === '' || req.body.name === undefined){
        res.status(400).send( Response('name is required',true,400,{}))
    }else if(req.body.email === '' || req.body.email === undefined){
        res.status(400).send( Response('email is required',true,400,{}))
    }else if(req.body.pwd === '' || req.body.pwd === undefined){
        res.status(400).send( Response('password is required',true,400,{}))
    }else{
        next()
    }
}

module.exports.validateLoginUser = (req,res,next)=>{
    if(req.body.email === '' || req.body.email === undefined){
        res.status(400).send( Response('email is required',true,400,{}))
    }else if(req.body.pwd === '' || req.body.pwd === undefined){
        res.status(400).send( Response('password is required',true,400,{}))
    }else{
        next()
    }
}


module.exports.validateProduct = (req,res,next)=>{
    if(req.body.name === '' || req.body.name === undefined){
        res.status(400).send( Response('name is required',true,400,{}))
    }else if(req.body.stock === '' || req.body.stock === undefined){
        res.status(400).send( Response('stock is required',true,400,{}))
    }else if(req.body.price === '' || req.body.price === undefined){
        res.status(400).send( Response('price is required',true,400,{}))
    }else{
        next()
    }
}