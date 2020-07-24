const apiRouter = require("express").Router()
const authRouter = require("./auth/auth-router")
const recipesRouter = require("./recipes/recipes-router")
const reactOneRouter = require("./react-1/react-1-router")
const authenticate = require("../middleware/authenticate-middleware")


apiRouter.use("/recipes", authenticate, recipesRouter)
apiRouter.use("/auth", authRouter)
apiRouter.use("/react-1", reactOneRouter)


apiRouter.get("/", (req, res) => {
    res.status(200).json({message: "available endpoints, recipes, auth", error: false})
})




module.exports = apiRouter