const authRouter = require("express").Router()

authRouter.get("/", (req, res) => {
    res.status(200).json({error:false, message:"available endpoints /register, /login"})
})

authRouter.post("/register", (req, res) => {
    res.status(201).json({error:false, message:"post register"})
})

authRouter.post("/login", (req, res) => {
    res.status(201).json({error:false, message:"post login"})
})


module.exports = authRouter