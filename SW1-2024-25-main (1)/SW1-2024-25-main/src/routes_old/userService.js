//fichero para programar métodos referentes a la creacion y obtencion de datos de la base de datos

const db = require("./Connection");

//metodos de ejemplo para ver si fufa la base de datos
async function createUser(userData) {
    const users = db.getCollection("users");
    const result = await users.insertOne(userData);
    console.log("Usuario creado con ID:", result.insertedId);
    return result.insertedId;
}

async function findUserByUsername(username) {
    const users = db.getCollection("users");
    console.log("Buscando... :");
    // const cursor = users.find(); // Obtiene el cursor
    // await cursor.forEach(user => console.log(user)); // Itera y muestra cada usuario

    const user = await users.findOne({ "username": username });
    return user;
}

async function getUserByID(userID) {
    const users = db.getCollection("users");
    const user = await users.findOne({ _id: new ObjectId(userID) });
    return user;
}

async function updateUserByID(userID, updatedData) {
    const users = db.getCollection("users");
    const result = await users.updateOne(
        { _id: new ObjectId(userID) },
        { $set: updatedData }
    );
    return result.modifiedCount > 0; //Devuelve true si se actualizó algo
}

module.exports = { createUser, findUserByUsername, getUserByID, updateUserByID };
