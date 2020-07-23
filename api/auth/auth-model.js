const db = require("../../data/db");

const findById = (id) => {
    return db("users").where({id}).first().select("*")
}


const findBy = (obj) =>{
    return db("users").where(obj).first()
}

const userList = () => {
    db("users").select("username")
}

const addUser = async (user) => {
    const [id] = await db("users").insert(user).returning("id")
    return findById(id)
}

module.exports = {
    findById,
    userList,
    addUser,
    findBy
}