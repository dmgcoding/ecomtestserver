const express = require('express')
const router = express.Router()
const con = require('./../db/mysql')
const bcrypt = require('bcrypt')
const Response = require('./../models/apiResModel')
const {validateAddUser} = require('./../auth/middlewares/validates')
const adminAccessMiddleware = require('./../auth/middlewares/adminAccess')


router.get('/users',adminAccessMiddleware,(req,res)=>{
    const sql = 'SELECT userId,name,email,userLevel FROM users WHERE userLevel <> 4'
    con.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(Response('error occured',true,500,{e: err.message}))
        }else {
            res.status(200).send(Response('users fetched',false,200,{users: result}))
        }
    })
})

router.get('/products',adminAccessMiddleware,(req,res)=>{
    const sql = 'SELECT products.productId,products.productName,products.productStock,products.productPrice,users.name FROM products JOIN users'
    con.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(Response('error occured',true,500,{e: err.message}))
        }else {
            res.status(200).send(Response('products fetched',false,200,{products: result}))
        }
    })
})

router.post('/user',adminAccessMiddleware,validateAddUser,async(req,res)=>{
    //name,email,pwd,userlevel
    const pwdHash = await bcrypt.hash(req.body.pwd,10)
    const sql = 'INSERT INTO users(name,email,pwdHash,userLevel) VALUES ?'
    const values = [[
        req.body.name,
        req.body.email,
        pwdHash,
        1
    ]]
    con.query(sql,[values],(err)=>{
        if(err){
            res.status(500).send(Response('user added',true, 500, {e: err.message}))
            throw err
        }else{
            res.status(200).send(Response('user added',false, 200, {}))
        }
    })
})

router.post('/user/delete/:id',adminAccessMiddleware,(req,res)=>{
    //delete user by id
    if(req.params.id === '' || req.params.id === undefined){
        res.status(400).send(Response('no id passed',true,400,{}))
    }
    const sql = 'DELETE FROM users WHERE userId = ' + con.escape(req.params.id);
    con.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(Response('error occured',true,500,{e: err.message}))
            throw err
        }else if(result.affectedRows === 0){
            res.status(400).send(Response('no user with that id',true, 400, {}))
        }else{
            res.status(200).send(Response('user deleted',false, 200, {}))
        }
    })
})

module.exports = router
