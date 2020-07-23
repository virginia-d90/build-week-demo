const recipesRouter = require("express").Router()

recipesRouter.get("/", (req, res) => {
    console.log("recipes get")
    res.status(200).json({error:false, message:"available endpoints /"})
})

recipesRouter.post("/", (req, res) => {
    res.status(201).json({error:false, message:"post recipes"})
})

recipesRouter.put("/:id", (req, res) => {
    res.status(201).json({error:false, message:"put recipes"})
})

recipesRouter.put("/", (req, res) => {
    res.status(400).json({error:true, message:"must specify recipe to edit"})
})

recipesRouter.delete("/:id", (req, res) => {
    res.status(201).json({error:false, message:"delete recipes"})
})

recipesRouter.delete("/", (req, res) => {
    res.status(400).json({error:true, message:"must specify recipe to delete"})
})


module.exports = recipesRouter