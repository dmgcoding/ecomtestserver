if(process.env.NODE_ENV !== 'production') require('dotenv/config')
const express = require('express')
const login = require('./auth/login')
const con = require('./db/mysql')
const {validateLoginUser} = require('./auth/middlewares/validates')
const tokenParse = require('./auth/middlewares/tokenParse')

//routes
const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')

const app = express()

//initialize db
const initDb = ()=>{
    const q1 = 'CREATE DATABASE IF NOT EXISTS ecomdb'
    con.query(q1)
    const q2 = 'CREATE TABLE IF NOT EXISTS users(userId INT AUTO_INCREMENT,name VARCHAR(100),email VARCHAR(50),pwdHash VARCHAR(255),userLevel INT, userActive BOOLEAN DEFAULT true, PRIMARY KEY (userId))'
    con.query(q2)
    const q3 = 'CREATE TABLE IF NOT EXISTS products(productId INT AUTO_INCREMENT, productName VARCHAR(255), productStock INT, productPrice INT, createdUserId INT,active BOOLEAN DEFAULT true, FOREIGN KEY(createdUserId) REFERENCES users(userId) ,PRIMARY KEY (productId))'
    con.query(q3)
}

initDb()

//middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(tokenParse)

//paths
app.use('/admin/', adminRoute)
app.use('/user/', userRoute)
app.post('/login',validateLoginUser, login)


//listen
app.listen(3000)