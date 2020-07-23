require("dotenv").config()
const authRouter = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./auth-model")


authRouter.get("/", (req, res) => {
    res.status(200).json({error:false, message:"available endpoints /register, /login"})
})

authRouter.post("/register", checkUsername, checkEmail, checkPassword, (req, res) => {
    // res.status(201).json({error:false, message:"post register"})
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    const credentials = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    Users.addUser(credentials)
        .then(async user => {

            const token = await createToken(user)
        
            res.status(200).json({error:false, message: "user successfully added", token})
        })
        .catch(err => {
            res.status(400).json({error: true, message: "could not register", err})
        })
    


})

authRouter.post("/login", checkUsername, checkPassword, (req, res) => {
    // res.status(201).json({error:false, message:"post login"})
    Users.findBy({username: req.body.username})
        .then(async user => {
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const token = await createToken(user)

                    res.status(200).json({error:false, message: "user successfully logged in", token})
                } else {
                    res.status(400).json({error: true, message: "invalid password"})
                }
            } else {
                res.status(400).json({error: true, message: "invalid username"})
            }
        })
})


function createToken(payload){
    const secret = process.env.SECRET_JWT

    const options = {
        expiresIn: 60 * 60 * 8

    }
    delete payload.password
    return jwt.sign(payload, secret, options)
}

//middleware


function checkUsername(req, res, next){
    if(req.body.username){
        if(req.body.username.length < 3){
         res.status(400).json({error:true, message:"username must be at least 3 characters long"})
        } else {
            req.body.username = req.body.username.toLowerCase()
            next()
        }
    } else {
        res.status(400).json({error: true, message: "missing username key in request"})
    }
}

function checkEmail(req, res, next){
    if(req.body.email){
        if(req.body.email.length < 6){
         res.status(400).json({error:true, message:"email must be at least 6 characters long"})
        } else {
            req.body.email = req.body.email.toLowerCase()
            next()
        }
    } else {
        res.status(400).json({error: true, message: "missing email key in request"})
    }
}

function checkPassword(req, res, next){
    if(req.body.password){
        if(req.body.password.length < 6){
         res.status(400).json({error:true, message:"password must be at least 6 characters long"})
        } else {
           
            next()
        }
    } else {
        res.status(400).json({error: true, message: "missing password key in request"})
    }
}


module.exports = authRouter