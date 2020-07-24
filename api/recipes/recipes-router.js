const recipesRouter = require("express").Router()
const Users = require("../auth/auth-model")
const Recipes = require("./recipes-model")

recipesRouter.get("/:users", checkUser, (req, res) => {
    // console.log("recipes get")
    // res.status(200).json({error:false, message:"available endpoints /"})
    Recipes.findRecipesByUser(req.body.users)
        .then(list => {
            res.status(200).json({error:false, message:"recipe list get successful", data: list})
        })
        
})

recipesRouter.post("/", checkTitle, checkUser, (req, res) => {
    // res.status(201).json({error:false, message:"post recipes"})
    Recipes.addRecipe(req.body)
        .then( recipe => {
            res.status(201).json({error: false, message: "recipe added successfully", data: recipe})
        })
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


//middleware

function checkUser(req, res, next){
    if(req.params.users){
        req.body.users = parseInt(req.params.users)
    }
    if(req.body.users){
        Users.findById(req.body.users)
            .then(users => {
                console.log(users)
                if(users){
                    
                    next()
                }else{
                    res.status(400).json({error: true, message: "could not find user"})
                }
                
            })
            .catch(err => {
                res.status(400).json({error: true, message: "database error in checkUser middleware", err})
            })
    } else {
        res.status(400).json({error: true, message: "missing users key in request"})
    }
}

function checkTitle(req, res, next){
    if(req.body.title){
        next()
    } else {
        res.status(400).json({error: true, message: "missing title key in request"})
    }
}
module.exports = recipesRouter