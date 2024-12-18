const { MongoClient, ObjectId } = require('mongodb');
const initializeDatabase = require('./init');
const bcrypt = require('bcrypt');

class Database {
    static instance = null;

    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        this.client = new MongoClient("mongodb://127.0.0.1:27017");
        this.db = null;
        this.connect();
        console.log("Database instance created");
        Database.instance = this;
    }

    async connect(databaseName = "StudyHub") {
        if (this.db) return this.db;
        try {
            const adminDb = this.client.db().admin();
            const databases = await adminDb.listDatabases();
            const dbExists = databases.databases.some(db => db.name === databaseName);

            if (!dbExists) {
                console.log(`Base de datos "${databaseName}" no encontrada. Inicializando...`);
                await initializeDatabase(this.client, databaseName);
            }

            this.db = this.client.db(databaseName);
            console.log(`Conectado a la base de datos: ${databaseName}`);
            return this.db;
        } catch (error) {
            console.error("Error conectando a la base de datos:", error);
            throw error;
        }
    }

    getCollection(collectionName) {
        if (!this.db) throw new Error("No conectado a la base de datos. Llama a `connect` primero.");
        return this.db.collection(collectionName);
    }

    async close() {
        if (this.db) {
            await this.client.close();
            this.db = null;
            console.log("Conexión cerrada.");
        }
    }

    async getAllUsers() {
        return await this.getCollection("User").find().toArray(); // Fetches all users
      }         

    async getUserById(userId) {
        let user = null;
        try {
            // Validar si el ID es válido
            if (!ObjectId.isValid(userId)) {
                console.error("Invalid userId format");
                return null;
            }
    
            // Convertir el ID a ObjectId
            const objectId = new ObjectId(userId);
    
            // Hacer la consulta
            user = await this.getCollection("User").findOne({ "_id": objectId });
            
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
        return user;
    }

    async getUserByEmail(email) {
        return await this.getCollection("User").findOne({ "email": email });
    }

    async getPasswordByUsername(username) {
        const user = await this.getCollection("User").findOne({ username });
        return user ? user.password : null;
    }

    async getChatById(chatId) {
        return await this.getCollection("Chat").findOne({ id: chatId });
    }

    async getMessagesByChatId(id) {
        return await this.getCollection('Message').find({
            chatId: id
        }).toArray();
    }

    async insertUser(userData) {
        return await this.getCollection("User").insertOne(userData);
    }

    async insertMessage(messageData) {
        return await this.getCollection("Message").insertOne(messageData);
    }

    async insertChat(chatData) {
        return await this.getCollection("Chat").insertOne(chatData);
    }

    async getRecentAlerts(limit, skip = 0) {
        var alertas = await this.getCollection('Alert')
            .find()
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
        for (const alerta of alertas) {
            const user = await this.getUserById(alerta.userId);
            alerta.username = user ? user.username : 'Unknown';
        }
        return alertas;
    }

    async getUsers(skip = 0, limit = 10) {
        try {
            const usersCollection = this.getCollection('User');
            const alertsCollection = this.getCollection('Alert');
    
            // Obtiene los usuarios con skip y limit
            const users = await usersCollection
                .find({}, { projection: { username: 1, email: 1 } })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .toArray();
    
            // Añade el número de alertas a cada usuario
            for (const user of users) {
                const alertCount = await alertsCollection.countDocuments({ userId: user._id });
                user.alerts = alertCount; // Añade el campo "alerts" al objeto usuario
            }
    
            return users;
        } catch (error) {
            console.error('Error fetching users with alerts:', error);
            throw error;
        }
    }

    async getReportedUsers(skip = 0, limit = 10) {
        try {
            const usersCollection = this.getCollection('User');
    
            // Obtiene los usuarios con isBanned = true
            const reportedUsers = await usersCollection
                .find({ isBanned: true }, { projection: { username: 1, email: 1 } })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .toArray();
    
            return reportedUsers;
        } catch (error) {
            console.error('Error fetching reported users:', error);
            throw error;
        }
    }

    async updateUser(userId, updates) {
        try {
            const userCollection = this.getCollection("User");
            const objectId = new ObjectId(userId);
            const result = await userCollection.updateOne(
                { _id: objectId },
                { $set: updates }
            );
            
            if (result.matchedCount === 0) {
                throw new Error('Usuario no encontrado');
            }
            if (result.modifiedCount === 0) {
                console.warn('No se realizaron cambios en el usuario');
            }
    
            return true; // Actualización exitosa
        } catch (error) {
            console.error('Error en updateUser:', error);
            throw error; // Re-lanzar el error para manejarlo donde se invoque
        }
    }

    async updatePassword(email, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const userCollection = this.getCollection("User");
            const result = await userCollection.updateOne(
                { email },
                { $set: { password: hashedPassword } }
            ); 
            
            if (result.matchedCount === 0) {
                throw new Error('Usuario no encontrado');
            }
            if (result.modifiedCount === 0) {
                console.warn('No se realizaron cambios en el usuario');
            }
    
            return true; // Actualización exitosa
        } catch (error) {
            console.error('Error en updatePassword:', error);
            throw error; // Re-lanzar el error para manejarlo donde se invoque
        }
    }

    
    
}

module.exports = Database;
