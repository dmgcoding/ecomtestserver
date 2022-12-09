const express = require('express')
const router = express.Router()
const con = require('./../db/mysql')
const userAccessMiddleware = require('./../auth/middlewares/userAccess')
const Response = require('./../models/apiResModel')
const {validateProduct} = require('./../auth/middlewares/validates')

router.get('/products',userAccessMiddleware,async(req,res)=>{
    const user = req.user
    const sql = 'SELECT productId,productName,productStock,productPrice FROM products WHERE active = 1 AND createdUserId = ' + con.escape(user.userId)
    con.query(sql, (err,results)=>{
        if(err){
            res.status(500).send(Response('error occured',true,500,{e:err.message}))
            throw err
        }else {
            res.status(200).send(Response('products fetched',false,200,{products:results}))
        }
    })
})

router.post('/product',userAccessMiddleware,validateProduct,async(req,res)=>{
    const sql = 'INSERT INTO products(productName,productStock,productPrice,createdUserId) VALUES ?'
    const values = [[req.body.name,req.body.stock,req.body.price,req.user.userId]]
    con.query(sql,[values], (err,results)=>{
        if(err){
            res.status(500).send(Response('error occured',true,500,{e:err.message}))
            throw err
        }else if(results.affectedRows === 1){
            res.status(200).send(Response('product added',false,200,{}))
        }else{
            res.status(500).send(Response('product not added',true,500,{}))
        }
    })
    
})

router.post('/product/delete/:id',userAccessMiddleware,(req,res)=>{
    const id = req.params.id
    const sql = 'UPDATE products SET active = 0 WHERE productId = ' + con.escape(id)
    con.query(sql,(err,results)=>{
        if(err){
            res.status(500).send(Response('error occured',true,500,{e:err.message}))
            throw err
        }else if(results.affectedRows === 1){
            res.status(200).send(Response('product deleted',false,200,{}))
        }else{
            res.status(500).send(Response('product not deleted',true,500,{}))
        }
    })
})

module.exports = router
