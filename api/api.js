const apiRouter = require("express").Router()

apiRouter.get("/", (req, res) => {
    res.status(200).json({message: "available endpoints, recipes, auth", error: false})
})



module.exports = apiRouter