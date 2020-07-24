const db = require("../../data/db");


// select users.username, recipes.ingredients from users
// join recipes
// on users.id = recipes.users
const findById = (id) => {
    return db("recipes")
        .where({id})
        .first()
}

const findRecipesByUser = (users) => {
    return db("recipes")
        .where({users})
        
}

const addRecipe = async (obj) => {
    const [ id ] = await db('recipes').insert(obj).returning("id")
    return findById(id)
} 


module.exports = {
    findById,
    addRecipe,
    findRecipesByUser

}