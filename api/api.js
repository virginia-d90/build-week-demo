const apiRouter = require("express").Router()
const authRouter = require("./auth/auth-router")
const recipesRouter = require("./recipes/recipes-router")


apiRouter.use("/recipes", recipesRouter)
apiRouter.use("/auth", authRouter)


apiRouter.get("/", (req, res) => {
    res.status(200).json({message: "available endpoints, recipes, auth", error: false})
})




module.exports = apiRouter