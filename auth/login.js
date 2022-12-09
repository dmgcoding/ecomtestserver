const con = require('./../db/mysql')
const Response = require('./../models/apiResModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = (req,res)=>{
    const sql = 'SELECT userId,name,email,pwdHash,userLevel FROM users WHERE userActive = 1 AND email = ' + con.escape(req.body.email)
    con.query(sql,async(err,result)=>{
        if(err){
            res.status(500).send(Response('error',true,500,{}))
            throw err
        }else{
            if(result[0] !== undefined && result[0].email === req.body.email){
                if((await bcrypt.compare(req.body.pwd,result[0].pwdHash))){
                    const user = result[0]
                    const tokenData = {
                        userId: user.userId,
                        name: user.name,
                        email: user.email,
                        userLevel: user.userLevel
                    }
                    const token = jwt.sign(tokenData,process.env.SECRET)
                    res.status(200).send(Response('login success',false,200,{
                        userId: user.userId,
                        name: user.name,
                        email: user.email,
                        token: token
                    }))
                }else{
                    res.status(400).send(Response('Password incorrect',true,400,{}))
                }
            }else{
                res.status(400).send(Response('no user with that email',true,400,{}))
            }
        }
    })
}

module.exports = login