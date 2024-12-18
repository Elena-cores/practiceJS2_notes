const { ObjectId } = require('mongodb');
async function seedDatabase(db) {
    const users = [
        { _id: new ObjectId("64b3f8b234d9f8a942d9f101"), username: "Carlos", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "carlos@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Carlos.", imagelink: "../images/users/1.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f102"), username: "Federico", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "federico@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Federico.", imagelink: "../images/users/2.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f103"), username: "Ana", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "ana@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Ana.", imagelink: "../images/users/3.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f104"), username: "María", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "maria@example.com", degree: "GISI", degreeyear: 4, university: "CEU San Pablo", faculty: "EPS", description: "Soy María.", imagelink: "../images/users/4.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f105"), username: "Marta", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "marta@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Marta.", imagelink: "../images/users/5.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f106"), username: "Laura", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "laura@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Laura.", imagelink: "../images/users/6.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f107"), username: "Pedro", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "pedro@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Pedro.", imagelink: "../images/users/7.jpg", admin: false, isBanned: true },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f108"), username: "Luis", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "luis@example.com", degree: "GISI", degreeyear: 4, university: "CEU San Pablo", faculty: "EPS", description: "Soy Luis.", imagelink: "../images/users/8.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f109"), username: "Pablo", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "pablo@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Pablo.", imagelink: "../images/users/1.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f110"), username: "Miguel", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "miguel@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Miguel.", imagelink: "../images/users/2.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f111"), username: "Isabel", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "isabel@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Isabel.", imagelink: "../images/users/3.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f112"), username: "Clara", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "clara@example.com", degree: "GISI", degreeyear: 4, university: "CEU San Pablo", faculty: "EPS", description: "Soy Clara.", imagelink: "../images/users/4.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f113"), username: "Daniela", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "daniela@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Daniela.", imagelink: "../images/users/5.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f114"), username: "Sofía", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "sofia@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Sofía.", imagelink: "../images/users/6.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f115"), username: "Christian", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "christian@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Christian.", imagelink: "../images/users/7.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f116"), username: "Javier", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "javier@example.com", degree: "GISI", degreeyear: 4, university: "CEU San Pablo", faculty: "EPS", description: "Soy Javier.", imagelink: "../images/users/8.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f117"), username: "Alejandro", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "alejandro@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Alejandro.", imagelink: "../images/users/1.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f118"), username: "Victoria", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "victoria@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Victoria.", imagelink: "../images/users/2.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f119"), username: "Lucía", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "lucia@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Lucía.", imagelink: "../images/users/3.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f120"), username: "Andrés", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "andres@example.com", degree: "GISI", degreeyear: 4, university: "CEU San Pablo", faculty: "EPS", description: "Soy Andrés.", imagelink: "../images/users/4.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f121"), username: "Gabriela", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "gabriela@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Gabriela.", imagelink: "../images/users/5.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f122"), username: "Roberto", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "roberto@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Roberto.", imagelink: "../images/users/6.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f123"), username: "Carmen", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "carmen@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Carmen.", imagelink: "../images/users/7.jpg", admin: false, isBanned: true },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f124"), username: "Tomás", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "tomas@example.com", degree: "GISI", degreeyear: 4, university: "CEU San Pablo", faculty: "EPS", description: "Soy Tomás.", imagelink: "../images/users/8.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f125"), username: "Esteban", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "esteban@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Esteban.", imagelink: "../images/users/1.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f126"), username: "Elena", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "elena@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Elena.", imagelink: "../images/users/2.jpg", admin: true, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f127"), username: "Adriana", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "adriana@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Adriana.", imagelink: "../images/users/3.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f128"), username: "Jorge", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "jorge@example.com", degree: "GISI", degreeyear: 4, university: "CEU San Pablo", faculty: "EPS", description: "Soy Jorge.", imagelink: "../images/users/4.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f129"), username: "Verónica", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "veronica@example.com", degree: "GISI", degreeyear: 3, university: "CEU San Pablo", faculty: "EPS", description: "Soy Verónica.", imagelink: "../images/users/5.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f130"), username: "Patricia", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "patricia@example.com", degree: "GISI", degreeyear: 2, university: "CEU San Pablo", faculty: "EPS", description: "Soy Patricia.", imagelink: "../images/users/6.jpg", admin: false, isBanned: false },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f131"), username: "Diego", password: "$2b$10$SIoFfwNoVIeZgoHA8PomCO3S.g9UFENQH5tbQZVk/ZLBuuqgSa8gq", email: "diego@example.com", degree: "GISI", degreeyear: 1, university: "CEU San Pablo", faculty: "EPS", description: "Soy Diego.", imagelink: "../images/users/7.jpg", admin: false, isBanned: false }

    ];
    

    const chats = [
        { _id: new ObjectId("64b3f8b234d9f8a942d9f001"), userId: new ObjectId("64b3f8b234d9f8a942d9f101"), receiverId: new ObjectId("64b3f8b234d9f8a942d9f102") },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f002"), userId: new ObjectId("64b3f8b234d9f8a942d9f103"), receiverId: new ObjectId("64b3f8b234d9f8a942d9f104") },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f003"), userId: new ObjectId("64b3f8b234d9f8a942d9f106"), receiverId: new ObjectId("64b3f8b234d9f8a942d9f107") },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f004"), userId: new ObjectId("64b3f8b234d9f8a942d9f108"), receiverId: new ObjectId("64b3f8b234d9f8a942d9f109"), name: "Los pibes" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f005"), userId: new ObjectId("64b3f8b234d9f8a942d9f111"), receiverId: new ObjectId("64b3f8b234d9f8a942d9f112"), name: "Solo chicas" },
    ];    
    
    const messages = [
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f001"), userId: new ObjectId("64b3f8b234d9f8a942d9f101"), content: "Hola Federico", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f002"), userId: new ObjectId("64b3f8b234d9f8a942d9f102"), content: "Hola Carlos", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f003"), userId: new ObjectId("64b3f8b234d9f8a942d9f101"), content: "¿Cómo estás?", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f004"), userId: new ObjectId("64b3f8b234d9f8a942d9f103"), content: "Hola chicas", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f005"), userId: new ObjectId("64b3f8b234d9f8a942d9f104"), content: "Hola Ana", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f006"), userId: new ObjectId("64b3f8b234d9f8a942d9f103"), content: "Hola a todas", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f007"), userId: new ObjectId("64b3f8b234d9f8a942d9f105"), content: "Hola Pedro", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f008"), userId: new ObjectId("64b3f8b234d9f8a942d9f106"), content: "Hola Laura", time: new Date() },
        { chatId: new ObjectId("64b3f8b234d9f8a942d9f009"), userId: new ObjectId("64b3f8b234d9f8a942d9f105"), content: "¿Qué tal?", time: new Date() },
    ];

    const news = [
        { _id: new ObjectId("64b3f8b234d9f8a942d9f001"), userId: new ObjectId("64b3f8b234d9f8a942d9f101"), title: "Nueva tecnología en GISI", docroute: "../images/news/noticias1.jpg", time: new Date(), likes: [2, 3, 4] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f002"), userId: new ObjectId("64b3f8b234d9f8a942d9f104"), title: "Importancia de la programación en la universidad", docroute: "../images/news/noticias2.jpg", time: new Date(), likes: [1, 5, 6] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f003"), userId: new ObjectId("64b3f8b234d9f8a942d9f107"), title: "Pequeñas sorpresas, grandes recuerdos", docroute: "../images/news/anuncio1.jpg", time: new Date(), likes: [1, 2, 6, 7] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f004"), userId: new ObjectId("64b3f8b234d9f8a942d9f102"), title: "Tendencias en ingeniería informática", docroute: "../images/news/noticias3.jpg", time: new Date(), likes: [8, 9] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f005"), userId: new ObjectId("64b3f8b234d9f8a942d9f101"), title: "Aplicaciones innovadoras en electrónica", docroute: "../images/news/noticias4.jpg", time: new Date(), likes: [1, 4, 10] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f006"), userId: new ObjectId("64b3f8b234d9f8a942d9f112"), title: "A tu manera", docroute: "../images/news/anuncio2.jpg", time: new Date(), likes: [3, 4, 5] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f007"), userId: new ObjectId("64b3f8b234d9f8a942d9f104"), title: "Inteligencia artificial aplicada a redes", docroute: "../images/news/noticias5.jpg", time: new Date(), likes: [2, 3, 9] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f008"), userId: new ObjectId("64b3f8b234d9f8a942d9f117"), title: "Proyectos destacados de estudiantes", docroute: "../images/news/noticias6.jpg", time: new Date(), likes: [1, 6, 7, 8] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f009"), userId: new ObjectId("64b3f8b234d9f8a942d9f106"), title: "Cómo optimizar el aprendizaje en tecnología", docroute: "../images/news/noticias7.jpg", time: new Date(), likes: [2, 4] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f010"), userId: new ObjectId("64b3f8b234d9f8a942d9f119"), title: "Es lo que quiero", docroute: "../images/news/anuncio3.jpg", time: new Date(), likes: [1, 3, 6, 7] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f011"), userId: new ObjectId("64b3f8b234d9f8a942d9f131"), title: "Estudios en GISI: Experiencias", docroute: "../images/news/noticias8.jpg", time: new Date(), likes: [5, 6, 9] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f012"), userId: new ObjectId("64b3f8b234d9f8a942d9f125"), title: "Aplicaciones prácticas de blockchain", docroute: "../images/news/noticias9.jpg", time: new Date(), likes: [1, 2] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f013"), userId: new ObjectId("64b3f8b234d9f8a942d9f120"), title: "Nada sabe como mmMmMcDonald's", docroute: "../images/news/anuncio4.jpg", time: new Date(), likes: [2, 3, 10] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f014"), userId: new ObjectId("64b3f8b234d9f8a942d9f116"), title: "Electrónica aplicada a la robótica", docroute: "../images/news/noticias10.jpg", time: new Date(), likes: [3, 4, 8] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f015"), userId: new ObjectId("64b3f8b234d9f8a942d9f103"), title: "Destapa la felicidad", docroute: "../images/news/anuncio5.jpg", time: new Date(), likes: [1, 2, 9] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f016"), userId: new ObjectId("64b3f8b234d9f8a942d9f130"), title: "Casos prácticos en la industria", docroute: "../images/news/noticias11.jpg", time: new Date(), likes: [4, 5, 10] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f017"), userId: new ObjectId("64b3f8b234d9f8a942d9f104"), title: "Retos actuales en ingeniería informática", docroute: "../images/news/noticias12.jpg", time: new Date(), likes: [2, 6, 8] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f018"), userId: new ObjectId("64b3f8b234d9f8a942d9f109"), title: "El mejor dron de la historia", docroute: "../images/news/anuncio6.jpg", time: new Date(), likes: [3, 4, 7] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f019"), userId: new ObjectId("64b3f8b234d9f8a942d9f115"), title: "Cómo estructurar un proyecto exitoso", docroute: "../images/news/noticias13.jpg", time: new Date(), likes: [1, 9, 10] },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f020"), userId: new ObjectId("64b3f8b234d9f8a942d9f127"), title: "La importancia de la ciberseguridad", docroute: "../images/news/noticias14.jpg", time: new Date(), likes: [2, 5, 6] }
    ];

    const alertas = [
        { _id: new ObjectId("64b3f8b234d9f8a942d9f001"), userId: new ObjectId("64b3f8b234d9f8a942d9f122"), description: "No puedo acceder a mi cuenta", status: "pending" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f002"), userId: new ObjectId("64b3f8b234d9f8a942d9f105"), description: "No puedo subir archivos", status: "reviewed" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f003"), userId: new ObjectId("64b3f8b234d9f8a942d9f117"), description: "No puedo ver las noticias", status: "resolved" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f004"), userId: new ObjectId("64b3f8b234d9f8a942d9f131"), description: "No puedo enviar mensajes", status: "pending" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f005"), userId: new ObjectId("64b3f8b234d9f8a942d9f112"), description: "El usuario Carlos ha subido unos apuntes míos", status: "reviewed" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f006"), userId: new ObjectId("64b3f8b234d9f8a942d9f109"), description: "No puedo entrar a mi perfil", status: "resolved" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f007"), userId: new ObjectId("64b3f8b234d9f8a942d9f102"), description: "He olvidado mi contraseña", status: "pending" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f008"), userId: new ObjectId("64b3f8b234d9f8a942d9f125"), description: "¿Cómo puedo subir mis apuntes", status: "reviewed" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f009"), userId: new ObjectId("64b3f8b234d9f8a942d9f118"), description: "No puedo ver los chats", status: "resolved" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f010"), userId: new ObjectId("64b3f8b234d9f8a942d9f107"), description: "¿Me pagáis por mis apuntes?", status: "pending" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f011"), userId: new ObjectId("64b3f8b234d9f8a942d9f114"), description: "No me va el chat", status: "reviewed" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f012"), userId: new ObjectId("64b3f8b234d9f8a942d9f128"), description: "No puedo entrar", status: "resolved" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f013"), userId: new ObjectId("64b3f8b234d9f8a942d9f104"), description: "Esto no va bien", status: "pending" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f014"), userId: new ObjectId("64b3f8b234d9f8a942d9f120"), description: "No funciona la página principal", status: "reviewed" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f015"), userId: new ObjectId("64b3f8b234d9f8a942d9f111"), description: "Se ve mal en el móvil", status: "resolved" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f016"), userId: new ObjectId("64b3f8b234d9f8a942d9f103"), description: "Cuanto pagais por los apuntes?", status: "pending" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f017"), userId: new ObjectId("64b3f8b234d9f8a942d9f101"), description: "No me carga el chat", status: "reviewed" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f018"), userId: new ObjectId("64b3f8b234d9f8a942d9f116"), description: "Como entro al perfil de otro usuario", status: "resolved" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f019"), userId: new ObjectId("64b3f8b234d9f8a942d9f130"), description: "Va lenta la web", status: "pending" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f020"), userId: new ObjectId("64b3f8b234d9f8a942d9f112"), description: "Sois unos estafadores", status: "reviewed" },
        { _id: new ObjectId("64b3f8b234d9f8a942d9f021"), userId: new ObjectId("64b3f8b234d9f8a942d9f109"), description: "Poneis demasiado anuncios", status: "pending" }
    ];

    
    await db.collection("User").insertMany(users);
    await db.collection("Chat").insertMany(chats);
    await db.collection("Message").insertMany(messages);
    await db.collection("News").insertMany(news);
    await db.collection("Alert").insertMany(alertas);

    console.log("Datos iniciales insertados.");
}

module.exports = seedDatabase;
