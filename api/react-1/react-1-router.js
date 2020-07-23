const reactOneRouter = require("express").Router()

reactOneRouter.get("/", (req, res) => {
    const recipes = [{
        title: "Moms stew",
        source: "Mom",
        ingredients: "1 can dinty more",
        instructions: "open can, heat"
    },{
        title: "Soylent Green",
        source: "Big Brother",
        ingredients: "people(multiple)",
        instructions: "eat directly from pouch"
    }]
    res.status(200).json({error:false, message:"unauthenticated get successful", data:recipes})
})


module.exports = reactOneRouter