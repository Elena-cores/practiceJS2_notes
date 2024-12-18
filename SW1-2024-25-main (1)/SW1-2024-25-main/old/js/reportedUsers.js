const reportedUsers = [
    {
        userName: 'Carlos',
        email: 'carlos@example.com',
        degree: 'Ingeniería Informática',
        description: 'Usuario reportado por contenido inapropiado',
        img: '../images/users/1.jpg'
    },
    {
        userName: 'Ana',
        email: 'ana@example.com',
        degree: 'Ingeniería de Software',
        description: 'Reportado por spam en comentarios',
        img: '../images/users/3.jpg'
    },
    // Añade más usuarios reportados aquí
];

function renderReportedUsers() {
    const container = document.getElementById('reported-users-list');

    reportedUsers.forEach(user => {
        // Crear el contenedor del usuario reportado
        const userContainer = document.createElement('div');
        userContainer.classList.add('user-info');

        userContainer.innerHTML = `
        <div class=content-row>
            <img src="${user.img}" alt="Foto de perfil"> 
            <div class="info">
                <h2>${user.userName}</h2>
                <p>Username: ${user.userName}</p>
                <p>Correo: ${user.email}</p>
                <p>Grado: ${user.degree}</p>
                <p>Descripción: ${user.description}</p>
            </div>
        </div>
        <div class="button-row">
            <button class="danger">Eliminar usuario</button>
            <button class="success">Desbloquear usuario</button>
        </div>
        `;

        // Añadir el contenedor del usuario reportado al contenedor principal
        container.appendChild(userContainer);
    });
}

// Llamar a la función para renderizar la lista de usuarios reportados
renderReportedUsers();
