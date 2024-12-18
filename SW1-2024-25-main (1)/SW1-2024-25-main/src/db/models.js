const Models = {
    User: {
        _id: "ObjectId", // Identificador único
        username: "string", // Nombre de usuario visible
        password: "string", // Contraseña encriptada
        email: "string", // Correo electrónico del usuario
        degree: "string", 
        degreeYear: "integer", 
        university: "string", 
        faculty: "string", 
        description: "string", 
        imageLink: "string", 
        isAdmin: "boolean", 
        isBanned: "boolean" 
    },
    Notes: {
        _id: "ObjectId",
        userId: "ObjectId",
        title: "string",
        description: "string",
        degree: "string",
        subject: "string",
        year: "integer",
        notesRoute: "string",
        price: "number",
        numPurchases: "integer"
    },
    News: {
        _id: "ObjectId",
        userId: "ObjectId",
        title: "string",
        docRoute: "string",
        timestamp: "Date",
        likes: ["ObjectId"]
    },
    Message: {
        _id: "ObjectId", // Identificador único
        chatId: "ObjectId", // Se refiere al chat
        userId: "ObjectId", // Se refiere al usuario (remitente)
        content: "string", // Contenido del mensaje
        time: "Date" // Hora en que se envió el mensaje
    },
    Chat: {
        _id: "ObjectId", // Identificador único
        userId: "ObjectId",
        receiverId: "ObjectId",
        name: "string" // Nombre del chat (opcional, para chats grupales)
    },
    Alert: {
        _id: "ObjectId",
        userId: "ObjectId",
        description: "string",
        status: {
            type: "string", 
            enum: ["pending", "reviewed", "resolved"]
        }
    }
};


module.exports = Models;
