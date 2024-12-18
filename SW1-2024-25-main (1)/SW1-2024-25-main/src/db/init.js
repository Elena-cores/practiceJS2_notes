const seedDatabase = require('./seed');

async function initializeDatabase(client, databaseName) {
    const collections = ["User", "Notes", "News", "Message", "Chat", "Alert"];
    const db = client.db(databaseName);

    try {
        for (const collection of collections) {
            const existing = await db.listCollections({ name: collection }).toArray();
            if (existing.length === 0) {
                await db.createCollection(collection);
                console.log(`Colección '${collection}' creada.`);
            }
        }

        console.log("Inicialización de la base de datos completa. Insertando datos iniciales...");
        await seedDatabase(db);
    } catch (error) {
        console.error("Error inicializando la base de datos:", error);
        throw error;
    }
}

module.exports = initializeDatabase;