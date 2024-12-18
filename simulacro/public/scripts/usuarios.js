document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/usuarios') // Endpoint para obtener usuarios
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#usuarios-table tbody');

            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });
});
